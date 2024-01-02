import { useEffect, useState } from "react";
import Movies from "../Movies";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieSearch, fetchMovies, fetchWatchListLocal, resetSearchList } from "../../redux/slices/MovieSlice";
import { AddBox, CancelOutlined, SkipNext, SkipPrevious } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "../../css/home.css";
import ReactPaginate from "react-paginate";
import WatchLsit from "../WatchList";

export default function Home() {
    const [page, setPage] = useState(1);
    const [inputSearch, setInputSearch] = useState("");
    const movies = useSelector((state) => state.MovieSlice.movies);
    const status = useSelector((state) => state.MovieSlice.status);
    const error = useSelector((state) => state.MovieSlice.error);
    const watchList = useSelector((state) => state.MovieSlice.watchList);
    const searchList = useSelector((state) => state.MovieSlice.searchList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMovies())
        dispatch(fetchWatchListLocal())
    }, [dispatch])

    function pageSelected(selectedPage) {
        // if (pageVal < 1) {
        //     setPage(movies.length / 10)
        // }
        // else if (pageVal > movies.length / 10) {
        //     setPage(1);
        // }
        // else {
        //     setPage(pageVal)
        // }
        setPage((selectedPage.selected) + 1);
    }

    console.log(searchList);

    function debounceSearch(value) {
        dispatch(fetchMovieSearch(value));
    }
    let debounceTimer;
    function handleSearchInput(e) {
        clearTimeout(debounceTimer);
        const inputValue = e.target.value;
        if (inputValue.length >= 3) {
            debounceTimer = setTimeout(() => { debounceSearch(inputValue) }, 1500);
        }
        else if (e.target.value < 1) {
            dispatch(resetSearchList());
        }
    }

    return (
        <>
            {status === "loading" ? <div>Loading....</div> : status === "error" ? <div>{error}</div> :
                <div className="bg-slate-950 text-white p-4">
                    <h1 className="text-center text-3xl capitalize">Top 100 Movies</h1>
                    <div className="flex justify-center items-center main-container">
                        <div className="search-box">
                            <input className="input-box text-black text-sm p-1 rounded border-none" value={inputSearch} type="text" placeholder="Enter a movie to search" onChange={(e) => { setInputSearch(e.target.value); handleSearchInput(e) }} />
                            {searchList.length >= 1 && <span><CancelOutlined className="clear-search icon" onClick={() => { dispatch(resetSearchList()); setInputSearch("") }} /></span>}
                            <div>
                                {searchList.length >= 1 && <div className="absolute bg-white-500 flex flex-col search-result">
                                    {searchList && searchList.map((search) => <Link to={`movies/${search.item.id}`} key={search.item.id} className="list-value"><hr className=""></hr><p>{search.item.title}</p></Link>)}
                                </div>}
                            </div>
                        </div>
                        <button className="watchlist-icon self-center" ><span><AddBox /></span>Watchlist</button>
                    </div>
                    <div className="grid gap-1 grid-cols-1 grid-rows-1 p-3 sm:gap-4 sm:grid-cols-4 sm:grid-rows-3 sm:p-8 main-container">
                        {movies && movies.slice(page * 10 - 10, page * 10).map((mov, index) => (
                            <Movies movie={mov} key={index} list={watchList} />
                        ))}
                    </div>
                    {/* <div className="flex justify-center items-center">
                        <button onClick={() => pageSelected(page - 1)}><SkipPrevious /></button>
                        {movies && [...Array.from({ length: screenSize })].map((_, index) => {
                            return (
                                <button onClick={() => pageSelected(index + 1)} key={index} className={`hidden sm:block sm:mx-3.5 sm:px-3.5 sm:hover:bg-sky-700 sm:hover:text-white ${page === index + 1 ? "bg-slate-500 rounded text-white" : page}`}>{index + 1}</button>
                            )
                        })}
                        <p className="bg-slate-500 px-3.5 rounded mx-3 sm:hidden">{page}</p>
                        <button onClick={() => pageSelected(page + 1)}><SkipNext /></button>
                    </div> */}
                    <WatchLsit list={watchList} />
                    <ReactPaginate
                        previousLabel={<SkipPrevious />}
                        nextLabel={<SkipNext />}
                        breakLabel={'...'}
                        pageCount={movies.length / 10}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={4}
                        onPageChange={pageSelected}
                        containerClassName={'pagination'}
                        activeClassName={'bg-slate-500  rounded mx-3.5 px-3.5'}
                    />
                </div>
            }
        </>
    )
} 