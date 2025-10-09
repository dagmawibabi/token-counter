<script lang="ts">
	let { word, link = '/' } = $props();
</script>

<div
	class="hidden w-fit rounded-lg bg-neutral-200 px-2 py-0 font-mono text-sm text-neutral-800 hover:bg-neutral-300 hover:text-neutral-700 md:inline-block"
>
	{#if link != '/'}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={link} target="_blank" class:text-blue-500={link != '/'}>
			{word}
		</a>
	{:else}
		{word}
	{/if}
</div>

<div class="inline-block text-sm md:hidden">
	{#if link != '/'}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={link} target="_blank" class:text-blue-500={link != '/'}>
			{word}
		</a>
	{:else}
		{word}
	{/if}
</div>
