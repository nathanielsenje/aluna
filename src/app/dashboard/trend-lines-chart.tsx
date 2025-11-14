"use client";

import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getTrendData } from "@/lib/utils/analytics";
import { filterByDateRange } from "@/lib/utils/date-helpers";
import { parseISO } from "date-fns";
import type { LogEntry } from "@/lib/types";

interface TrendLinesChartProps {
  entries: LogEntry[];
}

/**
 * Trend Lines Chart Component
 * Displays line chart showing emotion intensity trends over time
 */
export function TrendLinesChart({ entries }: TrendLinesChartProps) {
  const [timeRange, setTimeRange] = useState<'7' | '30' | '90' | 'all'>('30');

  // Filter entries by time range
  const filteredEntries = useMemo(() => {
    if (timeRange === 'all') return entries;

    const days = parseInt(timeRange);
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - days);

    const getDate = (entry: LogEntry) => {
      if (entry.date instanceof Date) return entry.date;
      if (typeof entry.date === 'string') return parseISO(entry.date);
      if ((entry.date as any).toDate) return (entry.date as any).toDate();
      return new Date();
    };

    return filterByDateRange(entries, getDate, startDate, now);
  }, [entries, timeRange]);

  // Get trend data
  const trendData = useMemo(() => {
    return getTrendData(filteredEntries, 'intensity');
  }, [filteredEntries]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (trendData.length === 0) {
      return { min: 0, max: 0, avg: 0, trend: 'stable' as const };
    }

    const values = trendData.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;

    // Determine trend (simple linear regression slope)
    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (values.length >= 3) {
      const firstThird = values.slice(0, Math.floor(values.length / 3));
      const lastThird = values.slice(-Math.floor(values.length / 3));
      const firstAvg =
        firstThird.reduce((sum, v) => sum + v, 0) / firstThird.length;
      const lastAvg =
        lastThird.reduce((sum, v) => sum + v, 0) / lastThird.length;

      const diff = lastAvg - firstAvg;
      if (Math.abs(diff) > 0.5) {
        trend = diff > 0 ? 'up' : 'down';
      }
    }

    return {
      min: Math.round(min * 10) / 10,
      max: Math.round(max * 10) / 10,
      avg: Math.round(avg * 10) / 10,
      trend,
    };
  }, [trendData]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      default:
        return '➡️';
    }
  };

  const getTrendText = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'Increasing';
      case 'down':
        return 'Decreasing';
      default:
        return 'Stable';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sensation Intensity Trends</CardTitle>
            <CardDescription>
              Average daily sensation intensity over time
            </CardDescription>
          </div>
          <Select value={timeRange} onValueChange={(v: any) => setTimeRange(v)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {trendData.length > 0 ? (
          <>
            {/* Chart */}
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={[0, 10]}
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    label={{
                      value: 'Intensity (0-10)',
                      angle: -90,
                      position: 'insideLeft',
                      style: { fontSize: 12 },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    name="Intensity"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t">
              <div>
                <div className="text-2xl font-bold">{stats.avg}</div>
                <div className="text-xs text-muted-foreground">Average</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.min}</div>
                <div className="text-xs text-muted-foreground">Minimum</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{stats.max}</div>
                <div className="text-xs text-muted-foreground">Maximum</div>
              </div>
              <div>
                <div className="text-2xl font-bold flex items-center gap-1">
                  <span>{getTrendIcon(stats.trend)}</span>
                  <span className="text-base">
                    {getTrendText(stats.trend)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">Trend</div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-lg mb-2">No data available</p>
              <p className="text-sm">
                Check in to see your intensity trends over time
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
