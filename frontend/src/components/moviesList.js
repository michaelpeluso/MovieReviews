import React, { useState, useEffect } from "react";
import MovieDataService from "../services/moviesDataService";
import { Link } from "react-router-dom";

const MoviesList = (props) => {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchRating, setSearchRating] = useState("");
    const [ratings, setRatings] = useState(["All Ratings"]);

    useEffect(() => {
        retrieveMovies();
        retrieveRatings();
    }, []);

    const retrieveMovies = () => {
        MovieDataService.getAll()
            .then((response) => {
                console.log(response.data);
                setMovies(response.data.movies);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const retrieveRatings = () => {
        MovieDataService.getRatings()
            .then((response) => {
                console.log(response.data);
                //start with 'All Ratings' if user doesn't specify any ratings
                setRatings(["All Ratings"].concat(response.data));
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const onChangeSearchRating = (e) => {
        const searchRating = e.target.value;
        setSearchRating(searchRating);
    };

    return <div className="App">Movies List</div>;
};

export default MoviesList;
