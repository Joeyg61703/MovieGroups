import axios from "axios";

const API_URL = "http://localhost:5000/api/movie";

//Add movie to array within user document
const addMovie = async (movieData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, movieData, config);

    return response.data;
}

//get user Movies
const getMyMovies = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
}

//Delete Movie
const deleteMovie = async (movieData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + movieData, config);

    return response.data;
}
const movieService = {
    addMovie,
    getMyMovies,
    deleteMovie
}

export default movieService;