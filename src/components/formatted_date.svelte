<script lang="ts">
	let { label, date } = $props();
	let formatted = new Date(date * 1000).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<div class="text-xs text-neutral-500">{label}:</div>
<div class="text-xs">{formatted}</div>
