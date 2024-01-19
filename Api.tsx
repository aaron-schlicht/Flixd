import axios from 'axios';
import { Movie, FullMovie, Service } from './constants';

const API_KEY = 'f03e1c9e7d2633ef0b20ab2c36cddb39';

export const getSearchResults = async (query: string) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&adult=false`
		);
		return response.data.results as Movie[];
	} catch (error) {
		console.log(error);
	}
};

export const getMovieRecommendations = async (movieId: number) => {
	let recommendedMovies: FullMovie[] = [];
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&adulte=false&language=en-US&page=1`
		);
		const recommend = response.data.results;
		if (recommend) {
			recommendedMovies.push(...recommend);
		}
	} catch (error) {
		console.log(error);
	}
	return recommendedMovies;
};

export const getMovieInfo = async (movieId: number) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&adult=false&language=en-US`
		);
		const data = response.data;
		if (data) {
			let fullMovie: FullMovie = data;
			const providers = await getProviders(fullMovie.id);
			fullMovie.services = providers;
			return fullMovie;
		}
	} catch (error) {
		console.log(error);
	}
};

export const getProviders = async (movieId: number) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`
		);
		const data = response.data;
		if (data.results['US'] && data.results['US'].flatrate) {
			return data.results['US'].flatrate as Service[];
		}
	} catch (error) {
		console.log(error);
	}
};
