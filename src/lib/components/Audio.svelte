<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let src: string;
	export let isGuessing: boolean;
	export let guessIndex: number;

	const dispatch = createEventDispatcher<{ skip: {} }>();
	const durations = [1, 2, 4, 7, 11, 16];

	let currentTime = 0;
	let duration;

	let audio: HTMLAudioElement;

	$: secondsToPlay = durations[guessIndex];
	$: skipAmount = durations[guessIndex + 1] - durations[guessIndex];

	$: if (currentTime > secondsToPlay && isGuessing) {
		audio.pause();
		currentTime = 0;
	}

	$: progressMax = isGuessing ? durations[durations.length - 1] : duration;

	function skip() {
		dispatch('skip');
	}

	function handlePlay() {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	}
</script>

<audio bind:this={audio} bind:currentTime {src} bind:duration volume="0.5" />

<div>
	<button on:click={handlePlay}
		>{#if audio && !audio.paused}Pause{:else}Play{/if}</button
	>
	{#if isGuessing}
		<button on:click={skip}
			>Skip {#if skipAmount}(+{skipAmount} s){/if}</button
		>
	{/if}
</div>

<progress max={progressMax} value={currentTime} />
