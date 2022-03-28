<script lang="ts">
	import { fetchElectionPosts } from 'the-standard-api';
</script>

<div class="px-6 py-12 max-w-screen-xl mx-auto space-y-6">
	<h1 class="typo-h4">ข่าวล่าสุดเกี่ยวกับการเลือกตั้ง กทม.</h1>

	{#await fetchElectionPosts()}
		<p>Loading...</p>
	{:then posts}
		<div class="grid grid-cols-3 gap-12">
			{#each posts as post}
				<ui-post-card {...post} />
			{/each}
		</div>
	{:catch error}
		<p>Something went wrong: {error.message}</p>
	{/await}
</div>
