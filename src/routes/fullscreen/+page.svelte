<script lang="ts">
	import Nav from '../../components/nav.svelte';
	import Summary from '../../components/summary.svelte';
	import TableData from '../../components/table_data.svelte';
</script>

<svelte:head>
	<title>Token Counter</title>
	<meta property="description" content="Open-source ChatGPT Conversation Token Counter" />
	<meta property="og:title" content="Token Counter" />
	<meta property="og:description" content="Open-source ChatGPT Conversation Token Counter" />
</svelte:head>

<div class="mx-auto w-[95%] pb-36 selection:bg-neutral-500 selection:text-white md:w-2/3">
	<!-- Nav -->
	<Nav />

	<!-- Total -->
	<Summary />

	<!-- Table -->
	<TableData />
</div>
