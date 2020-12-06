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

function App() {
    const [user, setUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    let content = "";
    if (isLoggedIn) {
        content = (
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
        );
    } else {
        content = (
            <nav>
                <NavLink className="nav-tab" to="/movies">
                    Movie
                </NavLink>
                <NavLink className="nav-tab" to="/login">
                    Login
                </NavLink>
            </nav>
        );
    }

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
                <span className="movieLogin">{content}</span>
            </header>
            <div>
                <MovieNav></MovieNav>
            </div>
            <div>
                <Switch>
                    <Route path="/topRatedMovie" component={TopRatedMovies} />
                    <Route path="/nowPlayingMovie" component={NowPlaying} />
                    <Route path="/upcomingMovie" component={Upcoming} />
                    <Route path="/movies" component={PopularMovies} />
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
                                    user: user,
                                    setUser: setUser,
                                    isLoggedIn: false,
                                    setIsLoggedIn: setIsLoggedIn,
                                }}
                            />
                        )}
                    />
                    <Route
                        path="/login"
                        render={(props) => (
                            <Login
                                {...props}
                                props={{
                                    user: user,
                                    setUser: setUser,
                                    isLoggedIn: true,
                                    setIsLoggedIn: setIsLoggedIn,
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

export default App;
