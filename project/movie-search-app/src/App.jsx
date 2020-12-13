import "./App.css";
import React, { useState } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import PopularMovies from "./components/Movies/PopularMovies";
import MovieNav from "./components/MovieNavigation/MovieNav";
import Login from "./components/Login/Login";
import Logout from "./components/Logout/Logout";
import logo from "./images/reactLogo.png";
import { endSession } from "./services/service";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import ViewWatchList from "./components/WatchList/ViewWatchlist";
import Searchform from "./components/Search/Searchform";
import Search from "./components/Search/Search";

function App() {
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
    const login = function ({ username, uid }) {
        setIsLoggedIn(true);
        setCurrentUser(uid);
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
                            <Searchform
                                className="search-input"
                                text_value="mamta"
                            ></Searchform>
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
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/nowPlayingMovie"
                            render={(props) => (
                                <PopularMovies
                                    {...props}
                                    movieType="now_playing"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/upcomingMovie"
                            render={(props) => (
                                <PopularMovies
                                    {...props}
                                    movieType="upcoming"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/movies/:movieid"
                            render={(routerProps) => {
                                const movieid =
                                    routerProps.match.params.movieid;
                                console.log(movieid);
                                return (
                                    <MovieDetail
                                        {...routerProps}
                                        movieid={movieid}
                                        uid={currentUser}
                                    />
                                );
                            }}
                        />
                        <Route
                            path="/movies"
                            render={(props) => (
                                <PopularMovies
                                    {...props}
                                    movieType="popular"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/search/:query"
                            render={(routerProps) => {
                                const query = routerProps.match.params.query;

                                return (
                                    <Search
                                        {...routerProps}
                                        query={query}
                                        uid={currentUser}
                                        className="search-input"
                                    />
                                );
                            }}
                        />
                        <Route
                            path="/wishlist"
                            render={(props) => (
                                <ViewWatchList
                                    {...props}
                                    props={{
                                        uid: currentUser,
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
                            <Searchform className="search-input"></Searchform>
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
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/nowPlayingMovie"
                            render={(props) => (
                                <PopularMovies
                                    {...props}
                                    movieType="now_playing"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/upcomingMovie"
                            render={(props) => (
                                <PopularMovies
                                    {...props}
                                    movieType="upcoming"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/movies/:movieid"
                            render={(routerProps) => {
                                const movieid =
                                    routerProps.match.params.movieid;
                                console.log(movieid);
                                return (
                                    <MovieDetail
                                        {...routerProps}
                                        movieid={movieid}
                                        uid={currentUser}
                                    />
                                );
                            }}
                        />
                        <Route
                            path="/movies"
                            render={(props) => (
                                <PopularMovies
                                    {...props}
                                    movieType="popular"
                                    uid={currentUser}
                                />
                            )}
                        />
                        <Route
                            path="/search/:query"
                            render={(routerProps) => {
                                const query = routerProps.match.params.query;

                                return (
                                    <Search
                                        {...routerProps}
                                        query={query}
                                        uid={currentUser}
                                    />
                                );
                            }}
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
