export const TIME_YEAR = new Date().getFullYear();

export const district_name = [
    "Acolla",
    "Apata",
    "Ataura",
    "Canchayllo",
    "Curicaca",
    "El Mantaro",
    "Huamalí",
    "Huaripampa",
    "Huertas",
    "Janjaillo",
    "Jauja",
    "Julcán",
    "Leonor Ordoñez",
    "Llocllapampa",
    "Marco",
    "Masma",
    "Masma Chicche",
    "Molinos",
    "Monobamba",
    "Muqui",
    "Muquiyauyo",
    "Paca",
    "Paccha",
    "Pancán",
    "Parco",
    "Pomacancha",
    "Ricrán",
    "San Lorenzo",
    "San Pedro de Chunán",
    "Sausa",
    "Sincos",
    "Tunan Marca",
    "Yauli",
    "Yauyos"
]

export const political_party = [
    "Acción Popular",
    "Ahora Nación",
    "Alianza para el Progreso (APP)",
    "Avanza País",
    "Fuerza Popular",
    "Juntos por el Perú",
    "Partido Aprista Peruano",
    "Partido Demócrata Unido Perú",
    "Partido Patriótico del Perú",
    "Perú Libre",
    "Podemos Perú",
    "Renovación Popular",
    "Somos Perú",
    "Avanza País Partido de Integración Social",
    "Fe en el Perú",
    "Integridad Democrática",
    "Un Camino Diferente",
    "Progresemos",
    "Partido País para Todos",
    "Primero la Gente - Comunidad, Ecología, Libertad y Progreso",
    "Cooperación Popular",
    "Libertad Popular",
    "Perú Moderno",
    "Perú Primero",
    "Salvenos al Perú",
    "Fuerza y Libertad",
    "Partido de los Trabajadores y Emprendedores PTE",
    "Partido del Buen Gobierno",
    "Partido Político PRIN",
    "Partido Político Cooperación Popular",
    "Partido Político Perú Primero",
    "Ahora Nación - AN",
    "Perú Primero"
]

export const networks_list = [
    {key: 'facebook', value: "Facebook"},
    {key: 'instagram', value: "Instagram"},
    {key: 'tiktok', value: "Tiktok"},
    {key: 'youtube', value: "Youtube"},
    {key: 'x', value: "X"},
    {key: 'linkedin', value: "Linkedin"},
    {key: 'web', value: "Pagina Web"},
]

export const target_audiences = [
    {key: 'young_adults', value: 'Jóvenes y adultos jóvenes (18-39)'},
    {key: 'middle_age', value: 'Adultos (40-59)'},
    {key: 'senior_citizens', value: 'Adultos mayores (60+)'},
    {key: 'women', value: 'Mujeres'},
    {key: 'farmers', value: 'Agricultores y población rural'},
    {key: 'all_population', value: 'Toda la población'},
]

export const main_messages = [
    {key: 'public_security', value: 'Seguridad ciudadana'},
    {key: 'public_works', value: 'Obras e infraestructura'},
    {key: 'healthcare', value: 'Salud'},
    {key: 'agriculture', value: 'Agricultura y ganadería'},
    {key: 'tourism', value: 'Turismo'},
    {key: 'education', value: 'Educación'},
    {key: 'employment', value: 'Empleo y emprendimiento'},
    {key: 'environment', value: 'Medio Ambiente'},
    {key: 'sports_and_youth', value: 'Deporte y juventud'},
]

export const budget_list = [
    {
        key: 'less_than_1000',
        value: 'Menos de S/1,000',
        min: 0,
        max: 999
    },
    {
        key: '1000_to_3000',
        value: 'S/1,000 - S/3,000',
        min: 1000,
        max: 3000
    },
    {
        key: '3000_to_10000',
        value: 'S/3,000 - S/10,000',
        min: 3000,
        max: 10000
    },
    {
        key: 'more_than_10000',
        value: 'Más de S/10,000',
        min: 10000,
        max: null
    }
];

export const goals_list = [
    {
        key: 'surveys',
        value: 'Encuestas'
    },
    {
        key: 'digital_advertising',
        value: 'Publicidad digital'
    },
    {
        key: 'social_media',
        value: 'Redes sociales'
    },
    {
        key: 'electoral_intelligence',
        value: 'Inteligencia electoral'
    },
    {
        key: 'age_segmentation',
        value: 'Segmentación por edad'
    },
    {
        key: 'electoral_simulation',
        value: 'Simulación electoral'
    },
    {
        key: 'automatic_reports',
        value: 'Reportes automáticos'
    },
    {
        key: 'competitor_tracking',
        value: 'Seguimiento de competidores'
    },
    {
        key: 'ai_recommendations',
        value: 'Recomendaciones con IA'
    }
];

export const SUPABASE = {
    URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY
}