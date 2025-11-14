/**
 * useStreak Hook
 * Calculates and returns check-in streak data
 */

import { useMemo } from 'react';
import { parseISO } from 'date-fns';
import { calculateStreak, getRelativeTime } from '@/lib/utils/date-helpers';
import type { LogEntry } from '@/lib/types';

export interface StreakData {
  current: number;
  longest: number;
  lastCheckIn: Date | null;
  lastCheckInRelative: string | null;
  isActiveToday: boolean;
  daysUntilBreak: number;
}

/**
 * Calculate streak from log entries
 */
export function useStreak(entries: LogEntry[]): StreakData {
  return useMemo(() => {
    if (entries.length === 0) {
      return {
        current: 0,
        longest: 0,
        lastCheckIn: null,
        lastCheckInRelative: null,
        isActiveToday: false,
        daysUntilBreak: 0,
      };
    }

    // Extract dates and convert to Date objects
    const dates = entries.map((entry) => {
      if (entry.date instanceof Date) {
        return entry.date;
      }
      if (typeof entry.date === 'string') {
        return parseISO(entry.date);
      }
      // Handle Firestore Timestamp
      if (entry.date && typeof (entry.date as any).toDate === 'function') {
        return (entry.date as any).toDate();
      }
      return new Date();
    });

    // Calculate streaks
    const { current, longest } = calculateStreak(dates);

    // Get last check-in
    const sortedDates = [...dates].sort((a, b) => b.getTime() - a.getTime());
    const lastCheckIn = sortedDates[0];
    const lastCheckInRelative = getRelativeTime(lastCheckIn);

    // Check if checked in today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isActiveToday = sortedDates.some((date) => {
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      return checkDate.getTime() === today.getTime();
    });

    // Days until streak breaks (0 if already checked in today, 1 if not)
    const daysUntilBreak = isActiveToday ? 0 : 1;

    return {
      current,
      longest,
      lastCheckIn,
      lastCheckInRelative,
      isActiveToday,
      daysUntilBreak,
    };
  }, [entries]);
}
