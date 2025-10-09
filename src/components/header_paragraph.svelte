<script>
	import HighlightedWords from './highlighted_words.svelte';
</script>

<div class="md:text-md px-4 pb-5 text-left text-sm text-neutral-700 italic md:px-10">
	<div>
		You can export your ChatGPT data in <HighlightedWords
			word="Settings → Data Controls → Export → Confirm Export"
		/> which will be delivered to your email. Download the export sent to you and within it you'll find
		<HighlightedWords word="conversations.json" /> which contains all your ChatGPT conversation history
		and associated metadata. You can then import this file here to view the token usage of each conversation
		along with the total sum of all the tokens you've sent (input tokens) and ChatGPT generated (output
		tokens). You can also sort chats by title, input tokens, output tokens, or total tokens, and view
		metadata such as creation and update dates. This is using the <HighlightedWords
			word="js-tiktoken"
			link="https://www.npmjs.com/package/js-tiktoken"
		/>
		tokenizer for the <HighlightedWords word="gpt-4-turbo" />
		model. Remember this is an estimation and not a complete representation of your token usage. Feel
		free to explore and contribute to the project since it's open-source. All processing is done locally
		in your browser and offline.
	</div>
</div>
