<script lang="ts">
	export let videoId: string;
</script>

<div class="video-container {$$props.class || ''}">
	<iframe
		width="560"
		height="315"
		src="https://www.youtube.com/embed/{videoId}"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	/>
</div>

<style>
	.video-container {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		width: 100%;
		overflow: hidden;
	}

	.video-container iframe,
	.video-container object,
	.video-container embed {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
