
'use client';

import { useWellnessLog } from '@/context/wellness-log-provider';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Activity, Star, TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { emotionCategories } from '@/lib/data';

export function StatCards() {
  const { logEntries } = useWellnessLog();

  const summary = useMemo(() => {
    if (logEntries.length === 0) {
      return {
        lastCheckIn: 'N/A',
        mostFrequentEmotion: 'N/A',
        weeklyAverageIntensity: 'N/A',
      };
    }

    const sortedEntries = [...logEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const lastEntry = sortedEntries[0];
    const lastCheckIn = formatDistanceToNow(new Date(lastEntry.date), {
      addSuffix: true,
    });

    const emotionCounts = sortedEntries.reduce((acc, entry) => {
      const l1Emotion = emotionCategories.find(cat => cat.subCategories.some(sub => sub.name === entry.emotion))?.name || 'Unknown';
      acc[l1Emotion] = (acc[l1Emotion] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostFrequentEmotion = Object.entries(emotionCounts).sort(
      (a, b) => b[1] - a[1]
    )[0][0];

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyEntries = sortedEntries.filter(
      (entry) => new Date(entry.date) > oneWeekAgo
    );

    const totalIntensity = weeklyEntries.reduce((acc, entry) => {
        return acc + entry.sensations.reduce((sAcc, s) => sAcc + s.intensity, 0)
    }, 0);
    const totalSensations = weeklyEntries.reduce((acc, entry) => acc + entry.sensations.length, 0);
    const weeklyAverageIntensity = totalSensations > 0 ? (totalIntensity / totalSensations).toFixed(1) : 'N/A';

    return { lastCheckIn, mostFrequentEmotion, weeklyAverageIntensity };
  }, [logEntries]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Last Check-in
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.lastCheckIn}</div>
          <p className="text-xs text-muted-foreground">
            Keep up the great work!
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Dominant Emotion
          </CardTitle>
          <Star className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.mostFrequentEmotion}</div>
          <p className="text-xs text-muted-foreground">
            Your most logged primary emotion.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Weekly Sensation Avg.
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.weeklyAverageIntensity} / 10</div>
          <p className="text-xs text-muted-foreground">
            Average intensity of sensations this week.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
