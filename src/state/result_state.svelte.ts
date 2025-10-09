import { sampleData } from '$lib/sample_data';
import { encodingForModel } from 'js-tiktoken';

interface ChatMessage {
	message?: {
		author?: { role?: string };
		content?: { parts?: string[] };
		metadata?: { model_slug?: string };
	};
}

interface ChatFile {
	title?: string;
	mapping?: Record<string, ChatMessage>;
	conversation_id?: string;
	create_time?: string;
	update_time?: string;
}

interface TokenSummary {
	chat_title: string;
	input_tokens: number;
	output_tokens: number;
	total_tokens: number;
	conversation_id: string;
	create_time: string;
	update_time: string;
	model: string;
}

interface Totals {
	input_tokens: number;
	output_tokens: number;
	total_tokens: number;
}

class ResultState {
	isSampleDataLoaded = $state(false);
	results: TokenSummary[] = $state([]);
	overallTotals: Totals = $state({ input_tokens: 0, output_tokens: 0, total_tokens: 0 });
	models: string[] = $state([]);
	modelCounts: Record<string, number> = $state({
		'gpt-5': 515,
		research: 25,
		unknown: 304,
		'gpt-5-t-mini': 35,
		'gpt-5-mini': 69,
		'gpt-5-thinking': 5,
		'gpt-4o': 3962,
		'o4-mini': 10,
		'gpt-4-1-mini': 3,
		o1: 28,
		'gpt-4o-mini': 130,
		'o3-mini-high': 3,
		'o3-mini': 2,
		'text-davinci-002-render-sha': 981
	});

	loadSampleData() {
		this.results = sampleData;
		this.overallTotals = this.computeTotals(this.results);
		this.isSampleDataLoaded = true;
	}

	async handleFileChange(event: Event) {
		const file = (event.target as HTMLInputElement).files?.[0];
		if (!file) return;
		const reader = new FileReader();

		reader.onload = async () => {
			try {
				const parsed = JSON.parse(reader.result as string) as ChatFile[];
				const enc = encodingForModel('gpt-4-turbo');
				const summaries: TokenSummary[] = [];

				for (const chat of parsed) {
					let inputTokens = 0;
					let outputTokens = 0;
					let modelSlug = '';

					if (chat.mapping) {
						for (const item of Object.values(chat.mapping)) {
							const msg = item.message;
							if (!msg) continue;

							const role = msg.author?.role;
							const parts = msg.content?.parts ?? [];
							const text = parts.join(' ');
							const count = enc.encode(text).length;

							if (role === 'user') {
								inputTokens += count;
							} else if (role === 'assistant') {
								outputTokens += count;
								modelSlug = msg?.metadata?.model_slug ?? 'unknown';
								this.models.push(msg?.metadata?.model_slug ?? 'unknown');
							}
						}
					}

					summaries.push({
						chat_title: chat.title ?? 'Untitled Chat',
						input_tokens: inputTokens,
						output_tokens: outputTokens,
						total_tokens: inputTokens + outputTokens,
						conversation_id: chat.conversation_id!,
						create_time: chat.create_time!,
						update_time: chat.update_time!,
						model: modelSlug
					});
				}

				this.results = summaries;
				this.overallTotals = this.computeTotals(this.results);
				// this.models = Array.from(new Set(this.models));
				// count occurence of each model
				this.modelCounts = this.models.reduce(
					(acc, model) => {
						acc[model] = (acc[model] || 0) + 1;
						return acc;
					},
					{} as Record<string, number>
				);
				// localStorage.setItem('chatResults', JSON.stringify(results));
				// localStorage.setItem('chatTotals', JSON.stringify(overallTotals));
			} catch (e) {
				console.error('Invalid JSON file', e);
			}
		};
		reader.readAsText(file);
		this.isSampleDataLoaded = false;
	}

	computeTotals(summaries: TokenSummary[]) {
		const totals = summaries.reduce(
			(acc, curr) => {
				acc.input_tokens += curr.input_tokens;
				acc.output_tokens += curr.output_tokens;
				acc.total_tokens += curr.total_tokens;
				return acc;
			},
			{ input_tokens: 0, output_tokens: 0, total_tokens: 0 }
		);

		return totals;
	}

	// Keep track of sort order for each field
	sortOrder: Record<string, 'asc' | 'desc'> = {
		input_tokens: 'asc',
		output_tokens: 'asc',
		total_tokens: 'asc',
		chat_title: 'asc',
		model: 'asc'
	};

	sortResults(field: 'input_tokens' | 'output_tokens' | 'total_tokens' | 'chat_title' | 'model') {
		const order = this.sortOrder[field]; // current order
		this.results = [...this.results].sort((a, b) => {
			if (field === 'chat_title') {
				return order === 'asc'
					? a.chat_title.localeCompare(b.chat_title)
					: b.chat_title.localeCompare(a.chat_title);
			} else if (field === 'model') {
				return order === 'asc' ? a.model.localeCompare(b.model) : b.model.localeCompare(a.model);
			} else {
				return order === 'asc' ? a[field] - b[field] : b[field] - a[field];
			}
		});

		// Toggle order for next time
		this.sortOrder[field] = order === 'asc' ? 'desc' : 'asc';
	}
}

export const resultState = new ResultState();
