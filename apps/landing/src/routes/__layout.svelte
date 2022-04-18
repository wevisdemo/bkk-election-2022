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
	<div class="bg-black px-3">
		<div class="max-w-screen-xl mx-auto flex justify-center py-8 border-white border-b">
			<ui-sharer url="https://bkkelection2022.wevis.info" />
		</div>
	</div>
	<ui-footer />
</div>
