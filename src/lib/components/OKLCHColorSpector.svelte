<script lang="ts">
    import ColorUnit from "./ColorUnit.svelte";

    let { color = $bindable(), selected = $bindable(null) } = $props();

    function selectColor(color) {
        selected = color
	}

</script>

<div class="color-column font-mono">
    <div class="color-hue" title={color.getColorName()} onclick={() => selectColor(color)}>
        <div 
            class="color-hue-cover" 
            style="background-color: {color.toCSSValue()};">
        </div>
        <span>H{color.hue} </span><br><span class="truncate">{color.getColorName()}</span>
    </div>
    <div class="color-units">
        {#each color.tints as tint, index}
            <ColorUnit
                color={color.tints[index]}
                bind:selected={selected}
            ></ColorUnit>
        {/each}
    </div>
</div>

<style>

    .color-column {
        flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 100px;
        transition: filter 0.3s, opacity 0.3s;
    }

    .color-hue {
        background-color: #000;
        padding: 4px 8px;
        color: #ccc;
        gap: 6px;
        font-size: 12px;
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
    }

    .color-hue:hover {
        background-color: #111;
        cursor: pointer;
        color: white;
    }

    .color-hue-cover {
        width:8px;
        height: 8px;
        border-radius: 8px;
        border: 1px solid #00000020;
    }

    .color-units {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    
</style>