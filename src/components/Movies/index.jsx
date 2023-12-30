import { BookmarkAdd, BookmarkAdded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../../css/movies.css"
import { useDispatch } from "react-redux";
import { addWatchList, removeMoviefromList } from "../../redux/slices/MovieSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Movies({ movie, list }) {
    const dispatch = useDispatch();
    function checkBookMark() {
        let flag = list.find((item) => item.id === movie.id);
        return flag !== undefined;
    }

    function removeFromWatchList(movieProp) {
        dispatch(removeMoviefromList(movieProp));
        toast.success(`${movieProp.title} Removed from Watchlist`, { position: toast.POSITION.TOP_RIGHT })
    }

    function addToWatchList(movieProp) {
        dispatch(addWatchList(movieProp));
        toast.success(`${movieProp.title} Added to Watchlist`, { position: toast.POSITION.TOP_RIGHT })
    }

    return (
        <div>
            {checkBookMark() ? <BookmarkAdded className="book-mark self-start" onClick={() => removeFromWatchList(movie)} /> : <BookmarkAdd className="book-mark self-start" onClick={() => addToWatchList(movie)} />}
            <ToastContainer />
            <Link to={`/movies/${movie.id}`}>
                <div className="min-h-500 hover:shadow-lg flex flex-col justify-center items-center p-3">
                    <p className="text-lg font-semibold font-sans">{movie.title}</p>
                    {/* {
                    hideDesc ? <p>`${movie.description.slice(0, 30)}<span className="text-emerald-500 read-hover" onClick={() => toggleDescription()}> ...Read More</span></p> :
                        <p>`${movie.description}<span className="text-pink-700 read-less" onClick={() => toggleDescription()}> ...Read Less</span></p>
                } */}
                    <p className="text-base font-medium font-mono">Release Year: <span className="text-xs align-left sm:text-sm font-sans">{movie.year}</span></p>
                    <p>⭐{movie.rating}/10</p>
                    <img src={movie.image} alt={movie.title} className="rounded w-3/4" />
                </div>
            </Link>
        </div>
    )
} 