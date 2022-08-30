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

	interface Checkpoint {
		date: Date;
		text: string;
	}

	export let checkpoints: Checkpoint[] = [];

	let refreshInterval: NodeJS.Timer;
	let timeleft: Timeleft;
	let displayText: string;

	const calculateTimeLeft = (now: Date, until: Date): Timeleft => {
		let msLeft = until.getTime() - now.getTime();

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

	const updateTimeLeftAndText = (): boolean => {
		const now = new Date();
		const checkpoint = checkpoints.find(({ date }) => now.getTime() <= date.getTime());

		if (checkpoint) {
			timeleft = calculateTimeLeft(now, checkpoint.date);
			displayText = checkpoint.text;
		} else {
			timeleft = null;
			displayText = null;
		}

		return !!checkpoint;
	};

	onMount(() => {
		if (updateTimeLeftAndText()) {
			refreshInterval = setInterval(() => {
				if (!updateTimeLeftAndText() && refreshInterval) {
					clearInterval(refreshInterval);
				}
			}, REFRESH_MS);
		}
	});

	onDestroy(() => refreshInterval && clearInterval(refreshInterval));
</script>

<div class="flex flex-col space-y-3">
	{#if displayText}
		<div class="flex flex-row space-x-3">
			<div class="line" />
			<p class="typo-u5 text-center">
				{@html displayText}
			</p>
			<div class="line" />
		</div>
	{/if}
	{#if timeleft}
		<div class="flex flex-row space-x-1 typo-h5 items-center">
			{#if timeleft.day > 0}
				<DigitBox label="วัน" value={timeleft.day} />
				<span>:</span>
			{/if}
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
