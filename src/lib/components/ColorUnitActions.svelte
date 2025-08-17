<script>
	import { slide } from 'svelte/transition';
    import { Copy } from '@lucide/svelte';
	import { getContext } from 'svelte';

	let globals = getContext('globals')

    let colorCSSValue = $derived(globals.selected.color.toCSSValue())
    let colorCSSVariableName = $derived(globals.selected.color.getCSSVariableName(globals.related.color.getSanitizeColorName()))
</script>

{#key globals.selected.color}
	<div in:slide out:slide class="fixed bottom-16 left-1/2 z-50 w-100 -translate-x-1/2">
		<div class="relative space-y-4 rounded-xl bg-neutral-900/95 p-4 shadow-xl backdrop-blur-xl">
			<div class="flex items-center space-x-3">
				<div
					class="h-8 w-8 rounded-lg shadow-md"
                    style:background-color={colorCSSValue}
				></div>
				<div class="flex-grow overflow-hidden">
					<div class="mb-1 truncate font-mono text-xs text-white">
						<b>{colorCSSVariableName}</b>
					</div>
					<div class="truncate font-mono text-xs text-white opacity-50">
						{colorCSSValue}
					</div>
				</div>
				<button
					class="group cursor-pointer rounded-full p-2 text-white transition-colors hover:bg-neutral-700/50"
					onclick={() => console.log(globals.selected.color.toCSSVariable("oklch", globals.related.color.getSanitizeColorName()))}
				>
					<Copy/>
				</button>
			</div>
		</div>
	</div>
{/key}
