import axios from "axios";

const API_URL = "https://moviegroups.herokuapp.com/api/movie/";

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

//get other users Movies
const getUserMovies = async (userName, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + "user/" + userName, config);

    return response.data;
}

//Delete Movie
const deleteMovie = async (movieId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + movieId, config);

    return response.data;
}

//Rate Movie
const rateMovie = async (movieData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}rate/${movieData.id}/${movieData.rating}`, config);

    return response.data;
}


const movieService = {
    addMovie,
    getMyMovies,
    deleteMovie,
    rateMovie,
    getUserMovies
}

export default movieService;