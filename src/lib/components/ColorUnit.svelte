<script lang="ts">
	let { color, selected = $bindable(null) } = $props();

    function selectColor(color) {
        selected = color
	}

</script>

<div 
    class="color-unit" 
    style="background: {color.toCSSValue()}" 
    onclick={() => selectColor(color)}
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
        transition: border ease-in-out 0.2s;
    }

    .light-border {
        border: 1px solid #FFFFFF10;
    }

    .light-border:hover {
        border: 1px solid #FFFFFF50;
    }
    
    .dark-border {
        border: 1px solid #00000010;
    }

    .dark-border:hover {
        border: 1px solid #00000050;
    }
</style>