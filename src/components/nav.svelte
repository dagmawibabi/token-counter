<script>
	import { Github } from '@lucide/svelte';
	import Cta from './cta.svelte';
	import logo from '$lib/assets/logos/OpenAILogo.png';
	import { resultState } from '../state/result_state.svelte';
</script>

<div class="flex items-center justify-between px-2 py-4 md:px-10">
	<div class="flex items-center justify-between">
		<div class="flex items-center justify-center gap-x-2">
			<img src={logo} alt="OpenAI Logo" class="h-6 w-6" />
			<div class="font-semibold md:text-xl">Token Counter</div>
		</div>
		<div class="hidden items-end justify-end text-sm font-medium text-neutral-500 md:flex">
			&nbsp;— by&nbsp;<a
				href="https://dagmawi.dev"
				class="italic hover:text-blue-500"
				target="_blank">dagmawi.dev</a
			>
		</div>
	</div>

	<div class="flex items-center">
		{#if resultState.results.length > 0}
			<Cta />
		{/if}
		<a
			href="https://github.com/dagmawibabi/token-counter"
			target="_blank"
			class="pl-5 hover:text-blue-400"
		>
			<Github size={20} />
		</a>
	</div>
</div>
