// import dependencies
import React, { useState, useEffect } from "react";
import MovieDataService from "../services/moviesDataService";
import { Link } from "react-router-dom";

//// react bootstrap
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Media from "react-bootstrap/Media";

// build Movie
const Movie = (props) => {
    //          ^^^  parameters passed in via App.js

    // placeholder movie useState variable
    const [movie, setMovie] = useState({
        id: null,
        title: "",
        rated: "",
        reviews: [],
    });

    // update movie
    const getMovie = (id) => {
        MovieDataService.get(id)
            .then((response) => {
                setMovie(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // update movie variable
    useEffect(() => {
        getMovie(props.match.params.id);
    }, [props.match.params.id]);

    // delete
    const deleteReview = (reviewId, index) => {
        MovieDataService.deleteReview(reviewId, props.user.id)
            .then((response) => {
                setMovie((prevState) => {
                    prevState.reviews.splice(index, 1);
                    return {
                        ...prevState,
                    };
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // render
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Image src={movie.poster + "/100px250"} fluid />
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>{movie.plot}</Card.Text>
                                {props.user && <Link to={"/movies/" + props.match.params.id + "/review"}>Add Review</Link>}
                            </Card.Body>
                        </Card>
                        <br></br>
                        <h2>Reviews</h2>
                        <br></br>
                        {/* render and map through all movies */}
                        {movie.reviews.map((review, index) => {
                            return (
                                <Media key={index}>
                                    <Media.Body>
                                        <h5>{review.name + " reviewed on " + new Date(Date.parse(review.date)).toDateString()}</h5>
                                        <p>{review.review}</p>
                                        {props.user && props.user.id === review.user_id && (
                                            <Row>
                                                <Col>
                                                    <Link
                                                        to={{
                                                            pathname: "/movies/" + props.match.params.id + "/review",
                                                            state: { currentReview: review },
                                                        }}
                                                    >
                                                        Edit
                                                    </Link>
                                                </Col>
                                                <Col>
                                                    <Button variant="link" onClick={() => deleteReview(review._id, index)}>
                                                        Delete
                                                    </Button>
                                                </Col>
                                            </Row>
                                        )}
                                    </Media.Body>
                                </Media>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

// export
export default Movie;
