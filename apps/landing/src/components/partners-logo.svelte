<script lang="ts">
	import partners from 'ui/src/data/partners.json';
</script>

<div class="flex flex-row space-x-8 justify-center">
	{#each partners as { name, logo, href }}
		<a {href} target="_blank">
			<img src={logo} alt={name} class="h-6 md:h-8" />
		</a>
	{/each}
</div>
