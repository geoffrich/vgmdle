<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let src: string;
	export let isGuessing: boolean;
	export let guessIndex: number;

	const dispatch = createEventDispatcher<{ skip: {} }>();
	const durations = [1, 2, 4, 7, 11, 16];

	let currentTime = 0;
	let duration: number;
	let state: 'loading' | 'loaded' | 'error' = 'loading';

	let audio: HTMLAudioElement;

	$: secondsToPlay = durations[guessIndex];
	$: skipAmount = durations[guessIndex + 1] - durations[guessIndex];

	$: if (currentTime > secondsToPlay && isGuessing) {
		audio.pause();
		currentTime = 0;
	}

	$: progressMax = isGuessing ? durations[durations.length - 1] : duration;

	function handlePlay() {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	}

	function detectState(node: HTMLAudioElement) {
		const setLoaded = () => {
			state = 'loaded';
		};
		const setError = () => {
			state = 'error';
		};

		if (node.duration) setLoaded();
		else if (node.error) setError();

		const listeners: [keyof HTMLMediaElementEventMap, () => void][] = [
			['canplay', setLoaded],
			['loadedmetadata', setLoaded], // for Safari
			['error', setError]
		];

		listeners.forEach(([eventName, handler]) => {
			node.addEventListener(eventName, handler);
		});

		return {
			destroy: () => {
				listeners.forEach(([eventName, handler]) => {
					node.removeEventListener(eventName, handler);
				});
			}
		};
	}
</script>

<audio bind:this={audio} use:detectState bind:currentTime {src} bind:duration volume="0.5" />

{#if state === 'loaded'}
	<div>
		<button on:click={handlePlay}
			>{#if audio && !audio.paused}Pause{:else}Play{/if}</button
		>
		{#if isGuessing}
			<button on:click={() => dispatch('skip')}
				>Skip {#if skipAmount}(+{skipAmount} s){/if}</button
			>
		{/if}
	</div>

	<progress max={progressMax} value={currentTime} />
{:else if state === 'loading'}
	<p>Loading audio...</p>
{:else if state === 'error'}
	<p>Unable to load audio.</p>
{/if}
