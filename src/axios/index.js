import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://imdb-top-100-movies.p.rapidapi.com/",
    headers: {
        // Accept: "application/json",
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com',
        'X-RapidAPI-Key': 'd7c4692506mshfdd73dbe001b575p1ea1d1jsneaa51ec7ef65',
        // Authorization: `Bearer ${process.env.REACT_MOVIE_API_TOKEN}`
    }
})

export default axiosInstance;