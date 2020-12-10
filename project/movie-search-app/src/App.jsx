import "./App.css";
import React, { useState } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import PopularMovies from "./components/Movies/PopularMovies";
import Upcoming from "./components/Movies/Upcoming";
import NowPlaying from "./components/Movies/NowPlaying";
import TopRatedMovies from "./components/Movies/TopRatedMovies";
import Wishlist from "./components/WishList/WishList";
import MovieNav from "./components/MovieNavigation/MovieNav";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import logo from "./images/reactLogo.png";
import { endSession } from "./services/service";
import MovieDetail from "./components/MovieDetail/MovieDetail";

function App() {
    const [user, setUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState("");
    const [error, setError] = useState("");
    const errMsgs = {
        "network-error":
            "Status: There was a problem connecting to the network, try again",
        "bad-login": "Status: Bad-login: This value is not allowed",
        "login-required": "Status: User must login",
        "session-invalid":
            "This user session is not valid. Please login again.",
    };
    let content = "";
    const setErrorMethod = function (error) {
        setError(error);
    };
    const login = function ({ username }) {
        setIsLoggedIn(true);
        setCurrentUser(username);
        console.log(isLoggedIn);
    };
    const logoutLoggedinUser = function () {
        endSession()
            .then(() => {
                setIsLoggedIn(false);
                setCurrentUser("");
            })
            .catch((error) => {
                console.log("errorinlogout");
            });
    };

    const makeStatusLoggedIn = function (loggedIn) {
        setIsLoggedIn(loggedIn);
        console.log(isLoggedIn);
    };

    // if (isLoggedIn) {
    //     content = (
    //         <nav>
    //             <NavLink className="nav-tab" to="/wishlist">
    //                 WishList
    //             </NavLink>
    //             <NavLink className="nav-tab" to="/movies">
    //                 Movie
    //             </NavLink>
    //             <NavLink className="nav-tab" to="/logout">
    //                 Logout
    //             </NavLink>
    //         </nav>
    //     );
    // } else {
    //     content = (
    //         <nav>
    //             <NavLink className="nav-tab" to="/movies">
    //                 Movie
    //             </NavLink>
    //             <NavLink className="nav-tab" to="/login">
    //                 Login
    //             </NavLink>
    //         </nav>
    //     );
    // }

    if (isLoggedIn) {
        return (
            <div>
                <header className="header-style">
                    <span className="logoSearch">
                        <span>
                            <img src={logo} className="logoStyle" alt="xyz" />
                        </span>
                        <span>
                            <input
                                name="search"
                                placeholder="Search by movie title"
                                type="text"
                                class="search-input"
                                value=""
                            />
                        </span>
                    </span>
                    <span className="movieLogin">
                        <nav>
                            <NavLink className="nav-tab" to="/wishlist">
                                WishList
                            </NavLink>
                            <NavLink className="nav-tab" to="/movies">
                                Movie
                            </NavLink>
                            <NavLink className="nav-tab" to="/logout">
                                Logout
                            </NavLink>
                        </nav>
                    </span>
                </header>
                <div>
                    <MovieNav></MovieNav>
                </div>
                <div>
                    <Switch>
                        <Route
                            path="/topRatedMovie"
                            render={(props) => (
                                <PopularMovies
                                    {...props}
                                    movieType="top_rated"
                                />
                            )}
                        />
                        <Route
                            path="/nowPlayingMovie"
                            render={(props) => (
                                <PopularMovies
                                    {...props}
                                    movieType="now_playing"
                                />
                            )}
                        />
                        <Route
                            path="/upcomingMovie"
                            render={(props) => (
                                <PopularMovies
                                    {...props}
                                    movieType="upcoming"
                                />
                            )}
                        />
                        <Route
                            path="/movies"
                            render={(props) => (
                                <PopularMovies {...props} movieType="popular" />
                            )}
                        />
                        <Route
                            path="/wishlist"
                            render={(props) => (
                                <Wishlist
                                    {...props}
                                    props={{
                                        user: user,
                                        setUser: setUser,
                                        isLoggedIn: false,
                                        setIsLoggedIn: setIsLoggedIn,
                                    }}
                                />
                            )}
                        />
                        <Route
                            path="/logout"
                            render={(props) => (
                                <Logout
                                    {...props}
                                    props={{
                                        performLogout: logoutLoggedinUser,
                                    }}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/movies/:id"
                            render={(routerProps) => {
                                const id = routerProps.match.params.id;
                                return (
                                    <MovieDetail
                                        {...routerProps}
                                        props={{ id }}
                                    />
                                );
                            }}
                        />

                        <Redirect
                            from="/"
                            exact
                            to="/movies"
                            component={PopularMovies}
                        />
                        <Redirect to="/not-found" />
                    </Switch>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <header className="header-style">
                    <span className="logoSearch">
                        <span>
                            <img src={logo} className="logoStyle" alt="xyz" />
                        </span>
                        <span>
                            <input
                                name="search"
                                placeholder="Search by movie title"
                                type="text"
                                class="search-input"
                                value=""
                            />
                        </span>
                    </span>
                    <span className="movieLogin">
                        <nav>
                            <NavLink className="nav-tab" to="/movies">
                                Movie
                            </NavLink>
                            <NavLink className="nav-tab" to="/login">
                                Login
                            </NavLink>
                        </nav>
                    </span>
                </header>
                <div>
                    <MovieNav></MovieNav>
                </div>
                <div>
                    <Switch>
                        <Route
                            path="/topRatedMovie"
                            render={(props) => (
                                <PopularMovies
                                    {...props}
                                    movieType="top_rated"
                                />
                            )}
                        />
                        <Route
                            path="/nowPlayingMovie"
                            render={(props) => (
                                <PopularMovies
                                    {...props}
                                    movieType="now_playing"
                                />
                            )}
                        />
                        <Route
                            path="/upcomingMovie"
                            render={(props) => (
                                <PopularMovies
                                    {...props}
                                    movieType="upcoming"
                                />
                            )}
                        />
                        <Route
                            path="/movies"
                            render={(props) => (
                                <PopularMovies {...props} movieType="popular" />
                            )}
                        />
                        <Route
                            path="/login"
                            render={(props) => (
                                <Login
                                    {...props}
                                    props={{
                                        onLogin: login,
                                        makeStatusLoggedIn: makeStatusLoggedIn,
                                    }}
                                />
                            )}
                        />
                        <Redirect
                            from="/"
                            exact
                            to="/movies"
                            component={PopularMovies}
                        />
                        <Redirect to="/not-found" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
