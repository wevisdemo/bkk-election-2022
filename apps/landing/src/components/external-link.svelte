<script lang="ts">
	export let href: string;
	export let button = false;
</script>

<a
	{href}
	class="text-ultramarine {button
		? 'px-4 py-2 flex flex-row items-center justify-center space-x-2 border-2 border-ultramarine hover:bg-ultramarine hover:text-white'
		: ' hover:underline'}"
	target="_blank"><slot /></a
>
