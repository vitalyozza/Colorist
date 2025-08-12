<script lang="ts">
    let { colors = $bindable(), paletteLength = $bindable(), hueRange = $bindable(), exportOpacity = $bindable() } = $props()

    let copyCSSCode = () => {
		let prefix = `/* Collection name: Generated Palettes */`;

		let allLines = '';

		colors.forEach((color) => {
			color.tints.forEach((tint) => {
				allLines = allLines + `	` + tint.toCSSVariable('oklch', color.getSanitizeColorName()) + `\n`;
				if (exportOpacity) {
					tint.semitransparents.forEach((semi) => {
						allLines =
							allLines + `	` + semi.toCSSVariable('oklch', color.getSanitizeColorName()) + `\n`;
					});
				}
			});
		});

		console.log(`${prefix}\n:root {\n${allLines}\n}`);
	};

	let copyFigmaCode = () => {
		let prefix = `/* Collection name: Generated Palettes */`;

		let allLines = '';

		colors.forEach((color) => {
			color.tints.forEach((tint) => {
				allLines = allLines + `	` + tint.toCSSVariable('hex', color.getSanitizeColorName()) + `\n`;
				if (exportOpacity) {
					tint.semitransparents.forEach((semi) => {
						allLines =
							allLines + `	` + semi.toCSSVariable('hex', color.getSanitizeColorName()) + `\n`;
					});
				}
			});
		});

		console.log(`${prefix}\n:root {\n${allLines}\n}`);
	};

	let copyArray = () => {
		let allLines = '';

		colors.forEach((color) => {
			color.tints.forEach((tint) => {
				allLines = allLines + `	` + tint.toArrayItem('oklch', color.getSanitizeColorName()) + `\n`;
				if (exportOpacity) {
					tint.semitransparents.forEach((semi) => {
						allLines =
							allLines + `	` + semi.toArrayItem('oklch', color.getSanitizeColorName()) + `\n`;
					});
				}
			});
		});

		console.log(allLines);
	};
</script>

<div class="header-section bg-zinc-900">
	<div class="app-logo font-mono">
		Colorist <span class="text-orange-400">oklch</span>
	</div>
	<div class="slider font-mono">
		<span class="text-s ml-24 text-orange-500">Spectr</span>
		<input
			type="number"
			min="0"
			max="360"
			step="5"
			class="cursor-pointer appearance-none rounded-lg bg-orange-500 accent-orange-400 dark:bg-zinc-800"
			bind:value={hueRange}
		/>

		<span class="text-s ml-8 text-orange-500">Tints</span>
		<input
			type="number"
			min="3"
			max="100"
			step="3"
			class="cursor-pointer appearance-none rounded-lg bg-orange-500 accent-orange-400 dark:bg-zinc-800"
			bind:value={paletteLength}
		/>
	</div>
	<div>
		<button class="ml-8 cursor-pointer text-white" onclick={() => copyCSSCode()}>
			🪄 to CSS
		</button>
		<button class="ml-8 cursor-pointer text-white" onclick={() => copyFigmaCode()}>
			🪄 to Figma
		</button>
		<button class="ml-8 cursor-pointer text-white" onclick={() => copyArray()}>
			🪄 to Array
		</button>
		<label for="exportOpacity" class="ml-8">
			<input type="checkbox" name="exportOpacity" id="exportOpacity" bind:checked={exportOpacity} />
			<span class="ml-1">Opacity</span>
		</label>
	</div>
</div>

<style>
    .header-section {
		display: flex;
		justify-content: start;
		align-items: center;
		padding: 0 24px;
		width: 100%;
		height: 56px;
		color: #777;
	}

	.header-section .app-logo {
		width: auto;
		color: white;
	}

	.header-section input {
		width: auto;
		padding: 4px 8px;
		color: white;
		border: none;
	}
</style>