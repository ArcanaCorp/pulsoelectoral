import { useApp } from "@/context/AppContext"
import LinesLoad from "../Skeletons/LinesLoad";

export default function Recommendations ({ recommend }) {

    const { loading } = useApp();

    return (
        <div className="card w flex flex-col gap-md" style={{"--mxw": "300px"}}>
            <h3>Acciones recomendaciones</h3>
            <ul className="w-full flex flex-col gap-md">
                {loading ? (
                    <LinesLoad numberOfLine={5} height={20} rounded={8} />
                ) : (
                    recommend.length > 0 ? (
                        recommend.map((txt, idx) => (
                            <li key={idx} className="">{txt}</li>
                        ))
                    ) : (
                        <li>No hay recomendaciones ahora</li>
                    )
                )}
            </ul>
        </div>
    )
}