<script lang="ts">
	import PostGrid from '../components/post-grid.svelte';
	import { fetchElectionPosts } from 'the-standard-api';
</script>

<PostGrid
	title="ข่าวล่าสุดเกี่ยวกับการเลือกตั้ง กทม."
	subtitle="รวมข่าวสารเกี่ยวกับการเลือกตั้ง กทม. จาก The STANDARD"
	fetchPosts={fetchElectionPosts}
	viewAllText="ดูข่าวทั้งหมด บน thestandard.co"
	viewAllLink="https://thestandard.co/tag/bkkelection2022/"
/>
