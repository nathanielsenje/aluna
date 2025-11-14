/**
 * Comprehensive TypeScript type definitions for Aluna Wellness App
 * Supports Phases 1-3 feature expansion with backward compatibility
 */

import { Timestamp } from 'firebase/firestore';

// ============================================================================
// PHASE 1: Enhanced LogEntry with Context & Journaling
// ============================================================================

export type ContextTags = {
  location?: string; // "home" | "work" | "outdoors" | "transit" | "social" | "other"
  activity?: string[]; // Multiple activities can be selected
  triggers?: string[]; // Multiple triggers can be identified
  people?: string; // "alone" | "with_partner" | "with_family" | "with_friends" | "with_strangers" | "in_group"
  timeOfDay?: string; // Auto-captured but can be overridden
};

export type Sensation = {
  id: string;
  location: string; // Body part name
  intensity: number; // 0-10 scale
  notes: string; // Optional descriptive text
  // PHASE 2: Body map coordinates
  bodyMapX?: number; // SVG X coordinate
  bodyMapY?: number; // SVG Y coordinate
};

export type MedicationLog = {
  medicationName: string;
  dosage: string;
  timeTaken: Timestamp;
  notes?: string;
};

export type SleepLog = {
  bedTime?: Timestamp;
  wakeTime?: Timestamp;
  hoursSlept?: number;
  quality?: number; // 1-5 scale
  notes?: string;
};

export type LogEntry = {
  // Existing core fields
  id: string;
  userId: string;
  date: Timestamp; // Firestore timestamp
  emotion: string; // Level 2 emotion (e.g., "Joyful", "Anxious")
  specificEmotions: string[]; // Level 3 emotions array
  sensations: Sensation[];
  thoughts: string[]; // Thought pattern IDs

  // PHASE 1: Context & Journaling
  quickMoodEmoji?: string; // Pre-check-in emoji (😊😐😢😰😡)
  quickMoodTimestamp?: Timestamp;
  contextTags?: ContextTags;
  journalEntry?: string; // Free-form text (500-2000 chars recommended)

  // PHASE 2: Attachments & Goals
  voiceNoteUrl?: string; // Firebase Storage URL
  voiceNoteDuration?: number; // Duration in seconds
  photoUrls?: string[]; // Array of Firebase Storage URLs
  relatedGoalIds?: string[]; // References to Goal documents

  // PHASE 3: Advanced tracking
  medicationsTaken?: MedicationLog[];
  sleepData?: SleepLog;

  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  version: number; // For migration tracking (starts at 1)
};

// ============================================================================
// PHASE 2: Goals & Milestones
// ============================================================================

export type Milestone = {
  id: string;
  title: string;
  dueDate?: Timestamp;
  completed: boolean;
  completedAt?: Timestamp;
};

export type Goal = {
  id: string;
  userId: string;
  title: string;
  description: string;
  category: "mood" | "physical" | "social" | "sleep" | "custom";
  targetMetric?: string; // e.g., "check-ins per week", "intensity below 5", "7-day streak"
  targetValue?: number;
  currentValue?: number;
  startDate: Timestamp;
  endDate?: Timestamp;
  status: "active" | "completed" | "archived";
  progress: number; // 0-100 percentage
  milestones: Milestone[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// ============================================================================
// PHASE 2: AI-Generated Insights
// ============================================================================

export type InsightType =
  | "weekly_summary"
  | "pattern"
  | "correlation"
  | "prediction"
  | "recommendation"
  | "trigger_identification"
  | "early_warning";

export type Insight = {
  id: string;
  userId: string;
  type: InsightType;
  title: string;
  content: string; // Markdown formatted
  summary?: string; // Short summary for cards
  generatedAt: Timestamp;
  weekStartDate?: Timestamp; // For weekly summaries
  weekEndDate?: Timestamp;
  confidence?: number; // 0-1 for predictions (1 = 100% confident)
  relatedLogIds?: string[]; // IDs of LogEntries this insight is based on
  dismissed: boolean;
  dismissedAt?: Timestamp;
  helpful?: boolean; // User feedback: was this helpful?
  helpfulFeedbackAt?: Timestamp;
};

// ============================================================================
// PHASE 2: Therapist Sharing & Reports
// ============================================================================

export type TherapistAccess = {
  id: string;
  userId: string;
  therapistEmail: string;
  therapistName?: string;
  accessCode: string; // Unique code for therapist to access portal
  accessLevel: "view_only"; // Future: could add "comment" level
  grantedAt: Timestamp;
  expiresAt?: Timestamp;
  status: "pending" | "active" | "revoked" | "expired";
  lastAccessedAt?: Timestamp;
  accessCount: number; // Track how many times therapist viewed data
};

export type SharedReport = {
  id: string;
  userId: string;
  therapistAccessId?: string; // Optional: linked to specific therapist
  generatedAt: Timestamp;
  dateRange: {
    start: Timestamp;
    end: Timestamp;
  };
  pdfUrl: string; // Firebase Storage URL
  reportType: "wellness_summary" | "emotion_analysis" | "custom";
  expiresAt?: Timestamp; // Auto-delete after expiration
  downloadCount: number;
};

// ============================================================================
// GAMIFICATION: User Profile & Achievements
// ============================================================================

export type BadgeCategory = "streak" | "milestone" | "exploration" | "consistency" | "special";

export type Badge = {
  id: string;
  name: string;
  description: string;
  iconName: string; // Lucide icon name or emoji
  category: BadgeCategory;
  unlockedAt: Timestamp;
  rarity?: "common" | "rare" | "epic" | "legendary";
};

export type NotificationPreferences = {
  dailyReminder: boolean;
  dailyReminderTime?: string; // "HH:MM" format (24-hour)
  weeklyInsights: boolean;
  goalReminders: boolean;
  motivationalMessages: boolean;
  streakReminders: boolean; // Remind before streak breaks
  pushNotificationsEnabled: boolean;
};

export type PrivacySettings = {
  shareAnonymousData: boolean;
  allowTherapistAccess: boolean;
  shareProgressWithCommunity: boolean; // For future community features
};

export type UserProfile = {
  userId: string;
  displayName: string;
  email: string;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;

  // Gamification
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  badges: Badge[];
  level: number;
  experiencePoints: number;

  // Preferences
  notificationPreferences: NotificationPreferences;
  privacySettings: PrivacySettings;

  // Feature flags (for gradual rollout)
  betaFeatures?: {
    voiceNotes?: boolean;
    aiInsights?: boolean;
    correlationAnalysis?: boolean;
  };
};

// ============================================================================
// ANALYTICS & STATISTICS
// ============================================================================

export type EmotionFrequency = {
  emotion: string; // Level 1 or Level 2 emotion name
  count: number;
  percentage: number; // Of total check-ins
  trend?: "increasing" | "decreasing" | "stable"; // Compared to previous period
};

export type SensationHeatmapData = {
  location: string;
  averageIntensity: number;
  count: number;
  coordinates?: { x: number; y: number }; // For body map visualization
};

export type CorrelationData = {
  emotion: string;
  sensation: string;
  correlationScore: number; // -1 to 1 (Pearson correlation)
  cooccurrenceCount: number;
  significanceLevel?: number; // p-value
};

export type TriggerAnalysis = {
  trigger: string;
  emotionCounts: Record<string, number>; // { "Anxious": 5, "Sad": 3, ... }
  totalOccurrences: number;
  percentageOfCheckIns: number;
};

export type TimePatternData = {
  timeOfDay: string; // "morning" | "afternoon" | "evening" | "night"
  dayOfWeek: string; // "Monday" | "Tuesday" | ...
  dominantEmotion: string;
  averageIntensity: number;
  checkInCount: number;
};

// ============================================================================
// PREDICTION & FORECASTING
// ============================================================================

export type MoodForecast = {
  date: Timestamp;
  predictedEmotion: string; // Level 1 or Level 2
  confidence: number; // 0-1
  factors: string[]; // ["Similar time patterns", "Recent stress triggers", ...]
  recommendation?: string;
};

export type EarlyWarning = {
  id: string;
  userId: string;
  detectedAt: Timestamp;
  warningType: "intensity_spike" | "negative_pattern" | "missed_checkins" | "concerning_thoughts";
  severity: "low" | "medium" | "high";
  message: string;
  actionableSteps: string[];
  acknowledged: boolean;
  acknowledgedAt?: Timestamp;
};

// ============================================================================
// COPING TOOLS
// ============================================================================

export type BreathingPattern = {
  id: string;
  name: string; // "Box Breathing", "4-7-8", "Calm Breathing"
  description: string;
  phases: {
    inhale: number; // seconds
    hold1?: number; // optional first hold
    exhale: number;
    hold2?: number; // optional second hold
  };
  duration: number; // total minutes
  difficulty: "beginner" | "intermediate" | "advanced";
};

export type CopingTool = {
  id: string;
  type: "breathing" | "grounding" | "journaling_prompt" | "affirmation" | "resource";
  name: string;
  description: string;
  instructions?: string[];
  effectiveness?: number; // User-rated 1-5
  timesUsed: number;
};

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type DateRange = {
  start: Timestamp;
  end: Timestamp;
};

export type ChartDataPoint = {
  date: string; // ISO string or formatted date
  value: number;
  label?: string;
  emotion?: string;
  color?: string;
};

export type HeatmapCell = {
  day: number; // 0-6 (Sunday-Saturday)
  hour: number; // 0-23
  value: number; // Intensity or count
  emotion?: string;
};

// ============================================================================
// MIGRATION TYPES
// ============================================================================

export type MigrationStatus = {
  version: number;
  migratedAt: Timestamp;
  migrationType: "lazy" | "batch";
  success: boolean;
  errors?: string[];
};

// ============================================================================
// FORM VALIDATION SCHEMAS (for use with Zod)
// ============================================================================

export type QuickMoodOption = "😊" | "😐" | "😢" | "😰" | "😡" | "🤯" | "😴" | "😌";

export type LocationOption = "home" | "work" | "outdoors" | "transit" | "social" | "gym" | "healthcare" | "other";

export type PeopleOption = "alone" | "with_partner" | "with_family" | "with_friends" | "with_strangers" | "in_group";

// ============================================================================
// API Response Types
// ============================================================================

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
};

export type PaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

// ============================================================================
// BACKWARDS COMPATIBILITY
// ============================================================================

/**
 * Legacy LogEntry type (v1) - kept for reference and migration
 * Do not use in new code - use LogEntry instead
 */
export type LegacyLogEntry = {
  id: string;
  date: string; // ISO timestamp string (old format)
  emotion: string;
  specificEmotions: string[];
  sensations: Sensation[];
  thoughts: string[];
};

/**
 * Type guard to check if an entry is legacy format
 */
export function isLegacyLogEntry(entry: any): entry is LegacyLogEntry {
  return (
    typeof entry.date === 'string' &&
    !entry.version &&
    !entry.createdAt
  );
}

/**
 * Type guard to check if an entry has been migrated
 */
export function isMigratedLogEntry(entry: any): entry is LogEntry {
  return entry.version && entry.version >= 1;
}
