import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchListLocal } from "../../redux/slices/MovieSlice";
import { Link } from "react-router-dom";
import "../../css/watchlist.css"

const WatchLsit = () => {
    const watchList = useSelector((state) => state.MovieSlice.watchList);
    const status = useSelector((state) => state.MovieSlice.status);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchWatchListLocal())
    }, [dispatch])
    return (
        <div className="bg-slate-900 text-white">
            <div className="grid gap-4 grid-rows-3 grid-cols-4 watchlist">
                {watchList.map((watch) =>
                    <Link to={`/movies/${watch.id}`} key={watch.id}>
                        <img src={watch.thumbnail} alt={watch.title} />
                        <p>{watch.title}</p>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default WatchLsit