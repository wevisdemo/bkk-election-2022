<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import DigitBox from './digit-box.svelte';

	const MS_SEC = 1000;
	const SEC_MIN = 60;
	const MIN_HOUR = 60;
	const HOUR_DAY = 24;
	const REFRESH_MS = 1000;

	interface Timeleft {
		day: number;
		hour: number;
		minute: number;
		second: number;
	}

	export let until: Date;

	let refreshInterval: number;
	let timeleft: Timeleft;

	const calculateTimeLeft = (until: Date): Timeleft => {
		let msLeft = until.getTime() - new Date().getTime();

		const dayLeft = msLeft / MS_SEC / SEC_MIN / MIN_HOUR / HOUR_DAY;
		const day = Math.floor(dayLeft);

		msLeft = (dayLeft - day) * MS_SEC * SEC_MIN * MIN_HOUR * HOUR_DAY;

		const hourLeft = msLeft / MS_SEC / SEC_MIN / MIN_HOUR;
		const hour = Math.floor(hourLeft);

		msLeft = (hourLeft - hour) * MS_SEC * SEC_MIN * MIN_HOUR;

		const minuteLeft = msLeft / MS_SEC / SEC_MIN;
		const minute = Math.floor(minuteLeft);

		msLeft = (minuteLeft - minute) * MS_SEC * SEC_MIN;

		const second = Math.floor(msLeft / MS_SEC);

		return {
			day,
			hour,
			minute,
			second
		};
	};

	onMount(() => {
		timeleft = calculateTimeLeft(until);

		refreshInterval = setInterval(() => {
			timeleft = calculateTimeLeft(until);
		}, REFRESH_MS);
	});

	onDestroy(() => clearInterval(refreshInterval));
</script>

<div class="flex flex-col space-y-3">
	<div class="flex flex-row space-x-3">
		<div class="line" />
		<p class="typo-u5 text-center">
			<slot />
		</p>
		<div class="line" />
	</div>
	{#if timeleft}
		<div class="flex flex-row space-x-1 typo-h5 items-center">
			<DigitBox label="วัน" value={timeleft.day} />
			<span>:</span>
			<DigitBox label="ชั่วโมง" value={timeleft.hour} />
			<span>:</span>
			<DigitBox label="นาที" value={timeleft.minute} />
			<span>:</span>
			<DigitBox label="วินาที" value={timeleft.second} />
		</div>
	{/if}
</div>

<style>
	span {
		@apply mb-6;
	}

	.line {
		@apply flex-1 bg-white h-[1px] my-auto;
	}
</style>
