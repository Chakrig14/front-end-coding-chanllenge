import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWatchListLocal, removeMoviefromList } from "../../redux/slices/MovieSlice";
import { Link } from "react-router-dom";
import "../../css/watchlist.css"
import { ArrowForwardIosRounded } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";

const WatchLsit = () => {
    const watchList = useSelector((state) => state.MovieSlice.watchList);
    const status = useSelector((state) => state.MovieSlice.status);
    const dispatch = useDispatch();

    function handleRemoveMovie(movieProp) {
        dispatch(removeMoviefromList(movieProp))
        toast.success(`${movieProp.title} Removed from watchlist`, { position: toast.POSITION.TOP_RIGHT })
    }

    useEffect(() => {
        dispatch(fetchWatchListLocal())
    }, [dispatch])
    return (
        <div className="bg-slate-900 text-white p-3">
            <ToastContainer />
            <div className="flex breadcrumb my-1.5">
                <Link to="/">Home</Link>
                <ArrowForwardIosRounded className="icon" />
                <p>Watchlist</p>
            </div>
            <div className="flex flex-col watchlist">
                {watchList.map((watch) =>
                    <Link to={`/movies/${watch.id}`} key={watch.id} className="flex items-center mb-5">
                        <img className="w-20 mr-5" src={watch.image} alt={watch.title} />
                        <div>
                            <p className="mb-3">{watch.title}</p>
                            <button className="bg-red-500 rounded p-1 text-sm" onClick={(e) => {
                                e.preventDefault();
                                handleRemoveMovie(watch)
                            }}>Remove</button>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default WatchLsit