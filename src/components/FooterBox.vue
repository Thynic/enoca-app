<script>
export default {
	name: "FooterBox",
	components: {},
	props: {},
};
</script>

<template>
	<div class="footer">
		<img class="home" src="../assets/home.png" alt="" />
		<img class="search" src="../assets/search.jpg" alt="" />
		<img class="save" src="../assets/save.png" alt="" />
	</div>
</template>

<style scoped>
.save {
	position: absolute;
	/* width: 24px; */
	height: 24px;
	left: 85%;
	top: 27px;
}

.home {
	position: absolute;
	width: 24px;
	height: 24px;
	left: 10%;
	top: 27px;
}

.search {
	position: absolute;
	width: 24px;
	height: 24px;
	left: 47%;
	top: 27px;
}

.footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	background-color: red;
	color: white;
	text-align: center;
	width: 375px;
	height: 78px;
	left: calc(50% - 375px / 2 + 1px);
	top: calc(50% - 78px / 2 + 367px);

	background: #242a32;
	border-top: 2px solid #0296e5;
}
</style>
