<script lang="ts">
	import { fetchElectionPosts } from 'the-standard-api';
</script>

<div>
	<h1 class="typo-h1">BKK Election 2022</h1>

	{#await fetchElectionPosts()}
		<p>Loading...</p>
	{:then posts}
		<div class="space-y-4">
			{#each posts as post}
				<div>{JSON.stringify(post)}</div>
			{/each}
		</div>
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>
