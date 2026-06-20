import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function GridRankingLoad () {
    return (
        <div className="w-full grid grid-4 gap-md">
            <Skeleton height={120} borderRadius={16} />
            <Skeleton height={120} borderRadius={16} />
            <Skeleton height={120} borderRadius={16} />
            <Skeleton height={120} borderRadius={16} />
        </div>
    )
}