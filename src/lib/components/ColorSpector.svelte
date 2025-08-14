<script lang="ts">
	import ColorUnit from './ColorUnit.svelte';

	let {
		color = $bindable(),
		selectedColor = $bindable(),
		selectedColorSpector = $bindable(null),
		relatedColorSpector = $bindable()
	} = $props();

	let colorName = $derived(color.getColorName());

	function selectColorSpector(color) {
		selectedColorSpector = color;
		selectedColor = null;
	}

	function selectColor(color, tint) {
		selectedColor = tint
		selectedColorSpector = null
		relatedColorSpector = color;
	}
</script>

<div class="color-spector font-mono" class:selected={color?.id == selectedColorSpector?.id}>
	<div class="details" title={colorName} onclick={() => selectColorSpector(color)}>
		<div class="cover" style:background-color={color.toCSSValue()}></div>
		<span>H{color.hue} </span><br />
		<span class="truncate">{colorName}</span>
	</div>
	<div class="units">
		{#each color.tints as tint, index}
				<ColorUnit
					onSelect={() => selectColor(color, tint)}
					color={color.tints[index]}
					bind:selectedColor
					bind:selectedColorSpector
					bind:relatedColorSpector
				></ColorUnit>
		{/each}
	</div>
</div>

<style>
	.color-spector {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 100px;
		transition: all ease-in 0.2s;
	}

	.color-spector .details {
		background-color: #000;
		padding: 4px 8px;
		color: #ccc;
		gap: 4px;
		font-size: 12px;
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
	}

	.color-spector .details:hover {
		background-color: #111;
		cursor: pointer;
		color: white;
	}

	.color-spector .cover {
		flex-shrink: 0;
		width: 8px;
		height: 8px;
		border-radius: 8px;
		border: 1px solid #00000020;
	}

	.color-spector .units {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.selected,
	.selected:hover {
		outline: 2px solid white;
		outline-offset: -2px;
		border-radius: 5px;
	}

	.selected:last-child {
		border-radius: 0px 8px 8px 0px;
	}

	.selected:first-child {
		border-radius: 8px 0px 0px 8px;
	}

	.selected .details {
		color: white;
	}
</style>
