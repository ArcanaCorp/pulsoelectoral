import DistributionChart from './DistributionChart';

export default function GenderDistributionChart({ data = [] }) {
    return (
        <DistributionChart
            title="Distribución por género"
            data={data}
        />
    );
}