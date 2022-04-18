<script lang="ts">
	import { onMount } from 'svelte';
	import { loadUIComponents } from 'ui';
	import 'tailwind/style.css';

	onMount(() => {
		loadUIComponents();
	});
</script>

<div>
	<ui-navbar />
	<slot />
	<ui-footer />
</div>
