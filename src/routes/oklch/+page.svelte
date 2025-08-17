<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import SidePanel from '$lib/components/SidePanel.svelte';
	import ColorSpector from '$lib/components/ColorSpector.svelte';
	import ColorUnitActions from '$lib/components/ColorUnitActions.svelte';
	import ColorSpectorActions from '$lib/components/ColorSpectorActions.svelte';
	import { OKLCHColor } from '$lib/classes/OKLCHColor/index.svelte';
	import { setContext } from 'svelte'
	
	let globals = $state({
		enableOpacity: false,
		palette: {
			range: 10,
			length: 10
		},
		selected: {
			color: null,
			spector: null
		},
		related: {
			color: null
		}
	})

	setContext('globals', globals)

	let generatedColors = $derived.by(() => {
		const result: string[] = [];
		let hueStep = 360 / globals.palette.range;

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
					paletteLength: globals.palette.length,
					generateTints: true,
					generateSemitransparent: true
				})
		)
	);

</script>

{#if globals.selected.color}
	<ColorUnitActions />
{/if}

{#if globals.selected.spector}
	<ColorSpectorActions />
{/if}

<div class="page">
	<div class="colors-area">
		<div class="colors">
			{#each colors as color}
				<ColorSpector {color} />
			{/each}
		</div>
	</div>
	<div class="info-area">
		<SidePanel bind:colors ></SidePanel>
	</div>
</div>

<style>

	body {
		background-color: #111 !important;
	}

	.page {
		display: flex;
    	height: 100vh;
	}

	.colors-area {
		flex-grow: 1;
		background-color: #111;
    	min-width: 0; 
		padding: 8px;
	}

	.info-area {
		width: 300px;    /* Фиксированная ширина */
    	flex-shrink: 0; 
	}

	.colors {
		display: flex;
		/* flex-wrap: wrap; */
		overflow: auto;
		height: 100%;
		border-radius: 8px;
		border: 1px solid #555555;
	}
</style>
