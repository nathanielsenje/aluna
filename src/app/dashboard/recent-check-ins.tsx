
'use client';

import { useWellnessLog } from '@/context/wellness-log-provider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";

import { useMemo } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { emotionCategories } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

const emotionLegendConfig = emotionCategories.reduce((acc, category) => {
    acc[category.name] = {
        label: category.name,
        color: category.color,
    };
    return acc;
}, {} as ChartConfig);

export function RecentCheckIns() {
  const { logEntries, isLoading } = useWellnessLog();

  const sortedEntries = useMemo(() => {
    if (!logEntries) return [];
    return [...logEntries]
      .sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 5);
  }, [logEntries]);

   const emotionDistribution = useMemo(() => {
    if (!logEntries) return [];
    const emotionCounts = logEntries.reduce((acc, entry) => {
      const l1Emotion = emotionCategories.find(cat => cat.subCategories.some(sub => sub.name === entry.emotion))?.name || 'Unknown';
      acc[l1Emotion] = (acc[l1Emotion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(emotionCounts).map(([name, value]) => ({
      name,
      value,
      fill: emotionLegendConfig[name]?.color,
    }));
  }, [logEntries]);

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Skeleton className="h-48 w-48 rounded-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <div className="ml-auto text-right space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Emotion Distribution</CardTitle>
                <CardDescription>Your overall emotional landscape.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={emotionLegendConfig}
                    className="mx-auto aspect-square max-h-[200px]"
                >
                    <PieChart>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                        data={emotionDistribution}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={40}
                        strokeWidth={5}
                    />
                    <ChartLegend
                        content={<ChartLegendContent nameKey="name" />}
                        className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/3 [&>*]:justify-center"
                    />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card>
        <CardHeader>
            <CardTitle>Recent Check-ins</CardTitle>
            <CardDescription>A look at your last few entries.</CardDescription>
        </CardHeader>
        <CardContent>
            <ScrollArea className="h-[260px]">
            <div className="space-y-4">
            {sortedEntries.length > 0 ? (
              sortedEntries.map((entry) => {
                const l1Category = emotionCategories.find(c => c.subCategories.some(sc => sc.name === entry.emotion));
                return (
                  <div key={entry.id} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{backgroundColor: l1Category?.color || '#ccc'}}>
                       <span className="text-xl">
                        {
                            {
                                "Happy": "😊",
                                "Sad": "😢",
                                "Disgusted": "🤢",
                                "Angry": "😠",
                                "Fearful": "😨",
                                "Surprised": "😮"
                            }[l1Category?.name || ""] || "🤔"
                        }
                        </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">
                        {entry.emotion}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {entry.specificEmotions?.join(', ')}
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm font-medium">
                        {formatDistanceToNow(parseISO(entry.date), { addSuffix: true })}
                      </p>
                       <p className="text-xs text-muted-foreground">
                        {entry.sensations.length} sensation{entry.sensations.length !== 1 && 's'}
                      </p>
                    </div>
                  </div>
                );
            })
            ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No recent check-ins.</p>
            )}
            </div>
            </ScrollArea>
        </CardContent>
        </Card>
    </div>
  );
}
