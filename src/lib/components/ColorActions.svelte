<script>
    import { copy } from 'svelte-copy';

    let { selectedColor = $bindable() } = $props()

    let generateTintsCssVariables = (color) => {
        if (!color.tints && color.tints.length > 0) return '';
        
        const variables = color.tints.map((tint) => {
            return `    --color-L${tint.lightness.toFixed()}: ${tint.toCssString()};`;
        }).join('\n');

        return `.color {\n${variables}\n}`;
    }

    let tintsCssVariables = $derived(selectedColor.tints 
        ? generateTintsCssVariables(selectedColor) 
        : '');
</script>

<div class="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 w-100">
    <div class="bg-neutral-900/95 backdrop-blur-xl rounded-xl shadow-xl p-4 space-y-4 relative">

        <div class="flex items-center space-x-3">
            <div 
                class="w-8 h-8 rounded-lg shadow-md" 
                style="background-color: {selectedColor.toCssString()}"
            ></div>
            <div class="flex-grow overflow-hidden">
                <div class="text-white font-mono text-xs truncate">
                    {selectedColor.toCssString()}
                </div>
            </div>
            <button 
                class="text-white hover:bg-neutral-700/50 p-2 rounded-full transition-colors group cursor-pointer" 
                use:copy={selectedColor.toCssString()}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-5 w-5 group-hover:text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        stroke-width="2" 
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
                    />
                </svg>
            </button>
        </div>

        {#if selectedColor.tints && selectedColor.tints.length > 0}
            <div class="border-t border-neutral-700/30 pt-2">
                <div class="flex items-center justify-between mb-2">
                    <div class="text-white text-xs opacity-70">Tints</div>
                    <button 
                        class="text-white text-xs hover:bg-neutral-700/50 px-2 py-1 rounded-md transition-colors group" 
                        use:copy={tintsCssVariables}
                    >
                        <span class="group-hover:text-white opacity-70 cursor-pointer">Copy CSS</span>
                    </button>
                </div>
                <div class="grid grid-cols-6 gap-2">
                    {#each selectedColor.tints as tint}
                        <div 
                            class="w-auto h-8 rounded-lg shadow-md" 
                            style="background-color: {tint.toCssString()}"
                            title={tint.toCssString()}
                        ></div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>

