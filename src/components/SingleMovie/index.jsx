import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleMovie } from "../../redux/slices/MovieSlice";

const SingleMovie = () => {
    const { movieid } = useParams();
    const dispatch = useDispatch();
    const singleMovie = useSelector((state) => state.MovieSlice.singleMovie);
    const status = useSelector((state) => state.MovieSlice.status);
    const error = useSelector((state) => state.MovieSlice.error);
    useEffect(() => {
        dispatch(fetchSingleMovie(movieid))
    }, [movieid, dispatch])
    return (
        <>
            {status === 'loading' ? <div>Loading...</div> : status === 'error' ? <div>{error}</div> :
                <div>
                    {singleMovie && singleMovie.map((movie, index) => (
                        <div key={index}>
                            <p>{movie.title}</p>
                            <img src={movie.big_image} alt={movie.title} />
                            <p>{movie.description}</p>
                            <p>{movie.rank}</p>
                            <p>{movie.year}</p>
                            <img src={movie.thumbnail} alt={movie.title} />
                            {movie.genre.map((item, index) => <div key={index}>{item}</div>)}
                        </div>
                    ))}
                </div>}
        </>
    )
}

export default SingleMovie;