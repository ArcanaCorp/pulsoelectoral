'use client';

import Recommendations from "@/components/Cards/Recommendations";
import AgeDistributionChart from "@/components/Charts/AgeDistributionChart";
import GenderDistributionChart from "@/components/Charts/GenderDistributionChart";
import GridRanking from "@/components/Grids/GridRanking";
import DistrictRankingTable from "@/components/Tables/DistrictRankingTable";
import { useApp } from "@/context/AppContext";
import DateFormatter from "@/helpers/formatters/date.formatter";
import { IconBulb } from "@tabler/icons-react";

export default function Page () {

    const { analysis } = useApp();

    return (
        <>
            <div className="w-full flex items-center justify-between">
                <div className="w-full">
                    <h1>Centro Estratégico de Campaña</h1>
                    <p>Supervise su campaña, identifique oportunidades y tome decisiones respaldadas con inteligencia en tiempo real.</p>
                </div>
                <div>
                    <p className="text-nowrap">Última actualización</p>
                    <p><b>{DateFormatter.fromNow(analysis?.created_at)}</b></p>
                </div>
            </div>
            {analysis?.ai_recommendation && (
                <div className="w-full card flex flex-col gap-sm">
                    <span><IconBulb/></span>
                    <h3>{analysis?.ai_recommendation.title}</h3>
                    <p>{analysis?.ai_recommendation.description}</p>
                </div>
            )}
            <GridRanking summary={analysis?.summary} />
            <div className="w-full flex gap-md">
                <DistrictRankingTable districts={analysis?.rankings.top_5_districts ?? []} />
                <Recommendations recommend={analysis?.recommended_actions ?? []} />
            </div>
            <div className="w-full grid grid-2 gap-md">
                <AgeDistributionChart data={analysis?.charts?.age_distribution ?? []}/>
                <GenderDistributionChart data={analysis?.charts?.gender_distribution ?? []}/>
            </div>
        </>
    )
}