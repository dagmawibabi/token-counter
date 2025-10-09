<script lang="ts">
	import FormattedNumber from './formatted_number.svelte';
	let { label, result_length, leading = '' } = $props();
</script>

<div
	class="w-full cursor-default rounded-md border border-neutral-400 bg-neutral-50 px-5 py-3 text-center drop-shadow-neutral-200 hover:border-neutral-400 hover:drop-shadow-sm"
>
	<div class="text-sm text-neutral-500">{label}</div>
	<div class="flex items-center justify-center">
		<div class="font-mono text-lg text-neutral-600 md:text-3xl">
			<FormattedNumber number={result_length} />
		</div>
		<div class="pl-1 text-lg italic md:text-xl">
			{leading}
		</div>
	</div>
</div>
