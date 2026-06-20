export default function Kpis ({ title, value, stats }) {
    return (
        <div className="card flex flex-col gap-md justify-between">
            <h4 className="label-sm text-muted">{title}</h4>
            <div className="w-full flex items-center justify-between">
                <h2 className="w headline-md" style={{"--mxw": "80%"}}>{value}</h2>
                <p>{stats}</p>
            </div>
        </div>
    )
}