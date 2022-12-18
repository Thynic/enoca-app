<script>
export default {
	name: "TheCard",
	components: {},
	props: {
		avatar: {
			type: String,
			default: null,
		},
		movieId: {
			type: Number,
		},
		orderNum: {
			type: Number,
			required: true,
		},
		orderVis: {
			type: Boolean,
			default: true,
		},
	},
};
</script>

<template>
	<div
		class="movie-card"
		@click="this.$router.push({ name: 'details', params: { id: movieId } })"
	>
		<div style="order: {{movieId}}">
			<img class="poster" :src="avatar" alt="" />
			<div v-if="orderVis" class="bottom-left">{{ orderNum }}</div>
		</div>
	</div>
</template>

<style>
.movie-card {
	display: flex;
	flex-direction: row;
}

.poster {
	width: 144.61px;
	height: 210px;

	border-radius: 16px;
}

.movie-card {
	position: relative;
	text-align: center;
	color: white;

	/* left: 4.06px; */
	top: 40px;
	width: 144.61px;
	height: 210px;
}

/* Bottom left text */
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
