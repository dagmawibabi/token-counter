<script lang="ts">
	import { onMount } from 'svelte';
	import HeaderParagraph from '../components/header_paragraph.svelte';
	import Nav from '../components/nav.svelte';
	import Cta from '../components/cta.svelte';
	import TableData from '../components/table_data.svelte';
	import { resultState } from '../state/result_state.svelte';
	import Summary from '../components/summary.svelte';

	onMount(() => {
		resultState.loadSampleData();
		// try {
		// 	const storedResults = localStorage.getItem('chatResults');
		// 	const storedTotals = localStorage.getItem('chatTotals');
		// 	if (storedResults) results = JSON.parse(storedResults);
		// 	if (storedTotals) overallTotals = JSON.parse(storedTotals);
		// } catch (e) {
		// 	console.error(e);
		// }
	});
</script>

<div class="mx-auto h-screen w-2/3 overflow-clip selection:bg-neutral-500 selection:text-white">
	<!-- Nav -->
	<Nav />

	<!-- Paragraph -->
	<HeaderParagraph />

	<!-- Results -->
	{#if resultState.results.length == 0}
		<!-- CTA -->
		<div class="px-10 py-5">
			<Cta />
		</div>
	{:else}
		<!-- Total -->
		<Summary />

		<!-- Table -->
		<TableData />
	{/if}
</div>
