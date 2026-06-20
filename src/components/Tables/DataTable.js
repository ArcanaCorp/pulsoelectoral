export default function DataTable({ columns = [], data = [], emptyText = 'No hay datos disponibles', className = '', tableClassName = ''}) {
    
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className={`table-wrapper ${className}`}>
                <div className="table-empty">{emptyText}</div>
            </div>
        );
    }

    return (
        <div className={`table-wrapper ${className}`}>
            <table className={`table ${tableClassName}`}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={column.align ? `table-${column.align}` : ''}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={row.id ?? row.district_name ?? rowIndex}>
                            {columns.map((column) => (
                                <td key={column.key} className={column.align ? `table-${column.align}` : ''}>
                                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}