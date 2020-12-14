MOVIE BROWSING APPLICATION

This application can be used to browse the movies of multiple Genres.
User can Vie the Popular, Top Rated , Now Playing and Upcoming Movies.
User can read movie description, can get information about the movie like release date, budget, Rating, Movie description etc.
User can search a movie with the movie title. App will shows all the movies having the title mentioned in the search field.
User can Watchlist a movie which is like marking a movie as favorite. This creates a watchlist to keep track to movies to be watched in future.
User can also remove the movie from Watchlist (Use case: Once saw the movie or not intrested anymore in watching the movie)
A User needs to login to watchlist a movie or to view a watchlist. This service is only for logged in user.
A user can only see different movies and it details without a login-in.

API Used:

I have used The Movie Database API i.e. https://developers.themoviedb.org/3 to fetch the movies(Popular/ Now Playing / Top Rated /Upcoming ), movie discription, Search Movies, Get Genres for a movie etc.
I have also written services for user login, logout , to get logged in user watchlist , to add a movie to watchlist and to delete a movie from the watch list.
For user login values including 'dog' and spaces is not allowed. The app will throw bad lofin error.
If the user is not logged in , the app will not allow user to add movie to the watch list and will throw error "login to add movie to the watchlist"
User cannot add same movie multiple times and if user tries to do so , the app will throw error "movie already in the watchlist".

To Run The app:
npm install
npm start
The app will run on localhost:5000

Refrences:
The images related to the movie in the application is from the The Movie Database API.
The background image of the project is taken from unsplash.com https://unsplash.com/photos/evlkOfkQ5rE
