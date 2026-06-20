import { useApp } from "@/context/AppContext";
import Kpis from "../Cards/Kpis";
import GridRankingLoad from "../Skeletons/GridRankingLoad";

export default function GridRanking ({ summary }) {

    const { loading } = useApp();

    if (loading) return <GridRankingLoad/>;

    return (
        <div className="w-full grid grid-4 gap-md">
            <Kpis title={'Probabilidad de Victoria'} value={`${summary?.victory_probability} %`} stats={0}/>
            <Kpis title={'Total de electores'} value={summary?.total_electors} stats={0}/>
            <Kpis title={'Nivel Estratégico'} value={summary?.priority_segment} stats={0}/>
            <Kpis title={'Segmento Prioritario'} value={summary?.priority_district} stats={0}/>
            <Kpis title={'Distrito Prioritario'} value={summary?.strategic_level} stats={0}/>
            <Kpis title={'Riesgo Principal'} value={summary?.main_risk} stats={0}/>
            <Kpis title={'Principal Oportunidad'} value={summary?.main_opportunity} stats={0}/>
        </div>
    )
}