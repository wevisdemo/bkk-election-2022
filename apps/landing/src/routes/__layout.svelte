<script lang="ts">
	import { onMount } from 'svelte';
	import { loadUIComponents } from 'ui';
	import 'tailwind/style.css';

	onMount(() => {
		loadUIComponents();
	});
</script>

<svelte:head>
	{#if import.meta.env.VITE_BUILD_ENV === 'PRODUCTION'}
		<script
			async
			defer
			data-domain="bkkelection2022.wevis.info"
			src="https://analytics.punchup.world/js/plausible.js"></script>
	{/if}
</svelte:head>

<div>
	<ui-navbar />
	<slot />
	<div class="bg-black px-3">
		<div class="max-w-screen-xl mx-auto flex justify-center py-8 border-white border-b">
			<ui-sharer url="https://bkkelection2022.wevis.info" />
		</div>
	</div>
	<ui-footer />
</div>
