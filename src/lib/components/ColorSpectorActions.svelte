<script>
	import { slide } from 'svelte/transition';
	import { Copy } from '@lucide/svelte';
	import { getContext } from 'svelte';

	let globals = getContext('globals')

	let color = $derived(globals.selected.spector);
	let colorName = $derived(globals.selected.spector.getSanitizeColorName());
	let colorCSSValue = $derived(globals.selected.spector.toCSSValue());
	let colorVariableName = $derived(globals.selected.spector.getCSSVariableName());

	let copyCSSCode = () => {
		let prefix = `/* Collection name: Generated Palettes */`;

		let allLines = '';

		color.tints.forEach((tint) => {
			allLines = allLines + `	` + tint.toCSSVariable('oklch', colorName) + `\n`;
			if (globals.enableOpacity) {
				tint.semitransparents.forEach((semi) => {
					allLines = allLines + `	` + semi.toCSSVariable('oklch', colorName) + `\n`;
				});
			}
		});

		console.log(`${prefix}\n:root {\n${allLines}\n}`);
	};

	let copyFigmaCode = () => {
		let prefix = `/* Collection name: Generated Palettes */`;

		let allLines = '';

		color.tints.forEach((tint) => {
			allLines = allLines + `	` + tint.toCSSVariable('hex', colorName) + `\n`;
			if (globals.enableOpacity) {
				tint.semitransparents.forEach((semi) => {
					allLines = allLines + `	` + semi.toCSSVariable('hex', colorName) + `\n`;
				});
			}
		});

		console.log(`${prefix}\n:root {\n${allLines}\n}`);
	};

	let copyArrayCode = () => {
		let allLines = '';

		color.tints.forEach((tint) => {
			allLines = allLines + `	` + tint.toArrayItem('oklch', colorName) + `\n`;
			if (globals.enableOpacity) {
				tint.semitransparents.forEach((semi) => {
					allLines = allLines + `	` + semi.toArrayItem('oklch', colorName) + `\n`;
				});
			}
		});

		console.log(allLines);
	};
</script>

{#key globals.selected.spector}
	<div in:slide out:slide class="fixed bottom-16 left-1/2 z-50 w-100 -translate-x-1/2">
		<div class="relative space-y-4 rounded-xl bg-neutral-900/95 p-4 shadow-xl backdrop-blur-xl">
			<div class="flex items-center space-x-3">
				<div class="h-8 w-8 rounded-lg shadow-md" style:background-color={colorCSSValue}></div>
				<div class="flex-grow overflow-hidden">
					<div class="mb-1 truncate font-mono text-xs text-white">
						<b>{colorVariableName}</b>
					</div>
					<div class="truncate font-mono text-xs text-white opacity-50">
						{colorCSSValue}
					</div>
				</div>
				<button
					class="group cursor-pointer rounded-full p-2 text-white transition-colors hover:bg-neutral-700/50"
					onclick={() => console.log(globals.selected.spector.toCSSVariable())}
				>
					<Copy />
				</button>
			</div>
			<div class="border-t border-neutral-700/30 pt-2">
				<div class="mb-2 flex items-center justify-between">
					<div class="text-xs text-white opacity-70">Tints</div>
					<div>
						<button
							class="group rounded-md px-2 py-1 text-xs text-white transition-colors hover:bg-neutral-700/50"
							onclick={() => copyFigmaCode(globals.selected.spector)}
						>
							<span class="cursor-pointer opacity-70 group-hover:text-white">🪄 Figma</span>
						</button>
						<button
							class="group rounded-md px-2 py-1 text-xs text-white transition-colors hover:bg-neutral-700/50"
							onclick={() => copyCSSCode(globals.selected.spector)}
						>
							<span class="cursor-pointer opacity-70 group-hover:text-white">🪄 CSS</span>
						</button>
						<button
							class="group rounded-md px-2 py-1 text-xs text-white transition-colors hover:bg-neutral-700/50"
							onclick={() => copyArrayCode(globals.selected.spector)}
						>
							<span class="cursor-pointer opacity-70 group-hover:text-white">🪄 Array</span>
						</button>
					</div>
				</div>
				<div class="grid grid-cols-6 gap-2">
					{#each globals.selected.spector.tints as tint}
						<div
							class="h-8 w-auto rounded-lg shadow-md"
							style="background-color: {tint.toCSSValue()}"
						></div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/key}
