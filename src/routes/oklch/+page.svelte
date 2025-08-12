<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import OKLCHColorSpector from '$lib/components/OKLCHColorSpector.svelte';
	import ColorActions from '$lib/components/ColorActions.svelte';
	import { OKLCHColor } from '$lib/classes/OKLCHColor/index.svelte';

	let hueRange = $state(2);
	let paletteLength = $state(10);
	let exportOpacity = $state(false);

	let generatedColors = $derived.by(() => {
		const result: string[] = [];
		let hueStep = 360 / hueRange;

		for (let hue = 0; hue < 360; ) {
			const oklchString = `oklch(50% 0.2 ${hue.toFixed()})`;
			result.push(oklchString);
			hue += hueStep;
		}

		return result;
	});

	let colors = $derived(
		generatedColors.map(
			(color) =>
				new OKLCHColor(color, {
					paletteLength: paletteLength,
					generateTints: true,
					generateSemitransparent: true
				})
		)
	);

	let selectedColor = $state(null);

</script>

<Header 
	bind:colors 
	bind:paletteLength
	bind:hueRange
	bind:exportOpacity
></Header>

{#if selectedColor}
	<ColorActions bind:selectedColor />
{/if}

<div class="colors">
	{#each colors as color}
		<OKLCHColorSpector {color} bind:selected={selectedColor} />
	{/each}
</div>

<style>
	.colors {
		display: flex;
		/* flex-wrap: wrap; */
		overflow-y: auto;
		width: 100%;
		height: calc(100vh - 72px);
	}
</style>
