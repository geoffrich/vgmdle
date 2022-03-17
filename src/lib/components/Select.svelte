<script context="module">
	let counter = 0;
</script>

<script>
	import Select from 'svelte-select';

	export let items;
	export let label;
	export let value = undefined;

	const id = `Select-${counter++}`;

	function handleSelect(event) {
		value = event.detail.value;
	}

	function handleClear() {
		value = undefined;
	}
</script>

<div>
	<label for={id}>{label}</label>
	<Select {id} {value} {items} on:select={handleSelect} on:clear={handleClear} />
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
</style>
