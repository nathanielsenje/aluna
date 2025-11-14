/**
 * Analytics Utility Functions
 * Data aggregation, transformation, and statistical calculations for dashboard
 */

import { format, parseISO } from 'date-fns';
import type { LogEntry, ChartDataPoint, EmotionFrequency } from '../types';
import { filterByDateRange, groupByDay } from './date-helpers';

/**
 * Get emotion frequency from log entries
 */
export function getEmotionFrequency(entries: LogEntry[]): EmotionFrequency[] {
  const counts = new Map<string, number>();
  const total = entries.length;

  for (const entry of entries) {
    const emotion = entry.emotion; // Level 2 emotion
    counts.set(emotion, (counts.get(emotion) || 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([emotion, count]) => ({
      emotion,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get dominant (most frequent) emotion
 */
export function getDominantEmotion(entries: LogEntry[]): string | null {
  const frequencies = getEmotionFrequency(entries);
  return frequencies.length > 0 ? frequencies[0].emotion : null;
}

/**
 * Calculate average sensation intensity
 */
export function getAverageSensationIntensity(entries: LogEntry[]): number {
  const allSensations = entries.flatMap((entry) => entry.sensations);

  if (allSensations.length === 0) return 0;

  const totalIntensity = allSensations.reduce(
    (sum, sensation) => sum + sensation.intensity,
    0
  );

  return totalIntensity / allSensations.length;
}

/**
 * Get sensation intensity data for chart
 */
export function getSensationIntensityData(entries: LogEntry[]): ChartDataPoint[] {
  return entries.flatMap((entry) => {
    const dateStr = entry.date instanceof Date
      ? format(entry.date, 'MMM d')
      : format(parseISO(entry.date as any), 'MMM d');

    return entry.sensations.map((sensation) => ({
      date: dateStr,
      value: sensation.intensity,
      label: sensation.location,
    }));
  }).reverse(); // Oldest first for chart
}

/**
 * Get emotion distribution for pie/donut chart
 */
export function getEmotionDistribution(entries: LogEntry[]): ChartDataPoint[] {
  const frequencies = getEmotionFrequency(entries);

  return frequencies.map((freq) => ({
    date: freq.emotion,
    value: freq.count,
    label: freq.emotion,
    emotion: freq.emotion,
  }));
}

/**
 * Get trend data for line chart (aggregated by day)
 */
export function getTrendData(
  entries: LogEntry[],
  metric: 'intensity' | 'count' = 'intensity'
): ChartDataPoint[] {
  const getDate = (entry: LogEntry) =>
    entry.date instanceof Date ? entry.date : parseISO(entry.date as any);

  const grouped = groupByDay(entries, getDate);
  const sortedDays = Array.from(grouped.keys()).sort();

  return sortedDays.map((dayKey) => {
    const dayEntries = grouped.get(dayKey)!;

    let value: number;
    if (metric === 'count') {
      value = dayEntries.length;
    } else {
      // Average intensity
      const allSensations = dayEntries.flatMap((e) => e.sensations);
      value = allSensations.length > 0
        ? allSensations.reduce((sum, s) => sum + s.intensity, 0) / allSensations.length
        : 0;
    }

    return {
      date: format(parseISO(dayKey), 'MMM d'),
      value: Math.round(value * 10) / 10, // Round to 1 decimal
      label: format(parseISO(dayKey), 'EEE'), // Day abbreviation
    };
  });
}

/**
 * Get comparison data between two time periods
 */
export function getComparisonData(
  currentEntries: LogEntry[],
  previousEntries: LogEntry[]
): {
  currentAvg: number;
  previousAvg: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
} {
  const currentAvg = getAverageSensationIntensity(currentEntries);
  const previousAvg = getAverageSensationIntensity(previousEntries);
  const change = currentAvg - previousAvg;
  const changePercent = previousAvg > 0 ? (change / previousAvg) * 100 : 0;

  let trend: 'up' | 'down' | 'stable' = 'stable';
  if (Math.abs(changePercent) > 5) {
    trend = change > 0 ? 'up' : 'down';
  }

  return {
    currentAvg: Math.round(currentAvg * 10) / 10,
    previousAvg: Math.round(previousAvg * 10) / 10,
    change: Math.round(change * 10) / 10,
    changePercent: Math.round(changePercent * 10) / 10,
    trend,
  };
}

/**
 * Get monthly comparison data
 */
export function getMonthlyComparison(
  entries: LogEntry[],
  currentMonthStart: Date,
  currentMonthEnd: Date,
  previousMonthStart: Date,
  previousMonthEnd: Date
): {
  current: { emotions: EmotionFrequency[]; avgIntensity: number; count: number };
  previous: { emotions: EmotionFrequency[]; avgIntensity: number; count: number };
  comparison: ReturnType<typeof getComparisonData>;
} {
  const getDate = (entry: LogEntry) =>
    entry.date instanceof Date ? entry.date : parseISO(entry.date as any);

  const currentEntries = filterByDateRange(entries, getDate, currentMonthStart, currentMonthEnd);
  const previousEntries = filterByDateRange(entries, getDate, previousMonthStart, previousMonthEnd);

  return {
    current: {
      emotions: getEmotionFrequency(currentEntries),
      avgIntensity: getAverageSensationIntensity(currentEntries),
      count: currentEntries.length,
    },
    previous: {
      emotions: getEmotionFrequency(previousEntries),
      avgIntensity: getAverageSensationIntensity(previousEntries),
      count: previousEntries.length,
    },
    comparison: getComparisonData(currentEntries, previousEntries),
  };
}

/**
 * Get top sensations by frequency
 */
export function getTopSensations(
  entries: LogEntry[],
  limit: number = 5
): Array<{ location: string; count: number; avgIntensity: number }> {
  const sensationMap = new Map<
    string,
    { count: number; totalIntensity: number }
  >();

  for (const entry of entries) {
    for (const sensation of entry.sensations) {
      const existing = sensationMap.get(sensation.location) || {
        count: 0,
        totalIntensity: 0,
      };
      sensationMap.set(sensation.location, {
        count: existing.count + 1,
        totalIntensity: existing.totalIntensity + sensation.intensity,
      });
    }
  }

  return Array.from(sensationMap.entries())
    .map(([location, data]) => ({
      location,
      count: data.count,
      avgIntensity: Math.round((data.totalIntensity / data.count) * 10) / 10,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

/**
 * Get thought pattern frequency
 */
export function getThoughtPatternFrequency(
  entries: LogEntry[]
): Array<{ pattern: string; count: number; percentage: number }> {
  const counts = new Map<string, number>();
  const total = entries.length;

  for (const entry of entries) {
    for (const thought of entry.thoughts || []) {
      counts.set(thought, (counts.get(thought) || 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([pattern, count]) => ({
      pattern,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Calculate check-in consistency score (0-100)
 * Based on frequency and regularity of check-ins
 */
export function getConsistencyScore(entries: LogEntry[], days: number = 30): number {
  if (entries.length === 0) return 0;

  const getDate = (entry: LogEntry) =>
    entry.date instanceof Date ? entry.date : parseISO(entry.date as any);

  const grouped = groupByDay(entries, getDate);
  const daysWithEntries = grouped.size;

  // Frequency score (0-70 points): based on percentage of days with entries
  const frequencyScore = Math.min((daysWithEntries / days) * 70, 70);

  // Regularity score (0-30 points): based on how evenly distributed
  const averageEntriesPerDay = entries.length / daysWithEntries;
  const regularityScore = Math.min(30, averageEntriesPerDay * 10);

  return Math.round(frequencyScore + regularityScore);
}

/**
 * Get insights summary
 */
export function getInsightsSummary(entries: LogEntry[]): {
  totalCheckIns: number;
  dominantEmotion: string | null;
  avgIntensity: number;
  mostFrequentSensation: string | null;
  mostFrequentThought: string | null;
  consistencyScore: number;
} {
  const topSensations = getTopSensations(entries, 1);
  const topThoughts = getThoughtPatternFrequency(entries);

  return {
    totalCheckIns: entries.length,
    dominantEmotion: getDominantEmotion(entries),
    avgIntensity: Math.round(getAverageSensationIntensity(entries) * 10) / 10,
    mostFrequentSensation: topSensations[0]?.location || null,
    mostFrequentThought: topThoughts[0]?.pattern || null,
    consistencyScore: getConsistencyScore(entries),
  };
}

/**
 * Filter entries by emotion
 */
export function filterByEmotion(entries: LogEntry[], emotion: string): LogEntry[] {
  return entries.filter((entry) => entry.emotion === emotion);
}

/**
 * Filter entries by sensation location
 */
export function filterBySensationLocation(
  entries: LogEntry[],
  location: string
): LogEntry[] {
  return entries.filter((entry) =>
    entry.sensations.some((s) => s.location === location)
  );
}

/**
 * Filter entries by thought pattern
 */
export function filterByThought(entries: LogEntry[], thoughtId: string): LogEntry[] {
  return entries.filter((entry) => entry.thoughts?.includes(thoughtId));
}
