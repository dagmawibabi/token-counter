<script lang="ts">
	let { number = 0 } = $props();
	const formatter = new Intl.NumberFormat('en-US');
</script>

<div class="inline-block">
	{formatter.format(number)}
</div>
