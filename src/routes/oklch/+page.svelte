<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	console.log(data.palette.accent);
</script>

<h1>Base</h1>

<div class="palette">
	<div class="semantic_directions">
		{#each Object.entries(data.palette) as [key, color]}
			<div class="semantic_direction">
				{#if (key != 'white') && (key != 'black')}
					<div class="tints">
						{#each Object.entries(color.tints).reverse() as [key, tint]}
							<div class="color" style="background-color: {tint.oklch};"></div>
						{/each}
					</div>
				{/if}
				<div class="base">
					<div class="color" style="background-color: {color.base.oklch};"></div>
				</div>
				{#if (key != 'white') && (key != 'black')}
					<div class="shades">
						{#each Object.entries(color.shades) as [key, shade]}
							<div class="color" style="background-color: {shade.oklch};"></div>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.palette {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 8px;
	}

	.semantic_directions {
		display: flex;
		flex-direction: row;
		gap: 8px;
	}

	.semantic_direction {
		display: flex;
		flex-direction: column;
		gap: 0px;
		padding: 8px;
	}

	.base {
	}

	.tints {
		display: flex;
		flex-direction: column;
		gap: 0px;
	}

	.shades {
		display: flex;
		flex-direction: column;
		gap: 0px;
	}

	.color {
		width: 40px;
		height: 40px;
        border: 1px solid #f1f1f1;
	}
</style>
