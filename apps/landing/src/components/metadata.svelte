<script lang="ts">
	export let title: string = '';

	const description = 'ติดตามข้อมูลเกี่ยวกับการเลือกตั้ง กทม. 2022 ได้ที่นี่';

	$: fullTitle = `${title ? `${title} - ` : ''}Bangkok Election 2022`;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta
		property="og:image"
		content="https://bkkelection2022.wevis.info/static/images/main_og.png"
	/>
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
