// import
import axios from "axios";

// class handles all api calls
class MovieDataService {
    // get all movies
    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/movies?page=${page}`);
    }

    // get movie by id
    get(id) {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/id/${id}`);
    }

    // get movie by query
    find(query, by = "title", page = 0) {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/movies?${by}=${query}&page=${page}`);
    }

    // post review
    createReview(data) {
        return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/review`, data);
    }

    // update review
    updateReview(data) {
        return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/review`, data);
    }

    // delete review
    deleteReview(id, userId) {
        return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/review`, { data: { review_id: id, user_id: userId } });
    }

    // get all ratings
    getRatings() {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/movies/ratings`);
    }
}

// export
export default new MovieDataService();
