<script lang="ts">
	import type { PageProps } from './$types';
	import OKLCHColorSpector from '$lib/components/OKLCHColorSpector.svelte';
	import ColorActions from '$lib/components/ColorActions.svelte';
	import { OKLCHColor } from '$lib/classes/OKLCHColor/index.svelte';

	let { data }: PageProps = $props();

	let hueRange = $state(20);
	let paletteLength = $state(10);

	let generatedColors = $derived.by(() => {
		const result: string[] = [];
		let hueStep = 360 / hueRange

		for (let hue = 0; hue < 360;) {
			const oklchString = `oklch(50% 0.2 ${hue.toFixed()})`;
			result.push(oklchString);
			$inspect(hue, hueStep)
			hue += hueStep
		}

		return result;
	});

	let colors = $derived(
		generatedColors.map((color) => new OKLCHColor(color, paletteLength, true, true))
	);

	let selectedColor = $state(null);

</script>

{#if selectedColor}
	<ColorActions {selectedColor} />
{/if}

<div class="header-section bg-zinc-900">
	<div class="app-logo font-mono">
		Colorist <span class="text-orange-400">oklch</span>
	</div>
	<div class="slider font-mono">
		<span class="ml-24 text-s text-orange-500">Spectr</span>
		<input
			type="number"
			min="0"
			max="360"
			step="5"
			class="cursor-pointer appearance-none rounded-lg bg-orange-500 accent-orange-400 dark:bg-zinc-800"
			bind:value={hueRange}
		/>

		<span class="ml-8 text-s text-orange-500">Tints</span>
		<input
			type="number"
			min="3"
			max="100"
			step="3"
			class="cursor-pointer appearance-none rounded-lg bg-orange-500 accent-orange-400 dark:bg-zinc-800"
			bind:value={paletteLength}
		/>
	</div>
</div>

<div class="colors">
	{#each colors as color}
		<OKLCHColorSpector {color} bind:selected={selectedColor} />
	{/each}
</div>

<style>

	.header-section {
		display: flex;
		justify-content: start;
		align-items: center;
		padding: 0 24px;
		width: 100%;
		height: 56px;
		color: #777;
	}

	.header-section .app-logo {
		width: auto;
		color: white;
	}

	.header-section input {
		width: auto;
		padding: 4px 8px;
		color: white;
		border: none;
	}

	.colors {
		display: flex;
		/* flex-wrap: wrap; */
		overflow-y: auto;
		width: 100%;
		height: calc(100vh - 72px);
	}
</style>
