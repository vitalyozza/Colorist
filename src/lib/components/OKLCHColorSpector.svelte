<script lang="ts">
    import { copy } from 'svelte-copy';
    import toast, {Toaster} from 'svelte-5-french-toast'

    let { color = $bindable() } = $props();

    function handleClick(message) {
		toast.success(`Copied: ${message}`)
	}

    console.log($state.snapshot(color.tints))

</script>

<div class="color-column font-mono">
    <div class="color-units">
        {#each color.tints as tint}
            <div class="color-unit" style="background: {tint.toCssString()}" 
                use:copy={tint.toCssString()}
                onclick={() => handleClick(tint.toCssString())}
            >
                <span class={ tint.lightness < 55 ? "text-white" : ""}>
                    l: {tint.lightness.toFixed(2)} <br>
                    c: {tint.chroma.toFixed(2)}
                </span>
            </div>
        {/each}
    </div>
</div>

<Toaster />

<style>
    .color-column {
        flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 100px;
    }

    .color-hue input {
        width: 100%;
        height: 32px;
        border: 1px solid #000;
        background-color: #333;
        color: white;
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