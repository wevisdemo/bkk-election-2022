<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import type { Post } from 'wordpress-api';
	import PostCardWrapper from './post-card-wrapper.svelte';

	const POST_COUNT = 6;
	const postsDummy = new Array(POST_COUNT).fill(null);

	export let title: string;
	export let subtitle: string;
	export let viewAllText: string;
	export let viewAllLink: string;
	export let fetchPosts: () => Promise<Post[]>;

	let element: HTMLElement;
	let intersecting: boolean;
</script>

<IntersectionObserver once {element} bind:intersecting>
	<div bind:this={element} class="pt-12 pb-14 space-y-12 md:py-28 md:space-y-16 md:pb-32">
		<div class="flex flex-col md:flex-row space-y-4 md:space-y-0">
			<div class="flex-1 justify-center text-center">
				<h1 class="typo-h2 mb-1 px-8">{title}</h1>
				<h2 class="typo-u3 mb-1 px-8">{subtitle}</h2>

				<a
					href={viewAllLink}
					target="_blank"
					class="inline-flex flex-row space-x-2 items-center typo-b5 underline hover:opacity-60"
				>
					<span>{viewAllText}</span>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
						<path d="M6 10L14 2" stroke="black" stroke-width="2" />
						<path d="M7 1H15V9" stroke="black" stroke-width="2" />
						<path d="M11 9.85714V15H1V5H6.14286" stroke="black" stroke-width="2" />
					</svg>
				</a>
			</div>
		</div>

		<div
			class="flex md:grid md:grid-cols-3 gap-6 md:gap-12 overflow-y-hidden overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0"
		>
			{#if intersecting}
				{#await fetchPosts()}
					{#each postsDummy as _}
						<PostCardWrapper>
							<ui-post-card loading="true" />
						</PostCardWrapper>
					{/each}
				{:then posts}
					{#each posts as post}
						<PostCardWrapper>
							<ui-post-card {...post} />
						</PostCardWrapper>
					{/each}
				{:catch error}
					<p>พบข้อผิดพลาด: {error.message}</p>
				{/await}
			{:else}
				{#each postsDummy as _}
					<PostCardWrapper>
						<ui-post-card loading="true" />
					</PostCardWrapper>
				{/each}
			{/if}
		</div>
	</div>
</IntersectionObserver>
