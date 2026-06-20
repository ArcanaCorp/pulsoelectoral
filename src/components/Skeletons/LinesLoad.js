import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LinesLoad ({ numberOfLine=1, height, rounded }) {
    return (
        Array.from({length: numberOfLine}).map((_, idx) => (
            <Skeleton key={idx} height={height} borderRadius={rounded} />
        ))
    )
}