<script lang="ts">
	import { fetchTheStandardElectionPosts, fetchWeVisElectionPosts } from 'wordpress-api';
	import PostGrid from '../components/post-grid.svelte';
	import Counter from '../components/counter.svelte';

	const THE_STANDARD_GUIDE_TAG = 'bkk-election-101';

	const fetchTheStandardElectionGuides = () =>
		fetchTheStandardElectionPosts({ tag: THE_STANDARD_GUIDE_TAG });

	const organizations = [
		{
			name: 'WeVis',
			logo: '/static/images/logo-wevis.png',
			href: 'https://wevis.info'
		},
		{
			name: 'The Standard',
			logo: '/static/images/logo-tsd.png',
			href: 'https://thestandard.co/'
		},
		{
			name: 'Wisesight',
			logo: '/static/images/logo-wisesight.png',
			href: 'https://wisesight.com/'
		}
	];
</script>

<div class="bg-black text-white py-12 md:py-24 flex flex-col space-y-12">
	<div
		class="flex flex-col md:flex-row justify-center px-5 w-full max-w-screen-xl mx-auto space-y-8 md:space-y-0 md:space-x-16"
	>
		<div class="flex-1 flex flex-col space-y-8">
			<img src="/static/images/bkkelection-white-big.png" alt="BKK ELECTION 2022" />
			<p class="typo-b4 text-center">
				ติดตามข้อมูลเกี่ยวกับการเลือกตั้งผู้ว่าฯ และสมาชิกสภา กทม. ได้ที่นี่
			</p>
			<Counter until={new Date('2022-05-22 8:00 GMT+7')}>
				นับถอยหลังเปิดหีบเลือกตั้ง<br />วันอาทิตย์ ที่ 22 พ.ค. 2565 8:00-17:00 น.
			</Counter>
		</div>
		<div class="flex-1 flex flex-col space-y-8">
			<div class="text-center">video</div>
			<div class="flex flex-row space-x-5 justify-center">
				{#each organizations as { name, logo, href }}
					<a {href} target="_blank">
						<img src={logo} alt={name} class="h-6" />
					</a>
				{/each}
			</div>
		</div>
	</div>
</div>

<div class="flex flex-col max-w-screen-xl mx-auto divide-y divide-black px-5 md:py-8">
	<PostGrid
		title="ข่าวล่าสุดเกี่ยวกับการเลือกตั้ง กทม."
		subtitle="รวมข่าวสารเกี่ยวกับการเลือกตั้ง กทม. จาก The STANDARD"
		fetchPosts={fetchTheStandardElectionPosts}
		viewAllText="ดูข่าวทั้งหมด บน thestandard.co"
		viewAllLink="https://thestandard.co/tag/bkkelection2022/"
	/>

	<PostGrid
		title="บทความข้อมูลการเลือกตั้ง กทม."
		subtitle="รวมบทความเน้นข้อมูลการเลือกตั้ง นำเสนอด้วย Data Visualization โดย WeVis"
		fetchPosts={fetchWeVisElectionPosts}
		viewAllText="ดูบทความทั้งหมด บน wevis.info"
		viewAllLink="https://wevis.info/tag/เลือกตั้ง-กทม/"
	/>

	<PostGrid
		title="คู่มือเลือกตั้งผู้ว่าฯ กทม."
		subtitle="เกร็ดความรู้เกี่ยวกับการเลือกตั้ง กทม.'65 จาก The STANDARD"
		fetchPosts={fetchTheStandardElectionGuides}
		viewAllText="ดูทั้งหมด บน thestandard.co"
		viewAllLink="https://thestandard.co/tag/bkk-election-101//"
	/>
</div>
