<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Download, Upload } from '@lucide/svelte';
	import { resultState } from '../state/result_state.svelte';

	let fileInput: HTMLInputElement;
</script>

<div class="flex gap-x-2">
	<Button
		variant="outline"
		size="sm"
		class="cursor-pointer bg-neutral-50"
		onclick={() => fileInput.click()}
	>
		<Upload />
		Upload
	</Button>
	<input
		bind:this={fileInput}
		id="json"
		type="file"
		accept=".json,application/json"
		class="hidden"
		onchange={(e) => resultState.handleFileChange(e)}
	/>
	{#if !resultState.isSampleDataLoaded}
		<Button
			variant="outline"
			size="sm"
			class="cursor-pointer bg-neutral-50"
			onclick={() => resultState.loadSampleData()}
		>
			<Download />
			Load Sample Data
		</Button>
	{/if}
</div>
