<script lang="ts">
	import { resultState } from '../state/result_state.svelte';
	import TotalTokensCards from './total_tokens_cards.svelte';
</script>

<div class="px-2 md:px-5">
	<div class="grid grid-cols-2 justify-center gap-x-5 gap-y-5 pt-2 pb-8 md:flex">
		<TotalTokensCards label="Number of Chats" result_length={resultState.results.length} />
		<TotalTokensCards label="Input Tokens" result_length={resultState.overallTotals.input_tokens} />
		<TotalTokensCards
			label="Output Tokens"
			result_length={resultState.overallTotals.output_tokens}
		/>
		<TotalTokensCards label="Total Tokens" result_length={resultState.overallTotals.total_tokens} />
	</div>
</div>
