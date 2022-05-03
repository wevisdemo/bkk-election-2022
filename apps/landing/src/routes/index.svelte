<script lang="ts">
	import { fetchTheStandardElectionPosts, fetchWeVisElectionPosts } from 'wordpress-api';
	import PostGrid from '../components/post-grid.svelte';
	import Counter from '../components/counter.svelte';
	import ProjectCard from '../components/project-card.svelte';
	import Metadata from '../components/metadata.svelte';
	import PartnersLogo from '../components/partners-logo.svelte';
	import YoutubeVideo from '../components/youtube-video.svelte';

	// const THE_STANDARD_GUIDE_TAG = 'bkk-election-101';

	// const fetchTheStandardElectionGuides = () =>
	// 	fetchTheStandardElectionPosts({ tag: THE_STANDARD_GUIDE_TAG });

	const projects = [
		{
			th: 'ข้อมูลผู้สมัครผู้ว่าฯ + ส.ก.',
			en: 'Meet the Candidates',
			href: '/candidate',
			image: '/static/images/cover/tn_candidate.webp'
		},
		{
			th: 'ข้อมูลการเลือกตั้ง กทม. ย้อนหลัง',
			en: 'Voting Map',
			image: '/static/images/cover/tn_result.webp'
		},
		{
			th: 'ตรวจสอบกติกาการเลือกตั้ง',
			en: 'How to Vote?',
			href: '',
			image: '/static/images/cover/tn_howtovote.webp'
		},
		{
			th: 'ศึกเลือกตั้ง กทม. บนโลกโซเชียล',
			en: 'Social Trend',
			href: '/socialtrend',
			image: '/static/images/cover/tn_sociallistening.webp'
		},
		{
			th: 'ข้อมูลปัญหากวนใจชาว กทม.',
			en: 'BKK Followup',
			href: 'https://bkkfollowup.wevis.info/',
			external: true,
			image: '/static/images/cover/tn_openbkk.webp'
		},
		{
			th: 'ร่วมออกแบบงบประมาณ กทม.',
			en: 'Bangkok Budgeting',
			href: 'https://bangkokbudgeting.wevis.info',
			external: true,
			image: '/static/images/cover/tn_bangkokbudget.webp'
		}
	];
</script>

<Metadata />

<div class="bg-black text-white">
	<div
		class=" flex flex-col items-center bg-cover bg-center"
		style="background-image: url('/static/images/landing-bg.webp');"
	>
		<div
			class="flex flex-col md:flex-row justify-center items-center px-5 py-12 md:py-32 w-full max-w-screen-xl space-y-8 md:space-y-0 md:space-x-16"
		>
			<div class="flex-1 flex flex-col space-y-8">
				<PartnersLogo />
				<img src="/static/images/bkkelection-white-big.svg" alt="BKK ELECTION 2022" />
				<p class="typo-b4 text-center">
					ติดตามข้อมูลเกี่ยวกับการเลือกตั้งผู้ว่าฯ <br class="md:hidden" />และสมาชิกสภา กทม.
					ได้ที่นี่
				</p>
				<Counter until={new Date('2022/05/22 8:00 GMT+7')}>
					นับถอยหลังเปิดหีบเลือกตั้ง<br />วันอาทิตย์ที่ 22 พฤษภาคม พ.ศ. 2565 เวลา 08.00 - 17.00 น.
				</Counter>
			</div>
			<div class="-md:hidden flex-1">
				<YoutubeVideo videoId="KqaFyTtv3PU" />
			</div>
			<YoutubeVideo class="md:hidden" videoId="KqaFyTtv3PU" />
		</div>
	</div>
	<div class="-mt-12 h-12 to-black from-transparent bg-gradient-to-b " />

	<div class="flex flex-col items-center">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-screen-2xl p-5 gap-5">
			{#each projects as project}
				<ProjectCard {...project} />
			{/each}
		</div>
	</div>
</div>

<div class="flex flex-col max-w-screen-xl mx-auto divide-y divide-black px-5">
	<PostGrid
		title="ข่าวล่าสุดเกี่ยวกับการเลือกตั้ง กทม."
		subtitle="รวมข่าวสารเกี่ยวกับการเลือกตั้ง กทม. จาก THE STANDARD"
		fetchPosts={fetchTheStandardElectionPosts}
		viewAllText="ดูข่าวทั้งหมด บน thestandard.co"
		viewAllLink="https://thestandard.co/bkkelection2022/"
	/>

	<PostGrid
		title="ชุดข้อมูลเกี่ยวกับการเลือกตั้ง กทม."
		subtitle="รวมบทความเล่าข้อมูลน่าสนใจเกี่ยวกับการเลือกตั้ง โดย WeVis"
		fetchPosts={fetchWeVisElectionPosts}
		viewAllText="ดูบทความทั้งหมด บน wevis.info"
		viewAllLink="https://wevis.info/tag/เลือกตั้ง-กทม/"
	/>

	<!-- <PostGrid
		title="คู่มือเลือกตั้งผู้ว่าฯ กทม."
		subtitle="เกร็ดความรู้เกี่ยวกับการเลือกตั้ง กทม.'65 จาก The STANDARD"
		fetchPosts={fetchTheStandardElectionGuides}
		viewAllText="ดูทั้งหมด บน thestandard.co"
		viewAllLink="https://thestandard.co/tag/bkk-election-101//"
	/> -->
</div>
