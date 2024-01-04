import { useDispatch } from "react-redux";
import { removeMoviefromList } from "../../redux/slices/MovieSlice";
import { Link } from "react-router-dom";
import "../../css/watchlist.css"
import { CancelOutlined } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";

const WatchList = ({ list, status }) => {
    // const watchList = useSelector((state) => state.MovieSlice.watchList);
    // const status = useSelector((state) => state.MovieSlice.status);
    const dispatch = useDispatch();

    function handleRemoveMovie(movieProp) {
        dispatch(removeMoviefromList(movieProp))
        toast.success(`${movieProp.title} Removed from watchlist`, { position: toast.POSITION.TOP_RIGHT })
    }

    // useEffect(() => {
    //     dispatch(fetchWatchListLocal())
    // }, [dispatch])

    function closeModal(e) {
        if (e.target.className !== WatchList) {
            status();
        }
    }
    return (
        <div className="watchlist-container" onClick={(e) => closeModal(e)}>
            <div className="bg-slate-900 text-white p-3 watchlist-main">
                <ToastContainer />
                <div className="flex justify-between">
                    <h1>Watchlist</h1>
                    <CancelOutlined className="close-icon" onClick={status} />
                </div>
                <div className="flex flex-col watchlist">
                    {list.map((watch) =>
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
        </div>
    )
}

export default WatchList