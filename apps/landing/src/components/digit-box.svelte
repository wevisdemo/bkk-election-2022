<script lang="ts">
	export let value: number;
	export let label: string;

	$: digits = `${value < 10 ? 0 : ''}${value}`.split('');
</script>

<div class="flex-1 flex flex-col space-y-2">
	<div class="flex flex-row space-x-1">
		{#each digits as digit}
			<div class="box flex-1 text-white h-10 md:h-16 flex justify-center items-center typo-h4">
				{digit}
			</div>
		{/each}
	</div>
	<p class="typo-u5 text-center">{label}</p>
</div>

<style>
	.box {
		background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 100%), #b90202;
	}
</style>
