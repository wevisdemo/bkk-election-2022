<script lang="ts">
	export let th: string;
	export let en: string;
	export let href: string = null;
	export let external = false;
	export let image: string;
</script>

<div class="relative bg-gray h-44 md:h-52">
	<a
		{href}
		target={external ? '_blank' : ''}
		class="absolute inset-0 border border-black hover:border-white"
	>
		<div class="absolute inset-0">
			<img src={image} alt={en} class="object-cover w-full h-full" />
		</div>
		<div class="content absolute inset-0 flex flex-row px-8 py-6 bg-black bg-opacity-20">
			<div class="flex-1">
				<p class="typo-u3">{en}</p>
				<p class="typo-h6">{th}</p>
			</div>
			{#if external}
				<svg width="16" height="17" viewBox="0 0 16 17" fill="none" stroke="white" stroke-width="2">
					<path d="M6.00037 10.5L14.0004 2.5" />
					<path d="M7.00037 1.5H15.0004V9.5" />
					<path d="M11.0004 10.3571V15.5H1.00037V5.5H6.14322" />
				</svg>
			{:else}
				<svg width="17" height="19" viewBox="0 0 17 19" fill="none" stroke="white" stroke-width="2">
					<path d="M8 1.5L15.5789 9.5L8 17.5" />
					<path d="M0 9.5L16 9.5" />
				</svg>
			{/if}
		</div>
	</a>

	{#if !href}
		<div class="absolute inset-0 flex justify-center items-center typo-b2 bg-black bg-opacity-60">
			Coming soon
		</div>
	{/if}
</div>
