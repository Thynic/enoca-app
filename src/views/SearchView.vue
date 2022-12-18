<script>
import Input from "../components/forms/Input.vue";
import { mapActions } from "vuex";
import Card from "../components/cards/Card.vue";

export default {
	name: "SearchView",
	components: {
		Input,
		Card,
	},
	data() {
		return {
			filterVal: "",
			foundMovieList: [],
			query: this.$route.params.query,
			nothingFound: false,

			loaded: false,
		};
	},
	methods: {
		...mapActions(["searchMovies", "getMovieDetails"]),
		_searchMovies() {
			this.searchMovies(this.query).then((res) => {
				if (res.results.length == 0) {
					this.nothingFound = true;
				} else {
					this.nothingFound = false;
					res.results.forEach((movie, index) => {
						let genre;
						this.getMovieDetails(movie.id).then((res) => {
							if (res.genres.length > 0) {
								genre = res.genres[0].name;
							}
							movie.genre = genre;
							movie.order = index + 1;
							movie.avatar = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
							this.foundMovieList.push(movie);
						});
					});
				}
				this.loaded = true;
			});
		},
		filterChanged(val) {
			this.filterVal = val;
		},

		search() {
			this.loaded = false;
			if (this.filterVal != "") {
				this.foundMovieList = [];

				this.query = this.filterVal;
				this._searchMovies();
			}
		},
	},
	mounted() {
		this._searchMovies();
	},
	watch: {
		nothingFound(val) {
			if (val == true) {
				document.querySelector(".nothing-found").style.display = "block";
			} else {
				document.querySelector(".nothing-found").style.display = "none";
			}
		},

		loaded(val) {
			if (val == true) {
				document.querySelector(".pre-load").style.display = "none";
				document.querySelector(".main").style.display = "block";
			} else {
				document.querySelector(".pre-load").style.display = "block";
				document.querySelector(".main").style.display = "none";
			}
		},
	},
};
</script>

<template>
	<div class="pre-load" style="display: block">
		<img src="../assets/popcorn.png" alt="" />
	</div>
	<div class="main" style="display: none">
		<form class="search-bar" @submit.prevent="search">
			<Input @inputChange="filterChanged" :placeholder="query" />
		</form>
		<div class="nothing-found" style="display: none">
			<img src="../assets/noresult.png" alt="" />
			<h6 class="no-found-info">We are Sorry, We Can Not Find The Movie :(</h6>
			<h6 class="search-tip">
				Find your movie by typing title, categories, years, etc.
			</h6>
		</div>

		<div class="container">
			<div
				class="container-item"
				v-for="movie in foundMovieList"
				:key="movie.id"
			>
				<Card
					:avatar="movie.avatar"
					:orderNum="movie.order"
					:movieId="movie.id"
					:orderVis="false"
				/>
				<div class="creds">
					<p>
						<span class="movie-title">{{ movie.original_title }}</span>
					</p>
					<p>
						<span class="movie-rating">{{
							parseFloat(movie.vote_average).toFixed(1)
						}}</span>
					</p>
					<p v-if="movie.genre">{{ movie.genre }}</p>
					<p>{{ movie.release_date.substring(0, 4) }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.pre-load {
	position: absolute;
	width: 189px;
	height: 189px;
	left: 93px;
	top: 311px;
}

.no-found-info {
	position: absolute;
	height: 52px;
	left: 25.07%;
	right: 24.8%;
	top: calc(50% - 52px / 2 + 23px);

	font-family: "Montserrat";
	font-style: normal;
	font-weight: 600;
	font-size: 16px;
	line-height: 160%;
	/* or 26px */

	text-align: center;
	letter-spacing: 0.12px;
	text-transform: capitalize;

	/* White Grey */

	color: #ebebef;
}

.search-tip {
	position: absolute;
	height: 38px;
	left: 16.53%;
	right: 16.27%;
	top: calc(50% - 38px / 2 + 76px);

	font-family: "Montserrat";
	font-style: normal;
	font-weight: 500;
	font-size: 12px;
	line-height: 160%;
	/* or 19px */

	text-align: center;
	letter-spacing: 0.12px;

	/* Grey */

	color: #92929d;
}
.nothing-found {
	display: flex;
	justify-content: center;
	align-items: center;
}

.nothing-found img {
	margin-top: 64%;
	width: 76px;
}
.movie-rating {
	color: #ff8700;
}
.movie-title {
	font-size: 16px;
	line-height: 24px;
}
.creds {
	display: flex;
	flex-direction: column;
	margin-left: 6vh;
	/* margin-top: 6vh; */
}

.creds p {
	justify-content: center;
	align-items: center;
}
p {
	color: #fff;
	font-size: 12px;
	line-height: 18px;
}
.container {
	display: flex;
	flex-direction: column;
}

div.container {
	white-space: nowrap;
}

div.container div {
	display: inline-block;
	text-align: left;
	padding: 14px;
	text-decoration: none;
}

.container-item {
	margin: 0 10px;
}
</style>
