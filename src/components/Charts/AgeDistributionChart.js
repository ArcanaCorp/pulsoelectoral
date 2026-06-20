import DistributionChart from './DistributionChart';

export default function AgeDistributionChart({ data = [] }) {
    return (
        <DistributionChart
            title="Distribución por edad"
            data={data}
        />
    );
}