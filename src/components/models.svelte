<script lang="ts">
	import { resultState } from '../state/result_state.svelte';
	import FormattedNumber from './formatted_number.svelte';
</script>

<div class="px-0 pt-2 pb-3">
	<div class="flex flex-wrap justify-center gap-2 rounded-lg p-3">
		{#each Object.entries(resultState.modelCounts).sort((a, b) => b[1] - a[1]) as [key, value] (key)}
			<div class="w-fit rounded-full border border-neutral-300 bg-neutral-200 px-2 text-sm italic">
				{key}&nbsp;—&nbsp;
				<FormattedNumber number={value} /> times
			</div>
		{/each}
	</div>
</div>
