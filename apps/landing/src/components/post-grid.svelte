<script lang="ts">
	import type { Post } from 'the-standard-api';

	export let title: string;
	export let subtitle: string;
	export let viewAllText: string;
	export let viewAllLink: string;
	export let fetchPosts: () => Promise<Post[]>;
</script>

<div class="px-5 py-12 max-w-screen-xl mx-auto space-y-8">
	<div class="flex flex-col md:flex-row space-y-4 md:space-y-0">
		<div class="flex-1">
			<h1 class="typo-h4">{title}</h1>
			<h2 class="typo-u3">{subtitle}</h2>
		</div>
		<div>
			<a
				href={viewAllLink}
				target="_blank"
				class="flex flex-row space-x-2 items-center typo-b5 hover:underline"
			>
				<span>{viewAllText}</span>
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M6 10L14 2" stroke="black" stroke-width="2" />
					<path d="M7 1H15V9" stroke="black" stroke-width="2" />
					<path d="M11 9.85714V15H1V5H6.14286" stroke="black" stroke-width="2" />
				</svg>
			</a>
		</div>
	</div>

	{#await fetchPosts()}
		<p>กำลังโหลด...</p>
	{:then posts}
		<div
			class="flex md:grid md:grid-cols-3 gap-6 md:gap-12 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0"
		>
			{#each posts as post}
				<div class="flex-shrink-0 w-64 md:w-auto">
					<ui-post-card {...post} />
				</div>
			{/each}
		</div>
	{:catch error}
		<p>พบข้อผิดพลาด: {error.message}</p>
	{/await}
</div>
