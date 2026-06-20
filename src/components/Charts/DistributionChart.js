'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DistributionChart({title, data = [], type = 'doughnut'}) {
    
    const COLORS = [
        '#3B82F6', // azul
        '#EF4444', // rojo
        '#10B981', // verde
        '#F59E0B', // amarillo
        '#8B5CF6', // morado
        '#EC4899', // rosa
        '#06B6D4', // cyan
        '#84CC16'  // lima
    ];

    const labels = data.map(item => item.label);

    const chartData = {
        labels,
        datasets: [
            {
                data: data.map(item => item.value),
                backgroundColor: labels.map((_, index) => COLORS[index % COLORS.length]),
                borderColor: '#ffffff',
                borderWidth: 2,
                hoverOffset: 10
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const item = data[context.dataIndex];

                        return `${item.label}: ${Number(item.value).toLocaleString('es-PE')} (${item.percentage}%)`;
                    }
                }
            }
        }
    };

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="card">
                <h3>{title}</h3>
                <p>No hay datos disponibles.</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h3>{title}</h3>

            <div style={{ height: 320 }}>
                <Doughnut data={chartData} options={options} />
            </div>
        </div>
    );
}