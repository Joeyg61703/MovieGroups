import axios from "axios";

const API_URL = "/api/movie";

//Add movie to array within user document
const addMovie = async (movieId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, movieId, config);

    return response.data;
}

//get user Movies
const getMovies = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
}

//Delete Movie
const deleteMovie = async (movieId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + goalId, config);

    return response.data;
}
const movieService = {
    addMovie,
    getMovies,
    deleteMovie
}

export default movieService;