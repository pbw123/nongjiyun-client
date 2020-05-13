<template>
	<div class="all">
		<div class="container">
		</div>
		<div class="sign-box">
			<router-view />
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
	};
</script>

<style scoped>
	* {
		margin: 0px;
		padding: 0px;
	}

	.all {
		background-color: rgb(241, 241, 241);
		background-size: 100%;
		background-image: url(/static/nongtian3.jpg);
	}

	.container {
		width: 100%;
		height: 654px;
		background-size: 100%;
	}


	.sign-box {

	}

</style>
