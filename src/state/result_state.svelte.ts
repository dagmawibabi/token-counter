import { sampleData } from '$lib/sample_data';
import { encodingForModel } from 'js-tiktoken';

interface ChatMessage {
	message?: {
		author?: { role?: string };
		content?: { parts?: string[] };
		metadata?: { model_slug?: string };
		default_model_slug: string;
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
	input_price: number;
	output_price: number;
	total_price: number;
}

interface Totals {
	input_tokens: number;
	output_tokens: number;
	total_tokens: number;
	input_price: number;
	output_price: number;
	total_price: number;
}

const modelPrices: Record<string, { input: number; output: number }> = {
	auto: {
		input: 2.5,
		output: 10
	},
	research: {
		input: 2.5,
		output: 10
	},
	unknown: {
		input: 2.5,
		output: 10
	},
	'': {
		input: 2.5,
		output: 10
	},
	'gpt-5': {
		input: 1.25,
		output: 10
	},
	'gpt-5-mini': {
		input: 0.25,
		output: 2
	},
	'gpt-5-t-mini': {
		input: 0.05,
		output: 0.4
	},
	'gpt-5-thinking': {
		input: 1.25,
		output: 10
	},
	'gpt-4o': {
		input: 2.5,
		output: 10
	},
	'gpt-4o-mini': {
		input: 0.15,
		output: 0.6
	},
	'gpt-4-1': {
		input: 2,
		output: 8
	},
	'gpt-4-1-mini': {
		input: 0.4,
		output: 1.6
	},
	o1: {
		input: 15,
		output: 60
	},
	'o3-mini': {
		input: 1.1,
		output: 4.4
	},
	'o4-mini': {
		input: 1.1,
		output: 4.4
	},
	'text-davinci-002-render-sha': {
		input: 2,
		output: 2
	}
};

class ResultState {
	isDataLoaded = $state(false);
	results: TokenSummary[] = $state([]);
	overallTotals: Totals = $state({
		input_tokens: 0,
		output_tokens: 0,
		total_tokens: 0,
		input_price: 0,
		output_price: 0,
		total_price: 0
	});
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
								modelSlug = msg?.metadata?.model_slug ?? msg?.default_model_slug ?? 'unknown';
								this.models.push(modelSlug);
							}
						}
					}

					try {
						summaries.push({
							chat_title: chat.title ?? 'Untitled Chat',
							input_tokens: inputTokens,
							output_tokens: outputTokens,
							total_tokens: inputTokens + outputTokens,
							conversation_id: chat.conversation_id!,
							create_time: chat.create_time!,
							update_time: chat.update_time!,
							model: modelSlug,
							input_price: (modelPrices[modelSlug].input * inputTokens) / 1000000,
							output_price: (modelPrices[modelSlug].output * outputTokens) / 1000000,
							total_price:
								(modelPrices[modelSlug].input * inputTokens) / 1000000 +
								(modelPrices[modelSlug].output * outputTokens) / 1000000
						});
					} catch (e) {
						console.log(e);
						summaries.push({
							chat_title: chat.title ?? 'Untitled Chat',
							input_tokens: inputTokens,
							output_tokens: outputTokens,
							total_tokens: inputTokens + outputTokens,
							conversation_id: chat.conversation_id!,
							create_time: chat.create_time!,
							update_time: chat.update_time!,
							model: modelSlug,
							input_price: (modelPrices['gpt-4o'].input * inputTokens) / 1000000,
							output_price: (modelPrices['gpt-4o'].output * outputTokens) / 1000000,
							total_price:
								(modelPrices['gpt-4o'].input * inputTokens) / 1000000 +
								(modelPrices['gpt-4o'].output * outputTokens) / 1000000
						});
					}
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
		this.isDataLoaded = true;
	}

	computeTotals(summaries: TokenSummary[]) {
		const totals = summaries.reduce(
			(acc, curr) => {
				acc.input_tokens += curr.input_tokens;
				acc.output_tokens += curr.output_tokens;
				acc.total_tokens += curr.total_tokens;
				acc.input_price += curr.input_price;
				acc.output_price += curr.output_price;
				acc.total_price += curr.total_price;
				return acc;
			},
			{
				input_tokens: 0,
				output_tokens: 0,
				total_tokens: 0,
				input_price: 0,
				output_price: 0,
				total_price: 0
			}
		);

		return totals;
	}

	// Keep track of sort order for each field
	sortOrder: Record<string, 'asc' | 'desc'> = {
		input_tokens: 'asc',
		output_tokens: 'asc',
		total_tokens: 'asc',
		chat_title: 'asc',
		model: 'asc',
		input_price: 'asc',
		output_price: 'asc',
		total_price: 'asc'
	};

	sortResults(
		field:
			| 'input_tokens'
			| 'output_tokens'
			| 'total_tokens'
			| 'chat_title'
			| 'model'
			| 'input_price'
			| 'output_price'
			| 'total_price'
	) {
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
