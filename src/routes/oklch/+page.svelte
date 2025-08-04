<script lang="ts">
	import type { PageProps } from './$types';
	import OKLCHColorSpector from '$lib/components/OKLCHColorSpector.svelte';
	import { OKLCHColor } from '$lib/classes/OKLCHColor/index.svelte';

	let { data }: PageProps = $props();

	let hueStep = $state(20);
	let paletteLength = $state(10);

	let generatedColors = $derived.by(()=>{
		const result: string[] = [];

		for (let hue = 0; hue <= 359; hue += hueStep) {
			const oklchString = `oklch(50% 0.2 ${hue})`;
			result.push(oklchString);
		}

		return result;
	})

	let colors = $derived(
		generatedColors.map(color => new OKLCHColor(color, paletteLength, true, true))
	);

</script>

<div class="header-section bg-zinc-900">
	<div class="app-logo font-mono">
		Colorist <span class="text-orange-400">oklch</span>
	</div>
	<div class="slider font-mono">
		<input type="range" 
		min="10" max="70"
		class="accent-orange-400 bg-orange-500 rounded-lg appearance-none cursor-pointer dark:bg-zinc-800" 
		bind:value={hueStep}>
		<span class="ml-2 text-orange-500">{hueStep}</span>

		<input type="range" 
		min="5" max="30"
		class="ml-24 accent-orange-400 bg-orange-500 rounded-lg appearance-none cursor-pointer dark:bg-zinc-800" 
		bind:value={paletteLength}>
		<span class="ml-2 text-orange-500">{paletteLength}</span>
	</div>
</div>

<div class="colors">
	{#each colors as color}
		<OKLCHColorSpector {color} />
	{/each}
</div>

<style>

	.header-section {
		display: flex;
		justify-content: space-between;
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

	.header-section .slider {
		width: auto;
		color: white;
	}

	.colors {
		display: flex;
		/* flex-wrap: wrap; */
		overflow-y: auto;
		width: 100%;
		height: calc(100vh - 72px);
	}

</style>
