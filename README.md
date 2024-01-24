# Flixd

Welcome to the repository for Flixd, an iOS application built with React Native.

Flixd is an iOS Application built using React Native TypeScript, and integrates The Movie Database (TMDB) API.
Check it out on the iOS App store here: https://apps.apple.com/us/app/reelrecs/id6446706371?uo=4

## Screenshots


<img src="https://github.com/aaron-schlicht/Flixd/assets/135870355/44ea64c2-c52c-4b66-8282-49844d2f4b1a" width=250 />

<img src="https://github.com/aaron-schlicht/Flixd/assets/135870355/296518a5-fab5-4baa-9185-4abca9788b9b" width=250 />

<img src="https://github.com/aaron-schlicht/Flixd/assets/135870355/339b71b4-4580-4426-8a7a-15519863b896" width=250 />

<img src="https://github.com/aaron-schlicht/Flixd/assets/135870355/a7d706b5-4f59-4306-9aa2-8501382740e3" width=250 />

<img src="https://github.com/aaron-schlicht/Flixd/assets/135870355/4af909a2-7088-4901-a199-a9633365f2a2" width=250  />


## Demo
![flixdflow](https://github.com/aaron-schlicht/Flixd/assets/135870355/3115c6f3-b029-4e7c-935a-23e190fb09cc)


## About

Flixd was developed using Expo and EAS, with additional tools such as Redux Toolkit/RTK Query, Axios, React Native Reanimated, React Navigation, etc.

### Features

- **Discover:** The discover page includes a variety of lists of movies to explore (Trending, Now Playing, etc.) which are returned by several queries to TMDB and displayed in the form of tap-able movie poster which, on tap, will take you to the respective movie's page
- **Search:** The search function allows the user to search for any movie they would like to find information about, and returns queried results in an animated scroll format as the user is searching, but gets debounced so that it does not query the database after every key press
- **Movie Screen:** The movie screen is an informational page that users see when they tap on a movie poster, it includes a variety of styled and accessible information - an animated backdrop image, release year, MPAA rating, runtime, rating, synopsis, available streaming platforms, director/s, actors, and suggested movies. The director/s and actors profiles can be tapped to open the "Person" screen to see additional movies that person has been a part of
- **Flixd Flow:** This is a "wizard" type flow that takes users through several steps, each one optional, but with the goal of getting a list of recommended movies given initial parameters of what the user is in the mood for. The steps include Genre: where users can select up to 3 genres that they are looking for, Keywords: where users can select from a suggested list or search for keywords to add to their parameters, Streaming Services: where users can select the streaming services they have to limit the resulting list, and Filters: where the user can filter their results by release date, runtime or rating if they choose. On completion, this returns a list of movies varying in length depending on the specificity of the user's parameters. These parameters are added to TMDB's /discover endpoint which allows for a variety of filters and returns a list of movies based on them. The users input throughout these steps is tracked via Redux.
- **Random:** This screen recommends a random movie to users with parameters of being rated at least a "7" out of 10, has to be a feature-length film, and has to have a vote count of at least 400 to limit the results to at least somewhat popular movies. The "randomness" of this is determined by choosing a random page number for the /discover results based on the pages available, and then a random number based on the length of results from that page. The user can tap on the poster for the random movie that is returned to navigate to it's movie screen, as well as tap the "roll the dice" button to generate a new random movie

## Improvements/TODO

There are many things that are not perfect about this application and many features that would be nice to add
- **Improvements to Code Quality:** In the process of getting this app out as fast as possible and experimenting with things such as animation and getting the right suggestions, parts of the code got overlooked and could definitely be improved to enhance performance, code cleanliness, best practices, and error handling/unit testing. Before I add any additional features, I will prioritize making improvements to the code.
- **Quality of Content Improvements:** A lot of the challenge with TMDB is finding consistency in the quality of the data returned, from recommendations to search results. Some of the features took a lot of tinkering with TMDB API endpoints to ensure the results were what I was looking for, and could still be improved to provide the best data for the user.
- **More Information on Movie and Person Screens:** One of my goals for the app was to provide a one-stop-shop for finding all the movie information you could want about a particular movie, and with the Movie screen, I want to add additional information that could be useful to users such as movie trailers, IMDB rating, all crew members, filming locations, studios, etc. The Person screen could be expanded as well to have information such as biography, and "known-for" designation.
- **Movie Journal and Watchlist:** A later goal for Flixd is to include the ability for users to add movies as "seen" to track the movies that they have seen and eliminate them from features that recommend movies, as well as adding movies they would like to watch to a "Watchlist".
- **Personalized Recommendations:** A stretch goal for Flix is to include the ability for users to rate movies on top of marking them "seen" to add to a system for personalizing recommendations based on movies that they enjoy. It would be really cool to train an AI model that would provide recommendations, but that is something to look into.



