
"use client";

import { useWellnessLog } from "@/context/wellness-log-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "@/components/ui/chart";
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { thoughtPatterns as thoughtPatternConfig } from "@/lib/data";
import { format, parseISO } from "date-fns";
import { useMemo } from "react";

const thoughtChartConfig = thoughtPatternConfig.reduce((acc, pattern) => {
  acc[pattern.id] = {
    label: pattern.label,
  };
  return acc;
}, {} as ChartConfig);

export function WellnessCharts() {
  const { logEntries } = useWellnessLog();

  const sensationTimeline = useMemo(() => {
    return logEntries
      .flatMap((entry) =>
        entry.sensations.map((sensation) => ({
          date: entry.date,
          intensity: sensation.intensity,
          location: sensation.location,
        }))
      )
      .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
      .map((s) => ({
        ...s,
        date: format(parseISO(s.date), "MMM d"),
      }));
  }, [logEntries]);

  const thoughtPatternFrequency = useMemo(() => {
    const counts: { [key: string]: number } = {};
    for (const entry of logEntries) {
      for (const thought of entry.thoughts) {
        counts[thought] = (counts[thought] || 0) + 1;
      }
    }
    return thoughtPatternConfig
      .map((pattern) => ({
        name: pattern.label,
        value: counts[pattern.id] || 0,
        fill: `hsl(var(--chart-${
          (thoughtPatternConfig.indexOf(pattern) % 5) + 1
        }))`,
      }))
      .filter((item) => item.value > 0);
  }, [logEntries]);

  if (logEntries.length === 0) {
    return (
      <Card className="w-full py-20">
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            No data yet. Start by adding a new check-in entry.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle>Sensation Intensity Over Time</CardTitle>
          <CardDescription>
            Intensity of physical sensations you've logged.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="min-h-[250px] w-full">
            <LineChart
              accessibilityLayer
              data={sensationTimeline}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="intensity"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{
                  fill: "hsl(var(--primary))",
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thought Patterns</CardTitle>
          <CardDescription>
            A breakdown of your recorded thought patterns.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <ChartContainer
            config={thoughtChartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={thoughtPatternFrequency}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <ChartStyle />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
