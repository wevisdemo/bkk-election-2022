<script lang="ts">
	import { fetchTheStandardElectionPosts, fetchWeVisElectionPosts } from 'wordpress-api';
	import PostGrid from '../components/post-grid.svelte';
	import Counter from '../components/counter.svelte';
	import ProjectCard from '../components/project-card.svelte';
	import Metadata from '../components/metadata.svelte';
	import PartnersLogo from '../components/partners-logo.svelte';
	import { onMount } from 'svelte';

	const THE_STANDARD_GUIDE_TAG = 'bkk-election-101';
	const HERO_VIDEO_ID = 'AFDIEkVIJsw';

	const fetchTheStandardElectionGuides = () =>
		fetchTheStandardElectionPosts({ tag: THE_STANDARD_GUIDE_TAG });

	onMount(() => import('@justinribeiro/lite-youtube'));

	const projects = [
		{
			th: 'ข้อมูล ประวัติ ผู้สมัคร ผู้ว่าฯ กทม. และ ส.ก.',
			en: 'Meet the Candidates',
			href: '/candidate',
			image: '/static/images/cover/tn_candidate.webp'
		},
		{
			th: 'เตรียมติดตามผลเลือกตั้งผู้ว่าฯ กทม. ได้ที่นี่',
			en: 'BKK Election Result',
			href: '/map',
			image: '/static/images/cover/tn_result.webp'
		},
		{
			th: 'กติกาการเลือกตั้งผู้ว่าฯ กทม. บัตร 2 ใบ กาอย่างไร',
			en: 'How to vote?',
			href: 'https://thestandard.co/bkk-election-2022-handbook/',
			external: true,
			image: '/static/images/cover/tn_howtovote.webp'
		},
		{
			th: 'เลือกตั้งผู้ว่าฯ กทม. บนโลกออนไลน์',
			en: 'Social Listening',
			href: '/socialtrend',
			image: '/static/images/cover/tn_sociallistening.webp'
		},
		{
			th: 'ปัญหาสะสมของคน กทม.',
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
		},
		{
			th: 'ตรวจสอบสิทธิและสถานที่เลือกตั้ง',
			en: 'Where to Vote',
			href: 'https://stat.bora.dopa.go.th/Election/enqelectloc',
			external: true,
			image: '/static/images/cover/tn_check.webp'
		},
		{
			th: 'ร่วมรายงานการนับคะแนน',
			en: 'Monitor Our Votes',
			href: 'https://vote62.com',
			external: true,
			image: '/static/images/cover/tn_vote62.webp'
		},
		{
			th: '(ไม่ใช่) คน กทม. ขอเลือกด้วย',
			en: 'We Vote BKK',
			href: 'https://wevotebkk.wevis.info',
			external: true,
			image: '/static/images/cover/tn_wevote.webp'
		}
	];

	const checkpoints = [
		{
			date: new Date('2022/05/22 8:00 GMT+7'),
			text: 'นับถอยหลังเปิดหีบเลือกตั้ง<br />วันอาทิตย์ที่ 22 พฤษภาคม พ.ศ. 2565 เวลา 08.00 - 17.00 น.'
		},
		{
			date: new Date('2022/05/22 17:00 GMT+7'),
			text: 'นับถอยหลังปิดหีบเลือกตั้ง เวลา 17:00 น.'
		}
	];
</script>

<Metadata title="Bangkok Election 2022 : เกาะติด 'เลือกตั้งผู้ว่าฯ กทม. 2565" />

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
				<h1 class="mx-auto">
					<img
						src="/static/images/bkkelection-white-big.svg"
						alt="เลือกตั้งผู้ว่าฯ กทม. 2565 - Bangkok Election 2022"
					/>
				</h1>
				<p class="typo-b4 text-center">
					ติดตามข้อมูลเกี่ยวกับการเลือกตั้งผู้ว่าฯ <br class="md:hidden" />และสมาชิกสภา กทม.
					ได้ที่นี่
				</p>
				<Counter {checkpoints} />
				<!-- <h2 class="typo-h2 text-center">ติดตามผลการนับคะแนน<br />ผู้ว่าฯ กทม. สด ได้ที่นี่</h2>
				<a
					href="/map"
					class="typo-h6 flex flex-row live-button mx-auto p-4 items-center space-x-4 shadow-sm hover:brightness-125"
					style="background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 100%), #b90202;"
				>
					<div class="bg-white text-[#D02525] px-2 py-1 font-bold typo-u5">LIVE</div>
					<div class="pr-4">ดูผลการนับคะแนน</div>
					<svg
						width="17"
						height="18"
						viewBox="0 0 17 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M8 1L15.5789 9L8 17" stroke="white" stroke-width="2" />
						<path d="M0 9L16 9" stroke="white" stroke-width="2" />
					</svg>
				</a> -->
			</div>
			<div class="-md:hidden flex-1">
				<lite-youtube videoid={HERO_VIDEO_ID} />
			</div>
			<lite-youtube class="md:hidden" videoid={HERO_VIDEO_ID} />
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

	<PostGrid
		title="คู่มือเลือกตั้งผู้ว่าฯ กทม."
		subtitle="เกร็ดความรู้เกี่ยวกับการเลือกตั้ง กทม.'65 จาก The STANDARD"
		fetchPosts={fetchTheStandardElectionGuides}
		viewAllText="ดูทั้งหมด บน thestandard.co"
		viewAllLink="https://thestandard.co/tag/bkk-election-101/"
	/>
</div>
