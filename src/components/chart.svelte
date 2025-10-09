<script lang="ts">
	import * as Chart from '$lib/components/ui/chart/index.js';
	import ChartContainer from '$lib/components/ui/chart/chart-container.svelte';
	import { Area, AreaChart, ChartClipPath } from 'layerchart';
	import { scaleUtc } from 'd3-scale';
	import { curveNatural } from 'd3-shape';
	import { cubicInOut } from 'svelte/easing';

	let { results } = $props();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let filteredData = results.map((chat: any, index: any) => ({
		date: new Date(2025, 0, index + 1),
		mobile: chat.input_tokens,
		desktop: chat.output_tokens
	}));

	const chartConfig = {
		desktop: { label: 'InputTok', color: 'var(--chart-1)' },
		mobile: { label: 'OutputTok', color: 'var(--chart-2)' }
	} satisfies Chart.ChartConfig;

	const timeRange = 'all';
</script>

<ChartContainer config={chartConfig} class="aspect-auto h-[250px] w-full">
	<AreaChart
		legend
		data={filteredData}
		x="date"
		xScale={scaleUtc()}
		series={[
			{
				key: 'mobile',
				label: 'Mobile',
				color: chartConfig.mobile.color
			},
			{
				key: 'desktop',
				label: 'Desktop',
				color: chartConfig.desktop.color
			}
		]}
		seriesLayout="stack"
		props={{
			area: {
				curve: curveNatural,
				'fill-opacity': 0.4,
				line: { class: 'stroke-1' },
				motion: 'tween'
			},
			xAxis: {
				ticks: timeRange,
				format: (v) => {
					return v.toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric'
					});
				}
			},

			yAxis: { format: () => '' }
		}}
	>
		{#snippet marks({ series, getAreaProps })}
			<defs>
				<linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
					<stop offset="5%" stop-color="var(--color-desktop)" stop-opacity={1.0} />
					<stop offset="95%" stop-color="var(--color-desktop)" stop-opacity={0.1} />
				</linearGradient>
				<linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
					<stop offset="5%" stop-color="var(--color-mobile)" stop-opacity={0.8} />
					<stop offset="95%" stop-color="var(--color-mobile)" stop-opacity={0.1} />
				</linearGradient>
			</defs>
			<ChartClipPath
				initialWidth={0}
				motion={{
					width: { type: 'tween', duration: 1000, easing: cubicInOut }
				}}
			>
				{#each series as s, i (s.key)}
					<Area
						{...getAreaProps(s, i)}
						fill={s.key === 'desktop' ? 'url(#fillDesktop)' : 'url(#fillMobile)'}
					/>
				{/each}
			</ChartClipPath>
		{/snippet}
		{#snippet tooltip()}
			<Chart.Tooltip
				labelFormatter={(v: Date) => {
					return v.toLocaleDateString('en-US', {
						month: 'long'
					});
				}}
				indicator="line"
			/>
		{/snippet}
	</AreaChart>
</ChartContainer>
