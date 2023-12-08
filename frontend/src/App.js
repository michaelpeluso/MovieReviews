// import dependencies
import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/addReview";
import MoviesList from "./components/moviesList";
import Movie from "./components/movie";
import Login from "./components/login";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// Full App
function App() {
    // useStates
    const [user, setUser] = useState(null);

    // async functions (like useEffects)
    async function login(user = null) {
        setUser(user);
    }
    async function logout() {
        setUser(null);
    }

    // what App displays
    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Movie Reviews</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link>
                            <Link to={"/movies"}>Movies</Link>
                        </Nav.Link>
                        <Nav.Link>{user ? <a>Logout User</a> : <Link to={"/login"}>Login</Link>}</Nav.Link> {/* if logged in */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                {" "}
                {/* What page to actually display to the user */}
                <Route exact path={["/", "/movies"]} component={MoviesList}></Route> {/* simply render whatever is returned by MovieList */}
                <Route path="/movies/:id/review" render={(props) => <AddReview {...props} user={user} />}></Route> {/* renders and sends parameters into AddReview */}
                <Route path="/movies/:id/" render={(props) => <Movie {...props} user={user} />}></Route>
                <Route path="/login" render={(props) => <Login {...props} login={login} />}></Route>
            </Switch>
        </div>
    );
}

// render in index.js
export default App;
