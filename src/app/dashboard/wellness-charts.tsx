
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
  ChartStyle,
} from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { format, parseISO } from "date-fns";
import { useMemo } from "react";

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
    <Card>
      <CardHeader>
        <CardTitle>Sensation Intensity Over Time</CardTitle>
        <CardDescription>
          Intensity of physical sensations you've logged.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="min-h-[200px] w-full">
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
  );
}
