<script lang="ts">
    import Header from "./Header.svelte";
	let { colors = $bindable(), globals = $bindable() } = $props();

    let copyCSSCode = () => {
		let prefix = `/* Collection name: Generated Palettes */`;

		let allLines = '';

		colors.forEach((color) => {
			const colorName = color.getSanitizeColorName();

			color.tints.forEach((tint) => {
				allLines = allLines + `	` + tint.toCSSVariable('oklch', colorName) + `\n`;
				if (globals.enableOpacity) {
					tint.semitransparents.forEach((semi) => {
						allLines = allLines + `	` + semi.toCSSVariable('oklch', colorName) + `\n`;
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
			const colorName = color.getSanitizeColorName();

			color.tints.forEach((tint) => {
				allLines = allLines + `	` + tint.toCSSVariable('hex', colorName) + `\n`;
				if (globals.enableOpacity) {
					tint.semitransparents.forEach((semi) => {
						allLines = allLines + `	` + semi.toCSSVariable('hex', colorName) + `\n`;
					});
				}
			});
		});

		console.log(`${prefix}\n:root {\n${allLines}\n}`);
	};

	let copyArray = () => {
		let allLines = '';

		colors.forEach((color) => {
			const colorName = color.getSanitizeColorName();

			color.tints.forEach((tint) => {
				allLines = allLines + `	` + tint.toArrayItem('oklch', colorName) + `\n`;
				if (globals.enableOpacity) {
					tint.semitransparents.forEach((semi) => {
						allLines = allLines + `	` + semi.toArrayItem('oklch', colorName) + `\n`;
					});
				}
			});
		});

		console.log(allLines);
	};
</script>

<div class="side-panel font-mono">
    <Header></Header>
    <div class="section-divider">
        <span class="label">Spector Settings</span>
        <p>You can configure the color palette by setting the total number of base colors and specifying the number of tints for each color.</p>
    </div>
	<div class="row">
        <div class="range">
		<label for="range">
			<div>Range</div>
			<input
				type="number"
				min="0"
				max="360"
				step="5"
				class="cursor-pointer appearance-none rounded-lg bg-orange-500 accent-orange-400 dark:bg-zinc-800"
				bind:value={globals.palette.range}
			/>
		</label>
	</div>

	<div class="lenght">
		<label for="lenght">
            <div>Length</div>
			<input
				type="number"
				min="3"
				max="100"
				step="3"
				class="cursor-pointer appearance-none rounded-lg bg-orange-500 accent-orange-400 dark:bg-zinc-800"
				bind:value={globals.palette.length}
			/>
		</label>
	</div>
    </div>
    <div class="section-divider">
        <span class="label">Opacity Generation</span>
        <p>This will add additional layers of opacity to each tint</p>
    </div>
	<div class="opacity">
		<label for="opacity">
			<input
				type="checkbox"
				name="exportOpacity"
				id="exportOpacity"
				bind:checked={globals.enableOpacity}
			/>
			<div class="ml-1">Enable</div>
		</label>
	</div>
    <div class="section-divider">
        <span class="label">Export</span>
    </div>
	<div class="export">
			<button class="cursor-pointer text-white" onclick={() => copyCSSCode()}>
				CSS
			</button>
			<button class="cursor-pointer text-white" onclick={() => copyFigmaCode()}>
				Figma
			</button>
			<button class="cursor-pointer text-white" onclick={() => copyArray()}>
				Array
			</button>
	</div>
</div>

<style>
	.side-panel {
        display: flex;
		flex-direction: column;
        background-color: #111;
		width: 100%;
        height: 100%;
	}

    .side-panel .row {
        display: flex;
        flex-direction: row;
        justify-content: start;
        justify-items: start;
    }

	.side-panel input {
		height: 24px;
		width: auto;
		padding: 16px 8px;
		color: white;
		border: none;
	}

	.side-panel .range,.lenght,.opacity {
		display: flex;
		justify-content: start;
		justify-items: center;
		gap: 8px;
		padding: 16px;
		color: white;
	}

	.side-panel .opacity {
		display: flex;
		justify-content: start;
		justify-items: center;
		gap: 8px;
        padding: 16px;
		color: white;
	}

    .side-panel .lenght label,
    .side-panel .range label {
		display: flex;
        flex-direction: column;
		gap: 8px;
	}

    .side-panel .opacity label {
        display: flex;
        justify-content: center;
        justify-items: center;
        gap: 8px;
    }

	.side-panel .export {
        display: flex;
		justify-content: start;
		justify-items: center;
        flex-direction: row;
		gap: 8px;
        padding: 16px;
		color: white;
	}

    .side-panel .export button {
        width: 100%;
        text-align: center;
        padding: 8px;
        background-color: #444;
    }

    .side-panel .section-divider {
        display: flex;
        flex-direction: column;
        color: white;
        gap: 8px;
        padding: 16px 16px 0px 16px;
        border-top: 1px solid #444;
    }

    .side-panel .section-divider .label {
        font-size: 14px;
        color: #fff;
    }

    .side-panel .section-divider p {
        font-size: 12px;
        color: #888;
    }
</style>
