import { addDays, subDays } from "date-fns";

export type Sensation = {
  id: string;
  location: string;
  intensity: number;
  notes: string;
};

export type LogEntry = {
  id: string;
  date: string;
  emotion: string;
  sensations: Sensation[];
  thoughts: string[];
};

export const bodyParts = [
  "Head",
  "Neck",
  "Shoulders",
  "Arms",
  "Hands",
  "Chest",
  "Stomach",
  "Back",
  "Hips",
  "Legs",
  "Feet",
  "Other",
];

export const emotions = [
  { name: "Joy", color: "hsl(48, 100%, 50%)" },
  { name: "Trust", color: "hsl(90, 60%, 55%)" },
  { name: "Fear", color: "hsl(255, 30%, 50%)" },
  { name: "Surprise", color: "hsl(180, 70%, 60%)" },
  { name: "Sadness", color: "hsl(210, 60%, 50%)" },
  { name: "Disgust", color: "hsl(75, 40%, 40%)" },
  { name: "Anger", color: "hsl(0, 80%, 60%)" },
  { name: "Anticipation", color: "hsl(30, 90%, 55%)" },
];

export const thoughtPatterns = [
  { id: "planning", label: "Planning or problem-solving" },
  { id: "worrying", label: "Worrying about the future" },
  { id: "ruminating", label: "Ruminating on the past" },
  { id: "self-critical", label: "Self-critical thoughts" },
  { id: "grateful", label: "Grateful or appreciative thoughts" },
  { id: "neutral", label: "Neutral or observational" },
  { id: "daydreaming", label: "Daydreaming or wandering" },
];

export const initialLogEntries: LogEntry[] = [
  {
    id: "1",
    date: subDays(new Date(), 7).toISOString(),
    emotion: "Sadness",
    sensations: [
      { id: "s1", location: "Chest", intensity: 7, notes: "Heaviness" },
    ],
    thoughts: ["ruminating"],
  },
  {
    id: "2",
    date: subDays(new Date(), 5).toISOString(),
    emotion: "Fear",
    sensations: [
      { id: "s2", location: "Stomach", intensity: 8, notes: "Butterflies" },
      { id: "s3", location: "Hands", intensity: 6, notes: "Sweaty palms" },
    ],
    thoughts: ["worrying"],
  },
  {
    id: "3",
    date: subDays(new Date(), 4).toISOString(),
    emotion: "Joy",
    sensations: [
      { id: "s4", location: "Chest", intensity: 4, notes: "Warmth and lightness" },
    ],
    thoughts: ["grateful"],
  },
  {
    id: "4",
    date: subDays(new Date(), 2).toISOString(),
    emotion: "Anticipation",
    sensations: [
       { id: "s5", location: "Stomach", intensity: 5, notes: "Excited jitters" },
    ],
    thoughts: ["planning", "daydreaming"],
  },
  {
    id: "5",
    date: subDays(new Date(), 1).toISOString(),
    emotion: "Anger",
    sensations: [
       { id: "s6", location: "Head", intensity: 6, notes: "Tension headache" },
       { id: "s7", location: "Shoulders", intensity: 7, notes: "Tightness" },
    ],
    thoughts: ["self-critical", "ruminating"],
  },
];
