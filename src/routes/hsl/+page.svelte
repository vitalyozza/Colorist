<script lang="ts">
	import { hexToHpluv, hexToHsluv, hsluvToHex, type ThreeNumbers } from 'hsluv-ts';
	import Values from 'values.js';

	let hue = $state(0);
	let saturation = $state(85);
	let lightness = $state(50);
	let hexa = $derived(hsluvToHex([hue, saturation, lightness]));

	let colors = $derived(new Values(hsluvToHex([hue, saturation, lightness])));

	function colorPickerUpdates() {
		hue = hexToHsluv(hexa)[0];
		saturation = hexToHsluv(hexa)[1];
		lightness = hexToHsluv(hexa)[2];
	}
</script>

<div class="flex flex-row items-center justify-center gap-8 p-4">
	<div class="flex">
		<input type="color" bind:value={hexa} oninput={colorPickerUpdates} />
		<!-- <div class="color-block" style="background-color: ;"></div> -->
	</div>
	<div class="flex flex-row items-center justify-center gap-8">
		<div>
			<label for="hue">
				H:
				<input bind:value={hue} type="range" id="hue" max="360" min="0" step="5" />
			</label>
			<span>{hue}</span>
		</div>
		<div>
			<label for="saturation">
				S:
				<input bind:value={saturation} type="range" id="saturation" max="100" min="0" step="5" />
			</label>
			<span>{saturation}</span>
		</div>
		<div>
			<label for="lightness">
				L:
				<input bind:value={lightness} type="range" id="lightness" max="100" min="0" step="5" />
			</label>
			<span>{lightness}</span>
		</div>
	</div>
</div>

<div class="grid h-dvh w-dvw grid-cols-7 gap-0">
	{#each colors.tints().reverse() as tint}
		<div class="tint" style="background-color: {tint.hexString()};">
			<span class="text-black">{tint.hexString()}</span>
		</div>
	{/each}

	<div class="base flex flex-col border-2 border-blue-50" style="background-color: {hexa};">
		<span class="text-black">{hexa}</span>
		<span class="text-black">Base</span>
	</div>

	{#each colors.shades() as shade}
		<div class="shade grow" style="background-color: {shade.hexString()};">
			<span class="text-white">{shade.hexString()}</span>
		</div>
	{/each}
</div>

<style>
	.tint,
	.base,
	.shade {
		padding: 16px;
	}
</style>
