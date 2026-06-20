import { db } from "@/libs/supabase";

const getScopeData = async (form) => {
    let query = db
        .from("electoral_padron_districts")
        .select("*")
        .eq("electoral_year", 2026);

    if (form.town === "district") {
        query = query.eq("district_name", form.district);
    }

    const { data, error } = await query;

    if (error) throw error;

    return data || [];
};

const sum = (data, field) => {
    return data.reduce((acc, item) => acc + Number(item[field] || 0), 0);
};

const percentage = (value, total) => {
    if (!total) return 0;
    return Number(((value / total) * 100).toFixed(2));
};

const getPrioritySegment = (stats) => {
    const segments = [
        { key: "young", label: "Jóvenes de 18 a 39 años", value: stats.young_percentage },
        { key: "adult", label: "Adultos de 40 a 59 años", value: stats.adult_percentage },
        { key: "senior", label: "Adultos mayores de 60+", value: stats.senior_percentage },
        { key: "women", label: "Mujeres", value: stats.female_percentage },
        { key: "men", label: "Hombres", value: stats.male_percentage }
    ];

    return segments.sort((a, b) => b.value - a.value)[0];
};

const getPriorityDistrict = (districts) => {
    return [...districts].sort((a, b) => b.total_electors - a.total_electors)[0];
};

const getDistrictRankings = (districts) => {
    return [...districts]
        .map(district => {
            const young = Number(district.electors_18_29) + Number(district.electors_30_39);
            const senior = Number(district.electors_60_plus);

            return {
                district_name: district.district_name,
                total_electors: district.total_electors,
                young_electors: young,
                senior_electors: senior,
                female_percentage: Number(district.female_percentage || 0),
                male_percentage: Number(district.male_percentage || 0)
            };
        })
        .sort((a, b) => b.total_electors - a.total_electors);
};

const calculateVictoryProbability = (form, stats) => {
    let score = 45;

    if (form.social_media === true) score += 6;
    if (form.social_networks?.length >= 2) score += 4;
    if (form.goals?.includes("digital_advertising")) score += 5;
    if (form.goals?.includes("electoral_intelligence")) score += 6;
    if (form.goals?.includes("surveys")) score += 5;
    if (form.goals?.includes("ai_recommendations")) score += 4;

    if (form.budget === "3000_to_10000") score += 5;
    if (form.budget === "more_than_10000") score += 8;
    if (form.budget === "less_than_1000") score -= 5;

    if (stats.young_percentage >= 45 && form.target_audience?.includes("young_adults")) score += 5;
    if (stats.female_percentage >= 52 && form.target_audience?.includes("women")) score += 4;

    return Math.max(20, Math.min(score, 82));
};

export const analyzeCampaign = async (formOnboard) => {
    const districts = await getScopeData(formOnboard);

    if (!districts.length) {
        throw new Error("No se encontraron datos electorales.");
    }

    const totalElectors = sum(districts, "total_electors");
    const femaleElectors = sum(districts, "female_electors");
    const maleElectors = sum(districts, "male_electors");

    const age18_29 = sum(districts, "electors_18_29");
    const age30_39 = sum(districts, "electors_30_39");
    const age40_49 = sum(districts, "electors_40_49");
    const age50_59 = sum(districts, "electors_50_59");
    const age60Plus = sum(districts, "electors_60_plus");

    const youngElectors = age18_29 + age30_39;
    const adultElectors = age40_49 + age50_59;

    const stats = {
        total_electors: totalElectors,

        female_electors: femaleElectors,
        male_electors: maleElectors,

        female_percentage: percentage(femaleElectors, totalElectors),
        male_percentage: percentage(maleElectors, totalElectors),

        age_18_29_percentage: percentage(age18_29, totalElectors),
        age_30_39_percentage: percentage(age30_39, totalElectors),
        age_40_49_percentage: percentage(age40_49, totalElectors),
        age_50_59_percentage: percentage(age50_59, totalElectors),
        age_60_plus_percentage: percentage(age60Plus, totalElectors),

        young_percentage: percentage(youngElectors, totalElectors),
        adult_percentage: percentage(adultElectors, totalElectors),
        senior_percentage: percentage(age60Plus, totalElectors)
    };

    const prioritySegment = getPrioritySegment(stats);
    const priorityDistrict = getPriorityDistrict(districts);
    const rankings = getDistrictRankings(districts);
    const victoryProbability = calculateVictoryProbability(formOnboard, stats);

    return {
        success: true,

        data: {
            candidate: {
                name: formOnboard.candidate_name,
                party: formOnboard.political_party,
                scope: formOnboard.town,
                district: formOnboard.district || "Provincia de Jauja"
            },

            summary: {
                victory_probability: victoryProbability,
                total_electors: totalElectors,
                priority_segment: prioritySegment.label,
                priority_district: priorityDistrict?.district_name || formOnboard.district,
                strategic_level: victoryProbability >= 65 ? "Alta oportunidad" : "Campaña competitiva",
                main_risk: formOnboard.social_media ? "Alta competencia digital" : "Baja presencia digital",
                main_opportunity: prioritySegment.label
            },

            stats,

            charts: {
                age_distribution: [
                    { label: "18 a 29", value: age18_29, percentage: stats.age_18_29_percentage },
                    { label: "30 a 39", value: age30_39, percentage: stats.age_30_39_percentage },
                    { label: "40 a 49", value: age40_49, percentage: stats.age_40_49_percentage },
                    { label: "50 a 59", value: age50_59, percentage: stats.age_50_59_percentage },
                    { label: "60+", value: age60Plus, percentage: stats.age_60_plus_percentage }
                ],

                gender_distribution: [
                    { label: "Mujeres", value: femaleElectors, percentage: stats.female_percentage },
                    { label: "Hombres", value: maleElectors, percentage: stats.male_percentage }
                ]
            },

            rankings: {
                districts_by_electors: rankings,
                top_5_districts: rankings.slice(0, 5)
            },

            ai_recommendation: {
                title: "Recomendación IA del día",
                description: `La campaña debe priorizar el segmento ${prioritySegment.label}. ${
                    formOnboard.town === "province"
                        ? `El distrito con mayor peso electoral es ${priorityDistrict.district_name}.`
                        : `El enfoque debe concentrarse en ${formOnboard.district}.`
                } Se recomienda combinar presencia territorial, contenido corto en redes y medición mediante encuestas.`
            },

            recommended_actions: [
                `Priorizar mensajes para ${prioritySegment.label}`,
                `Reforzar presencia en ${priorityDistrict?.district_name || formOnboard.district}`,
                "Publicar 3 videos cortos esta semana",
                "Ejecutar una encuesta rápida de percepción",
                "Asignar presupuesto a Meta Ads con segmentación territorial"
            ],

            budget_recommendation: {
                meta_ads: 60,
                content_creation: 25,
                printed_material: 15
            },

            created_at: new Date().toISOString()
        }
    };
};