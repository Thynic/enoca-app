<script>
import { mapActions } from "vuex";

export default {
	name: "DetailsView",
	components: {},
	data() {
		return {
			movie: {},
			movieId: this.$route.params.id,

			poster: "",
			backdrop: "",
			movieReviews: {},
			movieCast: {},

			loaded: false,
		};
	},
	methods: {
		...mapActions(["getMovieDetails", "getMovieReviews", "getMovieCast"]),
		openTab(tabName) {
			var i;
			var x = document.getElementsByClassName("tab");
			for (i = 0; i < x.length; i++) {
				x[i].style.display = "none";
			}
			document.getElementById(tabName).style.display = "block";
		},
	},
	mounted() {
		this.getMovieDetails(this.movieId).then((res) => {
			this.movie = res;
			this.movie.release_date = this.movie.release_date.substring(0, 4);
			this.movie.genre = this.movie.genres[0].name;

			this.poster = `https://image.tmdb.org/t/p/w500${this.movie.poster_path}`;
			this.backdrop = `https://image.tmdb.org/t/p/w500${this.movie.backdrop_path}`;
			console.log(this.movie);

			this.loaded = true;
		});

		this.getMovieReviews(this.movieId).then((res) => {
			this.movieReviews = res;
			console.log(this.movieReviews);

			this.loaded = true;
		});

		this.getMovieCast(this.movieId).then((res) => {
			this.movieCast = res;
			console.log(this.movieCast);

			this.loaded = true;
		});
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
};
</script>

<template>
	<div class="pre-load" style="display: block">
		<img src="../assets/popcorn.png" alt="" />
	</div>
	<div class="main" style="display: none">
		<div class="movie-card">
			<div>
				<img class="backdrop" :src="backdrop" alt="" />
				<div class="bottom-left">
					<img class="poster" :src="poster" alt="" />
				</div>
			</div>
		</div>

		<div>
			<p class="creds">
				{{ movie.release_date }} | {{ movie.runtime }} minutes |
				{{ movie.genre }}
			</p>
		</div>

		<div class="tabs">
			<div class="w3-bar tab-header">
				<button class="w3-bar-item w3-button" @click="openTab('about-movie')">
					About Movie
				</button>
				<button class="w3-bar-item w3-button" @click="openTab('reviews')">
					Reviews
				</button>
				<button class="w3-bar-item w3-button" @click="openTab('cast')">
					Cast
				</button>
			</div>
			<div class="tab-contents">
				<div id="about-movie" class="w3-container tab">
					<div class="container tab-element">
						<p>{{ movie.overview }}</p>
					</div>
				</div>

				<div id="reviews" class="w3-container tab" style="display: none">
					<div class="reviews-container tab-element">
						<div
							class="review"
							v-for="review in movieReviews.results"
							:key="review.id"
						>
							<div class="review-header">
								<div class="review-author">
									<div class="img-and-name">
										<img
											class="review-author-image"
											:src="`https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`"
											alt=""
										/>
										<p class="review-author-name">{{ review.author }}</p>
									</div>

									<p class="review-rating">
										{{ review.author_details.rating }}
									</p>
								</div>

								<p class="review-content">{{ review.content }}</p>
							</div>
						</div>
					</div>
				</div>

				<div id="cast" class="w3-container tab" style="display: none">
					<div class="cast-container tab-element">
						<div class="cast" v-for="cast in movieCast.cast" :key="cast.id">
							<div class="cast-header">
								<div class="cast-image">
									<img
										class="cast-image"
										:src="`https://image.tmdb.org/t/p/w500${cast.profile_path}`"
										alt=""
									/>
								</div>
								<div class="cast-name">
									<p>{{ cast.name }}</p>
								</div>
							</div>
						</div>
					</div>
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
.img-and-name {
	display: flex;
	flex-direction: row;
}

.review-content {
	overflow: scroll;
}
.review-header {
	display: flex;
	flex-direction: row;

	border: #fff 1px solid;
}
.review-author-image {
	position: relative;
	width: 44px;
	height: 44px;
	border-radius: 50%;
	margin-left: 20px;
}

.review-author-name {
	margin-top: 10px;
	font-size: 14px;
	font-family: "Poppins";
	color: #fff;
}

.review-rating {
	color: #0296e5;
	margin-left: -20px;
}

.cast-image {
	position: relative;
	margin-left: 32%;
	align-content: center;
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
.creds {
	color: #92929d;
	margin-top: 46vh;
}
.tabs {
	margin-top: -14vh;
}

.tab-element {
	margin-left: -20px;
	/* margin-top: -44vh; */
}

.tab-header {
	margin-top: 16vh;
	color: #fff;
}

p {
	z-index: 5;
	font-family: "Poppins";

	color: #fff;
	margin-left: 30px;
	font-size: 12px;
	line-height: 18px;
}
.backdrop {
	border-radius: 0px 0px 16px 16px;
}

.poster {
	width: 144.61px;
	height: 210px;
	margin-left: 30px;

	border-radius: 16px;
}

.movie-card {
	position: absolute;
	top: 2px;
	width: 100%;
	height: 210px;
}

.bottom-left {
	position: absolute;
	bottom: 8px;

	width: 70.42px;
	height: 57.84px;

	font-family: "Montserrat";
	font-style: normal;
	font-weight: 600;
	font-size: 96px;
	line-height: 117px;

	color: #242a32;
	text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>
