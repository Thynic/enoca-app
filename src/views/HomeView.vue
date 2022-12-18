<script>
import Input from "../components/forms/Input.vue";
import Card from "../components/cards/Card.vue";
import { mapActions } from "vuex";
import Footer from "../components/FooterBox.vue";

export default {
	name: "HomeView",
	components: {
		Input,
		Card,
		Footer,
	},
	data() {
		return {
			filterVal: "",
			nowPlayingList: [],
			upcomingMovies: [],
			topRatedMovies: [],
			popularMovies: [],

			selectedIndex: 0,
			loop: false,
			animationEnabled: true,
			swipeEnabled: true,

			loaded: false,
		};
	},

	methods: {
		...mapActions([
			"getNowPlaying",
			"getUpcomingMovies",
			"getTopRatedMovies",
			"getPopularMovies",
		]),
		filterChanged(val) {
			this.filterVal = val;
		},

		search() {
			this.loaded = false;
			if (this.filterVal != "") {
				this.$router.push({
					name: "search",
					params: { query: this.filterVal },
				});
			}
		},

		openTab(tabName) {
			var i;
			var x = document.getElementsByClassName("tab");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "none";
			}
			document.getElementById(tabName).style.display = "block";
		},
	},
	watch: {
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

	mounted() {
		this.getNowPlaying().then((res) => {
			res.results.forEach((movie, index) => {
				movie.order = index + 1;
				movie.avatar = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
				this.nowPlayingList.push(movie);

				this.loaded = true;
			});
		});

		this.getUpcomingMovies().then((response) => {
			response.results.forEach((movie, index) => {
				movie.order = index + 1;
				movie.avatar = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
				this.upcomingMovies.push(movie);
			});
		});

		this.getTopRatedMovies().then((response) => {
			response.results.forEach((movie, index) => {
				movie.order = index + 1;
				movie.avatar = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
				this.topRatedMovies.push(movie);

				this.loaded = true;
			});
		});

		this.getPopularMovies().then((response) => {
			response.results.forEach((movie, index) => {
				movie.order = index + 1;
				movie.avatar = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
				this.popularMovies.push(movie);
			});
		});
	},
};
</script>

<template>
	<div class="pre-load" style="display: block">
		<img src="../assets/popcorn.png" alt="" />
	</div>
	<div class="main" style="display: none">
		<h1 class="desc">What do you want to watch?</h1>

		<form class="search-bar" @submit.prevent="search">
			<Input @inputChange="filterChanged" placeholder="Search" />
		</form>

		<div class="container">
			<div
				class="container-item"
				v-for="movie in topRatedMovies"
				:key="movie.id"
			>
				<Card
					:avatar="movie.avatar"
					:orderNum="movie.order"
					:movieId="movie.id"
				/>
			</div>
		</div>

		<div class="tabs">
			<div class="w3-bar tab-header">
				<button class="w3-bar-item w3-button" @click="openTab('now-playing')">
					Now Playing
				</button>
				<button class="w3-bar-item w3-button" @click="openTab('upcoming')">
					Upcoming
				</button>
				<button class="w3-bar-item w3-button" @click="openTab('top-rated')">
					Top Rated
				</button>
				<button class="w3-bar-item w3-button" @click="openTab('popular')">
					Popular
				</button>
			</div>
			<div class="tab-contents">
				<div id="now-playing" class="w3-container tab">
					<div class="container tab-element">
						<div
							class="container-item"
							v-for="movie in nowPlayingList"
							:key="movie.id"
						>
							<Card
								:avatar="movie.avatar"
								:orderNum="movie.order"
								:movieId="movie.id"
								:orderVis="false"
							/>
						</div>
					</div>
				</div>

				<div id="upcoming" class="w3-container tab" style="display: none">
					<div class="container">
						<div
							class="container-item tab-element"
							v-for="movie in upcomingMovies"
							:key="movie.id"
						>
							<Card
								:avatar="movie.avatar"
								:orderNum="movie.order"
								:movieId="movie.id"
								:orderVis="false"
							/>
						</div>
					</div>
				</div>

				<div id="top-rated" class="w3-container tab" style="display: none">
					<div class="container">
						<div
							class="container-item tab-element"
							v-for="movie in topRatedMovies"
							:key="movie.id"
						>
							<Card
								:avatar="movie.avatar"
								:orderNum="movie.order"
								:movieId="movie.id"
							/>
						</div>
					</div>
				</div>

				<div id="popular" class="w3-container tab" style="display: none">
					<div class="container">
						<div
							class="container-item tab-element"
							v-for="movie in popularMovies"
							:key="movie.id"
						>
							<Card
								:avatar="movie.avatar"
								:orderNum="movie.order"
								:movieId="movie.id"
								:orderVis="false"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<Footer />
</template>

<style scoped>
@import "https://www.w3schools.com/w3css/4/w3.css";

.pre-load {
	position: absolute;
	width: 189px;
	height: 189px;
	left: 93px;
	top: 311px;
}

div.container {
	overflow: auto;
	white-space: nowrap;
}

div.container div {
	display: inline-block;
	text-align: center;
	padding: 14px;
	text-decoration: none;
}

.tabs {
	margin-top: -16vh;
}

.tab-element {
	margin-left: -20px;
	margin-top: -4vh;
}

.tab-header {
	margin-top: 16vh;
	color: #fff;
}
.container {
	display: flex;
	flex-direction: row;
	height: 44vh;
	margin-top: -2vh;
}

.container-item {
	margin: 0 10px;
}
.desc {
	text-align: left;
	margin-left: 20px;

	/* position: absolute; */
	width: 317px;
	height: 27px;
	left: 24px;
	top: 42px;

	font-family: "Poppins";
	font-style: normal;
	font-weight: 600;
	font-size: 18px;
	line-height: 27px;
	/* identical to box height */

	color: #ffffff;
}
</style>
