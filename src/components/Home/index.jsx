import { useEffect, useState } from "react";
import Movies from "../Movies";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/slices/MovieSlice";
import { SkipNext, SkipPrevious } from "@mui/icons-material";

export default function Home() {
    const [page, setPage] = useState(1);
    const movies = useSelector((state) => state.MovieSlice.movies);
    const status = useSelector((state) => state.MovieSlice.status);
    const error = useSelector((state) => state.MovieSlice.error);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMovies())
    }, [dispatch])

    // console.log(allMovies);
    function pageSelected(pageVal) {
        if (pageVal < 1) {
            setPage(movies.length / 10)
        }
        else if (pageVal > movies.length / 10) {
            setPage(1);
        }
        else {
            setPage(pageVal)
        }
    }

    return (
        <>
            {status === "loading" ? <div>Loading....</div> : status === "error" ? <div>{error}</div> :
                <>
                    <h1 className="text-center text-3xl capitalize">Top 100 Movies</h1>
                    <div className="grid gap-4 grid-cols-4 grid-rows-3 p-8">
                        {movies && movies.slice(page * 10 - 10, page * 10).map((mov, index) => (
                            <Movies movie={mov} key={index} />
                        ))}
                    </div>
                    <div className="flex justify-center items-center">
                        <button onClick={() => pageSelected(page - 1)}><SkipPrevious /></button>
                        {movies && [...Array(movies.length / 10)].map((_, index) => {
                            return (
                                <button onClick={() => pageSelected(index + 1)} key={index} className={`mx-3.5 px-3.5 hover:bg-sky-700 hover:text-white ${page === index + 1 ? "bg-slate-900 rounded text-white" : page}`}>{index + 1}</button>
                            )
                        })}
                        <button onClick={() => pageSelected(page + 1)}><SkipNext /></button>
                    </div>
                </>
            }
        </>
    )
} 