<script lang="ts">
	let { number } = $props();
	const formatter = new Intl.NumberFormat('en-US');
</script>

{formatter.format(number)}
