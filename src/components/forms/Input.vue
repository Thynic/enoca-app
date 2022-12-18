<script>
export default {
	name: "TheInput",
	props: {
		type: {
			type: String,
			default: "text",
		},
		inputText: {
			type: String,
		},
		placeholder: {
			type: String,
		},
		outline: {
			type: Boolean,
		},
		search: {
			type: Boolean,
		},
		required: {
			type: Boolean,
		},
		verify: {
			type: Boolean,
		},
	},
	data() {
		return {
			currentVal: "",
		};
	},
	methods: {
		keyDownValue(event) {
			this.currentVal = event.target.value;
			this.name
				? this.$emit("inputChange", this.name, this.currentVal)
				: this.$emit("inputChange", this.currentVal);
		},
	},
	// components: { BsSearch },
};
</script>

<template>
	<div id="input-main">
		<input
			:type="type"
			:placeholder="placeholder"
			:value="currentVal"
			@keyup="keyDownValue"
		/>
		<span class="input-text" v-if="inputText"> {{ inputText }} </span>
	</div>
</template>

<style scoped>
input {
	position: relative;
	width: 331px;
	height: 42px;
	color: #fff;

	padding-left: 12px;

	background: #3a3f47;
	border-radius: 16px;
}
</style>
