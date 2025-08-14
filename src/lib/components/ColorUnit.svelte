<script lang="ts">
	let {
		color,
		selectedColor = $bindable(null),
		selectedColorSpector = $bindable(),
        onSelect = $bindable(() => {})
	} = $props();
</script>

<div
	class="color-unit"
	style="background: {color.toCSSValue()}"
	onclick={onSelect}
	class:selected={color?.id == selectedColor?.id}
	class:light-border={color.lightness < 50}
	class:dark-border={color.lightness > 50}
>
	<span class:text-white={color.lightness < 55}>
		l: {color.lightness.toFixed(2)} <br />
		c: {color.chroma.toFixed(2)} <br />
	</span>
</div>

<style>
	.color-unit {
		flex: 1;
		display: flex;
		justify-content: start;
		padding: 8px;
		font-size: 10px;
		align-items: end;
		background-color: #f0f0f0;
		cursor: pointer;
		transition: all ease-out 0.2s;
	}

	.light-border {
		border: 1px solid #ffffff10;
	}

	.light-border:hover {
		border: 1px solid #ffffff50;
	}

	.dark-border {
		border: 1px solid #00000010;
	}

	.dark-border:hover {
		border: 1px solid #00000070;
	}

	.selected,
	.selected:hover {
		outline: 2px solid #ffffff;
		outline-offset: -2px;
	}
</style>
