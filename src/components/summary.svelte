<script lang="ts">
	import { resultState } from '../state/result_state.svelte';
	import TotalTokensCards from './total_tokens_cards.svelte';
</script>

<div class="px-2 md:px-5">
	<div class="grid grid-cols-2 justify-center gap-x-5 gap-y-5 pt-2 pb-4 md:flex">
		<TotalTokensCards label="Number of Chats" result_length={resultState.results.length} />
		<TotalTokensCards label="Input Tokens" result_length={resultState.overallTotals.input_tokens} />
		<TotalTokensCards
			label="Output Tokens"
			result_length={resultState.overallTotals.output_tokens}
		/>
		<TotalTokensCards label="Total Tokens" result_length={resultState.overallTotals.total_tokens} />
	</div>
	<div class="grid grid-cols-2 justify-center gap-x-5 gap-y-5 pt-2 pb-4 md:flex">
		<TotalTokensCards
			label="Input Price"
			leading="$"
			result_length={resultState.overallTotals.input_price}
		/>
		<TotalTokensCards
			label="Output Price"
			leading="$"
			result_length={resultState.overallTotals.output_price}
		/>
		<TotalTokensCards
			label="Total Price"
			leading="$"
			result_length={resultState.overallTotals.total_price}
		/>
	</div>
</div>
