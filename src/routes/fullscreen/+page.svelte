<script lang="ts">
	import Nav from '../../components/nav.svelte';
	import Summary from '../../components/summary.svelte';
	import TableData from '../../components/table_data.svelte';
</script>

<div class="mx-auto w-2/3 pb-36 selection:bg-neutral-500 selection:text-white">
	<!-- Nav -->
	<Nav />

	<!-- Total -->
	<Summary />

	<!-- Table -->
	<TableData />
</div>
