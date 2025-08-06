<script lang="ts">
	import type { PageProps } from './$types';
	import OKLCHColorSpector from '$lib/components/OKLCHColorSpector.svelte';
	import ColorActions from '$lib/components/ColorActions.svelte';
	import { OKLCHColor } from '$lib/classes/OKLCHColor/index.svelte';
	import { copy } from 'svelte-copy';

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

	// Quick Bulk Export Variables
	let exportAllCSSVariables = (format: string = "oklch") => {

		let prefix = `/* Collection name: Generated Palettes */`;

		let allVariables = ""

		colors.forEach((color) => {
			const variables = color.tints
				.map((tint) => {
					return `    --${color.getSanitizeColorName()}-${100-tint.lightness.toFixed()}: ${tint.toCssString(format)};`;
				})
				.join('\n');
			allVariables = allVariables + '\n' + variables;
		})

		return `${prefix}\n:root {\n${allVariables}\n}`;
	}

	let exportedAllCSSVariables = $derived(
		exportAllCSSVariables()
	);

	let exportedAllFigmaVariables = $derived(
		exportAllCSSVariables("hex")
	);

	// Quick Bulk Export to values to use in array
	let exportAllIntoArray = (format: string = "oklch") => {

		let allValues = ""

		colors.forEach((color) => {
			const variables = color.tints
				.map((tint) => {
					return `'${tint.toCssString(format)}',	/* ${color.getSanitizeColorName()}-${100-tint.lightness.toFixed()} */`;
				})
				.join('\n');
			allValues = allValues + '\n' + variables;
		})

		return allValues;
	}

	let exportedAllIntoArray = $derived(
		exportAllIntoArray("oklch")
	);



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
	<div>
		<button
			class="text-white ml-8 cursor-pointer" 
			use:copy={exportedAllCSSVariables}
		>
			🪄 to CSS
		</button>
		<button 
			class="text-white ml-8 cursor-pointer" 
			use:copy={exportedAllFigmaVariables}
		>
			🪄 to Figma
		</button>
		<button 
			class="text-white ml-8 cursor-pointer" 
			use:copy={exportedAllIntoArray}
		>
			🪄 to Array
		</button>
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
