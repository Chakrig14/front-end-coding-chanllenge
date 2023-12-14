import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Movies({ movie }) {
    let [hideDesc, setHideDesc] = useState(true);
    const dispatch = useDispatch();
    function toggleDescription() {
        setHideDesc(!hideDesc);
    }

    return (
        <><Link to={`/movies/${movie.id}`}>
            <div className="min-h-500 hover:shadow-lg flex flex-col justify-center items-center p-3">
                <p className="text-lg font-semibold font-sans">{movie.title}</p>
                {/* {
                    hideDesc ? <p>`${movie.description.slice(0, 30)}<span className="text-emerald-500 read-hover" onClick={() => toggleDescription()}> ...Read More</span></p> :
                        <p>`${movie.description}<span className="text-pink-700 read-less" onClick={() => toggleDescription()}> ...Read Less</span></p>
                } */}
                <p className="text-base font-medium font-mono">Release Year: <span className="text-sm font-sans">{movie.year}</span></p>
                <p>⭐{movie.rating}/10</p>
                <img src={movie.image} alt={movie.title} className="rounded w-3/4" />
            </div>
        </Link>

        </>
    )
} 