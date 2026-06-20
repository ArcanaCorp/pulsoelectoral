import DataTable from "./DataTable";

export default function DistrictRankingTable({ districts = [] }) {

    const columns = [
        { key: "district_name", label: "Distrito" },
        {
            key: "total_electors",
            label: "Electores",
            align: "right",
            render: (value) => Number(value).toLocaleString("es-PE")
        },
        {
            key: "young_electors",
            label: "Jóvenes",
            align: "right",
            render: (value) => Number(value).toLocaleString("es-PE")
        },
        {
            key: "senior_electors",
            label: "Adultos mayores",
            align: "right",
            render: (value) => Number(value).toLocaleString("es-PE")
        },
        {
            key: "female_percentage",
            label: "% Mujeres",
            align: "right",
            render: (value) => `${Number(value).toFixed(2)}%`
        },
        {
            key: "male_percentage",
            label: "% Hombres",
            align: "right",
            render: (value) => `${Number(value).toFixed(2)}%`
        }
    ];

    return (
        <div className="w-full card flex flex-col gap-md">
            <h3>Top 5 distritos donde tener presencia.</h3>
            <DataTable
                columns={columns}
                data={districts}
                tableClassName="table-sm table-striped"
                emptyText="No hay distritos disponibles."
            />
        </div>
    );
}