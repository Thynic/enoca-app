import { createStore } from "vuex";
import axios from "axios";

export default createStore({
	state: {},
	mutations: {},
	actions: {
		async getNowPlaying() {
			let nowPlaying;
			await axios
				.get(
					"movie/now_playing?api_key=3c4a75c60ab27c385698962f1c76f654&language=en-US&page=1"
				)
				.then((response) => {
					if (!response.error) {
						nowPlaying = response.data;
					}
				});
			return nowPlaying;
		},

		async searchMovies(context, query) {
			console.log(context.state);
			let foundMovies;
			await axios
				.get(
					`search/movie?api_key=3c4a75c60ab27c385698962f1c76f654&language=en-US&page=1&include_adult=false&query=${query}`
				)
				.then((response) => {
					if (!response.error) {
						foundMovies = response.data;
					}
				});
			return foundMovies;
		},

		async getMovieDetails(context, movieId) {
			console.log(context.state);

			let movieDetails;
			await axios
				.get(
					`movie/${movieId}?api_key=3c4a75c60ab27c385698962f1c76f654&language=en-US`
				)
				.then((response) => {
					if (!response.error) {
						movieDetails = response.data;
					}
				});
			return movieDetails;
		},

		async getMovieReviews(context, movieId) {
			console.log(context.state);

			let movieReviews;
			await axios
				.get(
					`movie/${movieId}/reviews?api_key=3c4a75c60ab27c385698962f1c76f654&language=en-US&page=1&`
				)
				.then((response) => {
					if (!response.error) {
						movieReviews = response.data;
					}
				});
			return movieReviews;
		},

		async getMovieCast(context, movieId) {
			console.log(context.state);

			let movieCast;
			await axios
				.get(
					`movie/${movieId}/credits?api_key=3c4a75c60ab27c385698962f1c76f654&language=en-US`
				)
				.then((response) => {
					if (!response.error) {
						movieCast = response.data;
					}
				});
			return movieCast;
		},

		async getUpcomingMovies() {
			let upcomingMovies;
			await axios
				.get(
					`movie/upcoming?api_key=3c4a75c60ab27c385698962f1c76f654&language=en-US&page=1`
				)
				.then((response) => {
					if (!response.error) {
						upcomingMovies = response.data;
					}
				});

			return upcomingMovies;
		},

		async getTopRatedMovies() {
			let topRatedMovies;
			await axios
				.get(
					`movie/top_rated?api_key=3c4a75c60ab27c385698962f1c76f654&language=en-US&page=1`
				)
				.then((response) => {
					if (!response.error) {
						topRatedMovies = response.data;
					}
				});

			return topRatedMovies;
		},

		async getPopularMovies() {
			let popularMovies;
			await axios
				.get(
					`movie/popular?api_key=3c4a75c60ab27c385698962f1c76f654&language=en-US&page=1`
				)
				.then((response) => {
					if (!response.error) {
						popularMovies = response.data;
					}
				});

			return popularMovies;
		},
	},
});
