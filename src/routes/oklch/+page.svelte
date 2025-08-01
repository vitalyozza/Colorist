<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="palettes">
	{#each Object.entries(data) as [key, tints]}
		<div class="palette">
			{#each tints as tint}
				<div class="color" style="background-color: {tint};"></div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.palettes {
		display: flex;
		/* flex-wrap: wrap; */
		width: 100%;
		min-height: 100vh;
	}

	.palette {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: auto; /* Минимальная ширина колонки */
	}

	.color {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f0f0f0;
	}
</style>
