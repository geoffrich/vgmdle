<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import songs from '$lib/songs';
	import { random, sortBy } from '$lib/util';
	import '../global.css';

	let audio: HTMLAudioElement;
	const durations = [1, 2, 4, 7, 11, 16];
	const MAX_GUESSES = 6;
	let guesses = [];
	let guess;
	let state: 'guessing' | 'lost' | 'won' = 'guessing';
	let choices = sortBy(songs, (s) => s.fullName).map((s) => s.fullName);

	// TODO: this needs to be seeded
	let answer = random(songs);
	let songDuration;

	let durationIndex = 0;
	let currentTime = 0;

	$: secondsToPlay = durations[durationIndex];
	$: progressMax = state === 'guessing' ? durations[durations.length - 1] : songDuration;

	$: if (currentTime > secondsToPlay && state === 'guessing') {
		audio.pause();
		currentTime = 0;
	}

	function handlePlay() {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	}

	function skip() {
		guesses = [...guesses, 'skipped'];
		if (guesses.length >= MAX_GUESSES) {
			state = 'lost';
		} else {
			durationIndex += 1;
		}
	}

	function handleGuess() {
		guesses = [...guesses, guess];
		if (guess === answer.fullName) {
			state = 'won';
		} else if (guesses.length >= MAX_GUESSES) {
			state = 'lost';
		} else {
			guess = undefined;
			durationIndex += 1;
		}
	}
</script>

<svelte:head>
	<title>VGMdle - the daily video game music guessing game</title>
</svelte:head>

<h1>VGMdle</h1>

<ul>
	{#each guesses as guess}
		<li>{guess}</li>
	{/each}
</ul>

{#if state === 'guessing'}
	<Select label="Guess" bind:value={guess} items={choices} />
	<button on:click={handleGuess} type="submit" disabled={guess === undefined}>Submit</button>
{/if}

<div>
	<button on:click={handlePlay}>Play/pause</button>
	{#if state === 'guessing'}
		<button on:click={skip}
			>Skip {#if durationIndex + 1 < durations.length}(+{durations[durationIndex + 1] -
					durations[durationIndex]} s){/if}</button
		>
	{/if}
</div>

{#if state === 'won'}
	<p>You won in {guesses.length} guesses!</p>
{:else if state === 'lost'}
	<p>You lost. The correct answer was {answer.fullName}</p>
{/if}

<audio
	bind:this={audio}
	bind:currentTime
	src={answer.url}
	bind:duration={songDuration}
	volume="0.5"
/>

<progress max={progressMax} value={currentTime} />
