<script lang="ts">
	import { onMount } from 'svelte';

	import 'tailwind/style.css';

	onMount(() => {
		// @ts-ignore
		window.registerUICustomElements();
	});
</script>

<div>
	<ui-navbar />
	<slot />
</div>
