<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import Audio from '$lib/components/Audio.svelte';
	import songs from '$lib/songs';
	import { random, sortBy } from '$lib/util';
	import '../global.css';

	const MAX_GUESSES = 6;
	let guesses = [];
	let guess;
	let state: 'guessing' | 'lost' | 'won' = 'guessing';
	let choices = sortBy(songs, (s) => s.fullName).map((s) => s.fullName);

	// TODO: this needs to be seeded
	let answer = random(songs);

	let guessIndex = 0;

	function skip() {
		guesses = [...guesses, 'skipped'];
		if (guesses.length >= MAX_GUESSES) {
			state = 'lost';
		} else {
			guessIndex += 1;
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
			guessIndex += 1;
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

<Audio src={answer.url} isGuessing={state === 'guessing'} {guessIndex} on:skip={skip} />

{#if state === 'won'}
	<p>You won in {guesses.length} guesses!</p>
{:else if state === 'lost'}
	<p>You lost. The correct answer was {answer.fullName}</p>
{/if}
