<script lang="ts">

    let uid = $props.id()
    let { color = $bindable(), selected = $bindable(null) } = $props();

    function selectColor(color) {
        selected = color
	}

    

</script>

<div class="color-column font-mono" id="column-{uid}">
    <div class="color-hue" onclick={() => selectColor(color)}>
        <div 
            class="color-hue-cover" 
            style="background-color: {color.toCssString()};">
        </div>
        <span>H{color.hue}</span>
    </div>
    <div class="color-units">
        {#each color.tints as tint}
            <div class="color-unit" style="background: {tint.toCssString()}" 
                onclick={() => selectColor(tint)}
            >
                <span class={ tint.lightness < 55 ? "text-white" : ""}>
                    l: {tint.lightness.toFixed(2)} <br>
                    c: {tint.chroma.toFixed(2)}
                </span>
            </div>
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
        width: 16px;
        height: 16px;
        border-radius: 6px;
        border: 1px solid #00000020;
    }

    .color-units {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .color-unit {
        flex: 1;
		display: flex;
		justify-content: start;
        padding: 12px;
        font-size: 10px;
		align-items: end;
		background-color: #f0f0f0;
        border: 1px solid #f0f0f020;
        cursor: pointer;
        transition: border ease-in-out 0.2s;
    }

    .color-unit:hover {
        border: 1px solid #f0f0f0;
        transition: border ease-in-out 0.2s;
    }
    
</style>