"use client";

import {
	Label,
	PolarGrid,
	PolarRadiusAxis,
	RadialBar,
	RadialBarChart,
} from "recharts";

import { CardContent } from "@/components/ui/card";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

export const description = "A radial chart with text";

export function ScoreChart({ score }: { score: number }) {
	const getColor = (score: number) => {
		if (score >= 80) {
			return "green";
		}
		if (score >= 60) {
			return "yellow";
		}
		if (score >= 40) {
			return "orange";
		}
		if (score >= 20) {
			return "red";
		}
		return "red";
	};
	const chartData = [
		{ browser: "safari", visitors: score, fill: getColor(score) },
	];

	const chartConfig = {
		visitors: {
			label: "Visitors",
		},
		safari: {
			label: "Safari",
			color: "hsl(var(--chart-2))",
		},
	} satisfies ChartConfig;

	return (
		<CardContent className="flex-1 pb-0">
			<ChartContainer
				config={chartConfig}
				className="mx-auto aspect-square max-h-[250px]"
			>
				<RadialBarChart
					data={chartData}
					startAngle={0}
					endAngle={250}
					innerRadius={80}
					outerRadius={110}
				>
					<PolarGrid
						gridType="circle"
						radialLines={false}
						stroke="none"
						className="first:fill-muted last:fill-background"
						polarRadius={[86, 74]}
					/>
					<RadialBar dataKey="visitors" background cornerRadius={10} />
					<PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
						<Label
							content={({ viewBox }) => {
								if (viewBox && "cx" in viewBox && "cy" in viewBox) {
									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan
												x={viewBox.cx}
												y={viewBox.cy}
												className="fill-foreground text-4xl font-bold"
											>
												{chartData[0].visitors.toLocaleString()}
											</tspan>
										</text>
									);
								}
							}}
						/>
					</PolarRadiusAxis>
				</RadialBarChart>
			</ChartContainer>
		</CardContent>
	);
}
