import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addWatchList, fetchSingleMovie } from "../../redux/slices/MovieSlice";
import "../../css/singlemovie.css";
import { ArrowForwardIosRounded } from "@mui/icons-material";

const SingleMovie = () => {
    const { movieid } = useParams();
    const dispatch = useDispatch();
    const singleMovie = useSelector((state) => state.MovieSlice.singleMovie);
    const status = useSelector((state) => state.MovieSlice.status);
    const error = useSelector((state) => state.MovieSlice.error);

    function addtToWatchList(item) {
        dispatch(addWatchList(item));
        dispatch(fetchSingleMovie(movieid));
    }
    useEffect(() => {
        dispatch(fetchSingleMovie(movieid))
    }, [movieid, dispatch])
    return (
        <>
            {status === 'loading' ? <div>Loading...</div> : status === 'error' ? <div>{error}</div> :
                <div className="bg-slate-950 text-white p-4">
                    <div className="flex breadcrumb">
                        <Link to="/">Home</Link>
                        <ArrowForwardIosRounded className="icon" />
                        <p>{singleMovie.title}</p>
                    </div>
                    <div className="flex movie-main">
                        <div className="movie-details">
                            <img className="movie-img" src={singleMovie.big_image} alt={singleMovie.title} />
                            {/* <img src={singleMovie.thumbnail} alt={singleMovie.title} /> */}
                        </div>
                        <div className="p-4 movie-details">
                            <p className="movie-heading text-4xl mb-7">{singleMovie.title}</p>
                            <label className="text-xl text-slate-500 font-semibold">Description</label>
                            <p className="movie-description text-l mb-4">{singleMovie.description}</p>
                            <label className="text-xl text-slate-500 font-semibold">Rank</label>
                            <p className="movie-description text-l mb-4">{singleMovie.rank}</p>
                            <label className="text-xl text-slate-500 font-semibold">Release Year</label>
                            <p className="movie-description text-l mb-4">{singleMovie.year}</p>
                            <label className="text-xl text-slate-500 font-semibold">Genre</label>
                            <div className="flex mb-4">
                                {singleMovie.genre && singleMovie.genre.map((item, index) => <p className="movie-description text-l mr-10 border border-white-500 rounded p-1" key={index}>{item}</p>)}
                            </div>
                            <button disabled={singleMovie.movieCheck} className="watchlist-button border border-white-500 rounded p-2" onClick={() => addtToWatchList(singleMovie)}>{singleMovie.movieCheck ? "✅Added to Watchlist" : "➕Add to Watchlist"}</button>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default SingleMovie;