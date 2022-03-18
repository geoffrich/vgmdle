<script context="module">
	let counter = 0;
</script>

<script lang="ts">
	import Select from 'svelte-select';

	export let items: string[];
	export let label;
	export let value = undefined;

	const id = `Select-${counter++}`;

	function handleSelect(event) {
		value = event.detail.value;
	}

	function handleClear() {
		value = undefined;
	}

	function getOptionLabel(option: { label: string }, filterText: string) {
		const { label } = option;
		const index = label.toLowerCase().indexOf(filterText.toLowerCase());
		return `${label.slice(0, index)}<mark>${label.slice(
			index,
			index + filterText.length
		)}</mark>${label.slice(index + filterText.length)}`;
	}

	let filterText = '';
	let selectItems = [];
	let hideEmptyState = false;
	// we do our own filtering, so have the list do as little work as possible
	let itemFilter = () => true;

	// don't show options until the user starts typing
	$: if (filterText === '') {
		selectItems = [];
		hideEmptyState = true;
	} else {
		// do our own filtering so we can control the max items
		selectItems = items
			.filter((i) => i.toLowerCase().includes(filterText.toLowerCase()))
			.slice(0, 5);
		hideEmptyState = false;
	}
</script>

<div>
	<label for={id}>{label}</label>
	<Select
		{hideEmptyState}
		bind:filterText
		{id}
		{value}
		items={selectItems}
		{itemFilter}
		{getOptionLabel}
		on:select={handleSelect}
		on:clear={handleClear}
	/>
</div>

<style>
	div {
		max-width: 30rem;
		color: var(--text-1);
		--inputColor: var(--text-1);
		--inputFontSize: var(--size-3);

		--background: var(--surface-2);
		--listBackground: var(--surface-2);

		--itemHoverBG: var(--surface-3);
	}

	div :global(mark) {
		background: var(--text-1);
		color: var(--background);
		border-radius: var(--radius-1);
		padding: 0;
		margin: 0;
	}
</style>
