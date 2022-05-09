<script lang="ts">
	export let title: string = '';

	const description = `สรุปครบ 'เลือกตั้งผู้ว่าฯ กทม. 2565' และ 'เลือกตั้ง ส.ก.' เช็กประวัติ นโยบาย หมายเลขแคนดิเดต พร้อมคู่มือเลือกตั้ง และเช็กผลเลือกตั้ง กทม. แบบเรียลไทม์`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta
		property="og:image"
		content="https://bkkelection2022.wevis.info/static/images/main_og.png"
	/>
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
