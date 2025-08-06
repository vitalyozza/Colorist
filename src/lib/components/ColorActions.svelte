<script>
	import { copy } from 'svelte-copy';

	let { selectedColor = $bindable() } = $props();

	let generateTintsCssVariables = (color) => {
		if (!color.tints && color.tints.length > 0) return '';

		let prefix = `/* Collection name: Generated Palettes */`;

		let suffix = `/* ${color.getColorName()} = ${color.toCssString()} */`;

		const variables = color.tints
			.map((tint) => {
				return `    --${color.getSanitizeColorName()}-${100-tint.lightness.toFixed()}: ${tint.toCssString()};`;
			})
			.join('\n');

		return `${prefix}\n:root {\n${variables}\n\n${suffix}\n}`;
	};

	let generateTintsFigmaCssVariables = (color) => {

		if (!color.tints && color.tints.length > 0) return '';

		let prefix = `/* Collection name: Generated Palettes */`;

		let suffix = `/* ${color.getColorName()} = ${color.toCssString()} */`;

		const variables = color.tints
			.map((tint) => {
				return `    --${color.getSanitizeColorName()}-${100-tint.lightness.toFixed()}: ${tint.toCssString('hex')};`;
			})
			.join('\n');

		return `${prefix}\n:root {\n${variables}\n\n${suffix}\n}`;
	};

	let tintsCssVariables = $derived(
		selectedColor.tints ? generateTintsCssVariables(selectedColor) : ''
	);

	let tintsFigmaCssVariables = $derived(
		selectedColor.tints ? generateTintsFigmaCssVariables(selectedColor) : ''
	);
</script>

<div class="fixed bottom-16 left-1/2 z-50 w-100 -translate-x-1/2">
	<div class="relative space-y-4 rounded-xl bg-neutral-900/95 p-4 shadow-xl backdrop-blur-xl">
		<div class="flex items-center space-x-3">
			<div
				class="h-8 w-8 rounded-lg shadow-md"
				style="background-color: {selectedColor.toCssString()}"
			></div>
			<div class="flex-grow overflow-hidden">
				<div class="truncate font-mono text-xs text-white">
					{selectedColor.toCssString()}
				</div>
			</div>
			<button
				class="group cursor-pointer rounded-full p-2 text-white transition-colors hover:bg-neutral-700/50"
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
				<div class="mb-2 flex items-center justify-between">
					<div class="text-xs text-white opacity-70">Tints</div>
					<div>
						<button
							class="group rounded-md px-2 py-1 text-xs text-white transition-colors hover:bg-neutral-700/50"
							use:copy={tintsFigmaCssVariables}
						>
							<span class="cursor-pointer opacity-70 group-hover:text-white">Copy to Figma</span>
						</button>
						<button
							class="group rounded-md px-2 py-1 text-xs text-white transition-colors hover:bg-neutral-700/50"
							use:copy={tintsCssVariables}
						>
							<span class="cursor-pointer opacity-70 group-hover:text-white">Copy CSS</span>
						</button>
					</div>
				</div>
				<div class="grid grid-cols-6 gap-2">
					{#each selectedColor.tints as tint}
						<div
							class="h-8 w-auto rounded-lg shadow-md"
							style="background-color: {tint.toCssString()}"
							title={tint.toCssString()}
						></div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>