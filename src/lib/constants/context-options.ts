/**
 * Context Tags Options for Check-in Step 4
 * Predefined categories for location, activity, triggers, and people
 */

// ============================================================================
// LOCATION OPTIONS
// ============================================================================

export type LocationOption = {
  id: string;
  label: string;
  emoji: string;
  description?: string;
};

export const LOCATION_OPTIONS: LocationOption[] = [
  { id: "home", label: "Home", emoji: "🏠", description: "Your residence or living space" },
  { id: "work", label: "Work", emoji: "💼", description: "Office, workplace, or work-related location" },
  { id: "outdoors", label: "Outdoors", emoji: "🌳", description: "Park, nature, or outdoor environment" },
  { id: "transit", label: "In Transit", emoji: "🚗", description: "Commuting, traveling, or in vehicle" },
  { id: "social", label: "Social Venue", emoji: "🎉", description: "Restaurant, cafe, event, or social gathering" },
  { id: "gym", label: "Gym/Fitness", emoji: "🏋️", description: "Gym, studio, or fitness facility" },
  { id: "healthcare", label: "Healthcare", emoji: "🏥", description: "Hospital, clinic, or healthcare setting" },
  { id: "school", label: "School/Education", emoji: "🎓", description: "School, university, or educational institution" },
  { id: "shopping", label: "Shopping", emoji: "🛒", description: "Store, mall, or shopping area" },
  { id: "other", label: "Other", emoji: "📍", description: "Other location not listed" },
];

// ============================================================================
// ACTIVITY OPTIONS
// ============================================================================

export type ActivityOption = {
  id: string;
  label: string;
  emoji: string;
  category: "physical" | "mental" | "social" | "rest" | "work" | "personal";
};

export const ACTIVITY_OPTIONS: ActivityOption[] = [
  // Physical Activities
  { id: "exercising", label: "Exercising", emoji: "🏃", category: "physical" },
  { id: "walking", label: "Walking", emoji: "🚶", category: "physical" },
  { id: "sports", label: "Playing Sports", emoji: "⚽", category: "physical" },
  { id: "yoga", label: "Yoga/Stretching", emoji: "🧘", category: "physical" },
  { id: "dancing", label: "Dancing", emoji: "💃", category: "physical" },

  // Mental Activities
  { id: "working", label: "Working", emoji: "💻", category: "work" },
  { id: "studying", label: "Studying", emoji: "📚", category: "mental" },
  { id: "reading", label: "Reading", emoji: "📖", category: "mental" },
  { id: "problem_solving", label: "Problem Solving", emoji: "🧩", category: "mental" },
  { id: "planning", label: "Planning/Organizing", emoji: "📝", category: "mental" },
  { id: "creating", label: "Creating/Making", emoji: "🎨", category: "mental" },
  { id: "learning", label: "Learning", emoji: "🎓", category: "mental" },

  // Social Activities
  { id: "socializing", label: "Socializing", emoji: "👥", category: "social" },
  { id: "meeting", label: "In a Meeting", emoji: "🤝", category: "social" },
  { id: "helping_others", label: "Helping Others", emoji: "🤲", category: "social" },
  { id: "celebrating", label: "Celebrating", emoji: "🎉", category: "social" },
  { id: "dating", label: "Dating/Romance", emoji: "❤️", category: "social" },

  // Rest & Self-Care
  { id: "resting", label: "Resting", emoji: "😴", category: "rest" },
  { id: "sleeping", label: "Sleeping/Napping", emoji: "🛏️", category: "rest" },
  { id: "meditating", label: "Meditating", emoji: "🧘‍♀️", category: "rest" },
  { id: "relaxing", label: "Relaxing", emoji: "😌", category: "rest" },
  { id: "self_care", label: "Self-Care", emoji: "🛁", category: "rest" },

  // Personal Activities
  { id: "eating", label: "Eating", emoji: "🍽️", category: "personal" },
  { id: "cooking", label: "Cooking", emoji: "👨‍🍳", category: "personal" },
  { id: "cleaning", label: "Cleaning/Chores", emoji: "🧹", category: "personal" },
  { id: "grooming", label: "Grooming/Getting Ready", emoji: "💇", category: "personal" },
  { id: "shopping_activity", label: "Shopping", emoji: "🛍️", category: "personal" },
  { id: "commuting", label: "Commuting", emoji: "🚌", category: "personal" },

  // Entertainment & Leisure
  { id: "watching_tv", label: "Watching TV/Movies", emoji: "📺", category: "rest" },
  { id: "gaming", label: "Gaming", emoji: "🎮", category: "rest" },
  { id: "listening_music", label: "Listening to Music", emoji: "🎵", category: "rest" },
  { id: "browsing_internet", label: "Browsing Internet", emoji: "🌐", category: "rest" },
  { id: "social_media", label: "Using Social Media", emoji: "📱", category: "rest" },

  // Nature & Animals
  { id: "nature", label: "In Nature", emoji: "🌲", category: "rest" },
  { id: "with_pets", label: "With Pets/Animals", emoji: "🐕", category: "rest" },

  // Spiritual/Meaningful
  { id: "praying", label: "Praying/Worship", emoji: "🙏", category: "rest" },
  { id: "journaling", label: "Journaling", emoji: "📔", category: "mental" },
  { id: "therapy", label: "In Therapy/Counseling", emoji: "🗣️", category: "mental" },
];

// ============================================================================
// TRIGGER OPTIONS
// ============================================================================

export type TriggerOption = {
  id: string;
  label: string;
  emoji: string;
  valence: "negative" | "positive" | "neutral";
};

export const TRIGGER_OPTIONS: TriggerOption[] = [
  // Negative Triggers
  { id: "conflict", label: "Conflict/Argument", emoji: "💢", valence: "negative" },
  { id: "deadline", label: "Deadline/Time Pressure", emoji: "⏰", valence: "negative" },
  { id: "criticism", label: "Criticism/Rejection", emoji: "👎", valence: "negative" },
  { id: "loss", label: "Loss/Grief", emoji: "💔", valence: "negative" },
  { id: "physical_pain", label: "Physical Pain/Illness", emoji: "🤕", valence: "negative" },
  { id: "bad_news", label: "Bad News", emoji: "📰", valence: "negative" },
  { id: "social_media_negative", label: "Negative Social Media", emoji: "📱", valence: "negative" },
  { id: "financial_stress", label: "Financial Stress", emoji: "💸", valence: "negative" },
  { id: "work_stress", label: "Work Stress", emoji: "💼", valence: "negative" },
  { id: "relationship_issue", label: "Relationship Issue", emoji: "💔", valence: "negative" },
  { id: "loneliness", label: "Feeling Lonely", emoji: "😔", valence: "negative" },
  { id: "overwhelm", label: "Feeling Overwhelmed", emoji: "😵", valence: "negative" },
  { id: "injustice", label: "Injustice/Unfairness", emoji: "⚖️", valence: "negative" },
  { id: "disappointing_self", label: "Disappointed in Self", emoji: "😞", valence: "negative" },
  { id: "missing_someone", label: "Missing Someone", emoji: "💭", valence: "negative" },
  { id: "comparison", label: "Comparing to Others", emoji: "👀", valence: "negative" },
  { id: "uncertainty", label: "Uncertainty/Unknown", emoji: "❓", valence: "negative" },

  // Positive Triggers
  { id: "accomplishment", label: "Accomplishment/Success", emoji: "🎯", valence: "positive" },
  { id: "good_news", label: "Good News", emoji: "📬", valence: "positive" },
  { id: "connection", label: "Meaningful Connection", emoji: "🤗", valence: "positive" },
  { id: "compliment", label: "Compliment/Praise", emoji: "👏", valence: "positive" },
  { id: "help_received", label: "Received Help/Support", emoji: "🫂", valence: "positive" },
  { id: "beautiful_moment", label: "Beautiful/Awe Moment", emoji: "✨", valence: "positive" },
  { id: "creative_inspiration", label: "Creative Inspiration", emoji: "💡", valence: "positive" },
  { id: "physical_relief", label: "Physical Relief", emoji: "😌", valence: "positive" },
  { id: "surprise_positive", label: "Pleasant Surprise", emoji: "🎁", valence: "positive" },
  { id: "progress", label: "Seeing Progress", emoji: "📈", valence: "positive" },

  // Neutral Triggers
  { id: "routine", label: "Daily Routine", emoji: "📅", valence: "neutral" },
  { id: "weather", label: "Weather Change", emoji: "🌤️", valence: "neutral" },
  { id: "hunger", label: "Hunger/Thirst", emoji: "🍔", valence: "neutral" },
  { id: "tiredness", label: "Tiredness/Fatigue", emoji: "😪", valence: "neutral" },
  { id: "hormones", label: "Hormonal Changes", emoji: "🔄", valence: "neutral" },
  { id: "medication", label: "Medication Effects", emoji: "💊", valence: "neutral" },
  { id: "caffeine", label: "Caffeine/Substances", emoji: "☕", valence: "neutral" },
  { id: "noise", label: "Noise/Sensory Input", emoji: "🔊", valence: "neutral" },
  { id: "transition", label: "Life Transition", emoji: "🚪", valence: "neutral" },
  { id: "nothing_specific", label: "Nothing Specific", emoji: "🤷", valence: "neutral" },
  { id: "unknown_trigger", label: "Don't Know", emoji: "❔", valence: "neutral" },
];

// ============================================================================
// PEOPLE/SOCIAL CONTEXT OPTIONS
// ============================================================================

export type PeopleOption = {
  id: string;
  label: string;
  emoji: string;
};

export const PEOPLE_OPTIONS: PeopleOption[] = [
  { id: "alone", label: "Alone", emoji: "🧍" },
  { id: "with_partner", label: "With Partner/Spouse", emoji: "💑" },
  { id: "with_family", label: "With Family", emoji: "👨‍👩‍👧‍👦" },
  { id: "with_friends", label: "With Friends", emoji: "👯" },
  { id: "with_colleagues", label: "With Colleagues", emoji: "👔" },
  { id: "with_strangers", label: "With Strangers", emoji: "👥" },
  { id: "in_group", label: "In a Group", emoji: "👥" },
  { id: "with_pets", label: "With Pets", emoji: "🐾" },
  { id: "virtual", label: "Virtual/Online", emoji: "💻" },
];

// ============================================================================
// TIME OF DAY OPTIONS (auto-detected but can override)
// ============================================================================

export type TimeOfDayOption = {
  id: string;
  label: string;
  emoji: string;
  hours: [number, number]; // 24-hour range [start, end)
};

export const TIME_OF_DAY_OPTIONS: TimeOfDayOption[] = [
  { id: "early_morning", label: "Early Morning", emoji: "🌅", hours: [5, 8] },
  { id: "morning", label: "Morning", emoji: "☀️", hours: [8, 12] },
  { id: "afternoon", label: "Afternoon", emoji: "🌤️", hours: [12, 17] },
  { id: "evening", label: "Evening", emoji: "🌆", hours: [17, 21] },
  { id: "night", label: "Night", emoji: "🌙", hours: [21, 24] },
  { id: "late_night", label: "Late Night", emoji: "🌃", hours: [0, 5] },
];

// ============================================================================
// QUICK MOOD EMOJI OPTIONS
// ============================================================================

export type QuickMoodOption = {
  emoji: string;
  label: string;
  color: string; // Tailwind color class
  value: string; // For storage
};

export const QUICK_MOOD_OPTIONS: QuickMoodOption[] = [
  { emoji: "😊", label: "Happy", color: "bg-yellow-400", value: "happy" },
  { emoji: "😐", label: "Neutral", color: "bg-gray-400", value: "neutral" },
  { emoji: "😢", label: "Sad", color: "bg-blue-400", value: "sad" },
  { emoji: "😰", label: "Anxious", color: "bg-purple-400", value: "anxious" },
  { emoji: "😡", label: "Angry", color: "bg-red-400", value: "angry" },
  { emoji: "🤯", label: "Overwhelmed", color: "bg-orange-400", value: "overwhelmed" },
  { emoji: "😴", label: "Tired", color: "bg-indigo-400", value: "tired" },
  { emoji: "😌", label: "Calm", color: "bg-green-400", value: "calm" },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get time of day based on hour (0-23)
 */
export function getTimeOfDay(hour: number): string {
  const option = TIME_OF_DAY_OPTIONS.find(
    (opt) => hour >= opt.hours[0] && hour < opt.hours[1]
  );
  return option?.id || "unknown";
}

/**
 * Get time of day emoji based on hour
 */
export function getTimeOfDayEmoji(hour: number): string {
  const option = TIME_OF_DAY_OPTIONS.find(
    (opt) => hour >= opt.hours[0] && hour < opt.hours[1]
  );
  return option?.emoji || "🕐";
}

/**
 * Auto-detect time of day from current time
 */
export function getCurrentTimeOfDay(): string {
  const hour = new Date().getHours();
  return getTimeOfDay(hour);
}

/**
 * Get activity options by category
 */
export function getActivitiesByCategory(category: ActivityOption["category"]): ActivityOption[] {
  return ACTIVITY_OPTIONS.filter((activity) => activity.category === category);
}

/**
 * Get trigger options by valence
 */
export function getTriggersByValence(valence: TriggerOption["valence"]): TriggerOption[] {
  return TRIGGER_OPTIONS.filter((trigger) => trigger.valence === valence);
}

/**
 * Search activities by label
 */
export function searchActivities(query: string): ActivityOption[] {
  const lowerQuery = query.toLowerCase();
  return ACTIVITY_OPTIONS.filter((activity) =>
    activity.label.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Search triggers by label
 */
export function searchTriggers(query: string): TriggerOption[] {
  const lowerQuery = query.toLowerCase();
  return TRIGGER_OPTIONS.filter((trigger) =>
    trigger.label.toLowerCase().includes(lowerQuery)
  );
}
