<script lang="ts">
	import { onMount } from 'svelte';
	import HeaderParagraph from '../components/header_paragraph.svelte';
	import Nav from '../components/nav.svelte';
	import Cta from '../components/cta.svelte';
	import TableData from '../components/table_data.svelte';
	import { resultState } from '../state/result_state.svelte';
	import Summary from '../components/summary.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Models from '../components/models.svelte';

	onMount(() => {
		if (resultState.results.length == 0) {
			resultState.loadSampleData();
		}
		// try {
		// 	const storedResults = localStorage.getItem('chatResults');
		// 	const storedTotals = localStorage.getItem('chatTotals');
		// 	if (storedResults) resultState.results = JSON.parse(storedResults);
		// 	if (storedTotals) resultState.overallTotals = JSON.parse(storedTotals);
		// } catch (e) {
		// 	console.error(e);
		// }
	});
</script>

<svelte:head>
	<title>Token Counter</title>
	<meta property="description" content="Open-source ChatGPT Conversation Token Counter" />
	<meta property="og:title" content="Token Counter" />
	<meta property="og:description" content="Open-source ChatGPT Conversation Token Counter" />
</svelte:head>

<div class="h-screen overflow-scroll">
	<div
		class="w-[95%] overflow-clip pl-5 selection:bg-neutral-500 selection:text-white md:mx-auto md:w-2/3 md:pl-0"
	>
		<!-- Nav -->
		<Nav />

		<!-- Paragraph -->
		{#if resultState.isDataLoaded == false}
			<HeaderParagraph />
		{/if}

		<Separator />

		<!-- Results -->
		{#if resultState.results.length == 0}
			<!-- CTA -->
			<div class="px-10 py-5">
				<Cta />
			</div>
		{:else}
			<!-- Models -->
			<Models />

			<!-- Total -->
			<Summary />
		{/if}
	</div>

	<div class="mx-auto w-[85%]">
		{#if resultState.results.length !== 0}
			<!-- Table -->
			<TableData />
		{/if}
	</div>
</div>
