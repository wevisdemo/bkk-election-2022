<script lang="ts">
	import { fetchTheStandardElectionPosts, fetchWeVisElectionPosts } from 'wordpress-api';
	import PostGrid from '../components/post-grid.svelte';
	import Counter from '../components/counter.svelte';
	import ProjectCard from '../components/project-card.svelte';
	import Metadata from '../components/metadata.svelte';
	import partners from 'ui/src/data/partners.json';

	// const THE_STANDARD_GUIDE_TAG = 'bkk-election-101';

	// const fetchTheStandardElectionGuides = () =>
	// 	fetchTheStandardElectionPosts({ tag: THE_STANDARD_GUIDE_TAG });

	const projects = [
		{
			th: 'ข้อมูลผู้สมัครผู้ว่าฯ + ส.ก.',
			en: 'Meet the Candidates',
			href: '/candidate',
			image: '/static/images/cover/tn_candidate.png'
		},
		{
			th: 'ข้อมูลการเลือกตั้ง กทม. ย้อนหลัง',
			en: 'Voting Map',
			image: '/static/images/cover/tn_result.png'
		},
		{
			th: 'ตรวจสอบกติกาการเลือกตั้ง',
			en: 'How to Vote?',
			href: '',
			image: '/static/images/cover/tn_howtovote.png'
		},
		{
			th: 'ศึกเลือกตั้ง กทม. บนโลกโซเชียล',
			en: 'Social Trend',
			href: '/socialtrend',
			image: '/static/images/cover/tn_sociallistening.png'
		},
		{
			th: 'ข้อมูลปัญหากวนใจชาว กทม.',
			en: 'Open Bangkok',
			href: 'https://openbangkok.wevis.info',
			external: true,
			image: '/static/images/cover/tn_openbkk.png'
		},
		{
			th: 'ร่วมออกแบบงบประมาณ กทม.',
			en: 'Bangkok Budgeting',
			href: 'https://bangkokbudgeting.wevis.info',
			external: true,
			image: '/static/images/cover/tn_bangkokbudget.png'
		}
	];
</script>

<Metadata />

<div class="bg-black text-white">
	<div
		class=" flex flex-col items-center bg-cover bg-center"
		style="background-image: url('/static/images/landing-bg.png');"
	>
		<div
			class="flex flex-col md:flex-row justify-center items-center px-5 py-12 md:py-32 w-full max-w-screen-xl space-y-8 md:space-y-0 md:space-x-16"
		>
			<div class="flex-1 flex flex-col space-y-8">
				<div class="flex flex-row space-x-8 justify-center">
					{#each partners as { name, logo, href }}
						<a {href} target="_blank">
							<img src={logo} alt={name} class="h-6 md:h-8" />
						</a>
					{/each}
				</div>
				<img src="/static/images/bkkelection-white-big.png" alt="BKK ELECTION 2022" />
				<p class="typo-b4 text-center">
					ติดตามข้อมูลเกี่ยวกับการเลือกตั้งผู้ว่าฯ และสมาชิกสภา กทม. ได้ที่นี่
				</p>
				<Counter until={new Date('2022-05-22 8:00 GMT+7')}>
					นับถอยหลังเปิดหีบเลือกตั้ง<br />วันอาทิตย์ที่ 22 พฤษภาคม พ.ศ. 2565 เวลา 08.00 - 17.00 น.
				</Counter>
			</div>
			<div class="flex-1 flex flex-col space-y-8">
				<div class="youtube-video-container">
					<iframe
						width="560"
						height="315"
						src="https://www.youtube.com/embed/dQ37Z0_bFms"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
					/>
				</div>
			</div>
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

<div class="flex flex-col max-w-screen-xl mx-auto divide-y divide-black px-5 md:py-8">
	<PostGrid
		title="ข่าวล่าสุดเกี่ยวกับการเลือกตั้ง กทม."
		subtitle="รวมข่าวสารเกี่ยวกับการเลือกตั้ง กทม. จาก The STANDARD"
		fetchPosts={fetchTheStandardElectionPosts}
		viewAllText="ดูข่าวทั้งหมด บน thestandard.co"
		viewAllLink="https://thestandard.co/tag/bkkelection2022/"
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

<style>
	.youtube-video-container {
		position: relative;
		overflow: hidden;
		width: 100%;
	}

	.youtube-video-container::after {
		display: block;
		content: '';
		padding-top: 56.25%;
	}

	.youtube-video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
