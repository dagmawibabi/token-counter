<!-- eslint-disable svelte/no-navigation-without-resolve -->
<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import FormattedDate from '../components/formatted_date.svelte';
	import FormattedNumber from '../components/formatted_number.svelte';
	import { Ellipsis, Maximize, Minimize } from '@lucide/svelte';
	import { resultState } from '../state/result_state.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
</script>

<div
	class="no-scrollbar mx-auto h-full w-full overflow-scroll rounded-md border border-neutral-400 bg-neutral-200 hover:border-neutral-400"
>
	<Table.Root class="drop-shadow-2xl">
		<Table.Header class="sticky top-0 bg-neutral-200">
			<Table.Row>
				<Table.Head class="border">Number</Table.Head>
				<Table.Head class="w-[450px]"
					><Button variant="ghost" onclick={() => resultState.sortResults('chat_title')}
						>Chat Title and ID</Button
					></Table.Head
				>
				<Table.Head class="border text-center"
					><Button variant="ghost" onclick={() => resultState.sortResults('input_tokens')}
						>Input Tokens</Button
					></Table.Head
				>
				<Table.Head class="text-center"
					><Button variant="ghost" onclick={() => resultState.sortResults('output_tokens')}
						>Output Tokens</Button
					></Table.Head
				>
				<Table.Head class="border text-center"
					><Button variant="ghost" onclick={() => resultState.sortResults('total_tokens')}
						>Total Tokens</Button
					></Table.Head
				>
				<Table.Head class="w-[60px] text-center">
					{#if page.url.pathname + '/' == '/fullscreen/'}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<Button variant="ghost" onclick={() => goto('/')}>
							<Minimize />
						</Button>
					{:else}
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<Button variant="ghost" onclick={() => goto('/fullscreen')}>
							<Maximize />
						</Button>
					{/if}
				</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body class="bg-white">
			<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
			{#each resultState.results as chat, chat_id (chat.conversation_id)}
				<Table.Row>
					<Table.Cell class="font-medium">{resultState.results.indexOf(chat) + 1}</Table.Cell>
					<Table.Cell
						class="group/title flex w-[450px] cursor-default border-r border-l group-hover/title:hidden"
					>
						<div class="flex cursor-default group-hover/title:hidden">
							{chat.chat_title}
						</div>
						<div class="hidden cursor-default items-baseline font-mono group-hover/title:flex">
							<span class="text-xs text-neutral-500">ID:&nbsp;</span>
							{chat.conversation_id}
						</div>
					</Table.Cell>
					<Table.Cell class="text-center">
						<FormattedNumber number={chat.input_tokens} />
					</Table.Cell>
					<Table.Cell class="border-r border-l text-center">
						<FormattedNumber number={chat.output_tokens} />
					</Table.Cell>
					<Table.Cell class="text-center">
						<FormattedNumber number={chat.total_tokens} />
					</Table.Cell>
					<Table.Cell class="w-[60px] cursor-pointer border-l text-center hover:bg-neutral-400">
						<Popover.Root>
							<Popover.Trigger class="cursor-pointer "><Ellipsis size={16} /></Popover.Trigger>
							<Popover.Content class="w-fit">
								<div>
									<FormattedDate label="Created at" date={chat.create_time} />
									<Separator class="my-2" />
									<FormattedDate label="Updated at" date={chat.update_time} />
								</div>
							</Popover.Content>
						</Popover.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
		<Table.Footer>
			<Table.Row>
				<Table.Cell class="font-medium">Total</Table.Cell>
				<Table.Cell class="font-medium"></Table.Cell>
				<Table.Cell class="text-center">
					<FormattedNumber number={resultState.overallTotals.input_tokens} />
				</Table.Cell>
				<Table.Cell class="border-r border-l text-center">
					<FormattedNumber number={resultState.overallTotals.output_tokens} />
				</Table.Cell>
				<Table.Cell class="text-center">
					<FormattedNumber number={resultState.overallTotals.total_tokens} />
				</Table.Cell>
				<Table.Cell class="font-medium"></Table.Cell>
			</Table.Row>
		</Table.Footer>
	</Table.Root>
</div>
