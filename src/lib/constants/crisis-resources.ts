/**
 * Crisis Resources & Emergency Support
 * Always accessible emergency mental health resources
 */

export type CrisisResource = {
  id: string;
  name: string;
  description: string;
  phoneNumber?: string;
  textNumber?: string;
  website?: string;
  hours: string;
  languages?: string[];
  region: "us" | "international" | "global";
  category: "crisis" | "suicide" | "substance" | "domestic" | "lgbtq" | "youth" | "veterans" | "general";
};

export const CRISIS_RESOURCES: CrisisResource[] = [
  // US Crisis Resources
  {
    id: "988",
    name: "988 Suicide & Crisis Lifeline",
    description: "24/7 crisis support for anyone experiencing emotional distress or suicidal crisis",
    phoneNumber: "988",
    textNumber: "988",
    website: "https://988lifeline.org",
    hours: "24/7",
    languages: ["English", "Spanish", "200+ languages via translation"],
    region: "us",
    category: "crisis",
  },
  {
    id: "crisis_text_line",
    name: "Crisis Text Line",
    description: "Free 24/7 support for those in crisis. Text to connect with a trained counselor.",
    textNumber: "741741",
    website: "https://www.crisistextline.org",
    hours: "24/7",
    languages: ["English", "Spanish (text 'HOLA' to 741741)"],
    region: "us",
    category: "crisis",
  },
  {
    id: "samhsa",
    name: "SAMHSA National Helpline",
    description: "Treatment referral and information service for mental health and substance use",
    phoneNumber: "1-800-662-4357",
    website: "https://www.samhsa.gov/find-help/national-helpline",
    hours: "24/7",
    languages: ["English", "Spanish"],
    region: "us",
    category: "substance",
  },
  {
    id: "trevor_project",
    name: "The Trevor Project",
    description: "Crisis intervention and suicide prevention for LGBTQ+ young people",
    phoneNumber: "1-866-488-7386",
    textNumber: "START to 678-678",
    website: "https://www.thetrevorproject.org",
    hours: "24/7",
    languages: ["English"],
    region: "us",
    category: "lgbtq",
  },
  {
    id: "veterans_crisis",
    name: "Veterans Crisis Line",
    description: "Support for veterans, service members, and their families",
    phoneNumber: "988, then press 1",
    textNumber: "838255",
    website: "https://www.veteranscrisisline.net",
    hours: "24/7",
    languages: ["English"],
    region: "us",
    category: "veterans",
  },
  {
    id: "domestic_violence",
    name: "National Domestic Violence Hotline",
    description: "Support for those experiencing domestic violence, abuse, or stalking",
    phoneNumber: "1-800-799-7233",
    textNumber: "START to 88788",
    website: "https://www.thehotline.org",
    hours: "24/7",
    languages: ["English", "Spanish", "200+ languages"],
    region: "us",
    category: "domestic",
  },
  {
    id: "nami_helpline",
    name: "NAMI Helpline",
    description: "Information, resources, and referrals for mental health concerns",
    phoneNumber: "1-800-950-6264",
    textNumber: "NAMI to 741741",
    website: "https://www.nami.org/help",
    hours: "Monday-Friday, 10am-10pm ET",
    languages: ["English"],
    region: "us",
    category: "general",
  },

  // International Resources
  {
    id: "intl_assoc_suicide_prevention",
    name: "International Association for Suicide Prevention",
    description: "Directory of crisis centers worldwide",
    website: "https://www.iasp.info/resources/Crisis_Centres/",
    hours: "Varies by location",
    region: "international",
    category: "suicide",
  },
];

// ============================================================================
// GROUNDING TECHNIQUES
// ============================================================================

export type GroundingTechnique = {
  id: string;
  name: string;
  description: string;
  steps: string[];
  duration: string; // Estimated time
  difficulty: "easy" | "medium";
};

export const GROUNDING_TECHNIQUES: GroundingTechnique[] = [
  {
    id: "5-4-3-2-1",
    name: "5-4-3-2-1 Senses",
    description: "Use your five senses to ground yourself in the present moment",
    duration: "2-5 minutes",
    difficulty: "easy",
    steps: [
      "Name 5 things you can see around you",
      "Name 4 things you can touch or feel",
      "Name 3 things you can hear",
      "Name 2 things you can smell (or 2 favorite smells)",
      "Name 1 thing you can taste (or 1 favorite taste)",
    ],
  },
  {
    id: "box_breathing",
    name: "Box Breathing",
    description: "Calm your nervous system with controlled breathing",
    duration: "2-5 minutes",
    difficulty: "easy",
    steps: [
      "Breathe in for 4 counts",
      "Hold your breath for 4 counts",
      "Breathe out for 4 counts",
      "Hold empty for 4 counts",
      "Repeat 4-10 times",
    ],
  },
  {
    id: "body_scan",
    name: "Quick Body Scan",
    description: "Notice physical sensations without judgment",
    duration: "3-5 minutes",
    difficulty: "easy",
    steps: [
      "Sit or lie comfortably",
      "Notice sensations in your feet and toes",
      "Slowly move attention up through legs, torso, arms",
      "Notice your neck, head, and face",
      "Breathe into any areas of tension",
    ],
  },
  {
    id: "categories_game",
    name: "Categories Game",
    description: "Distract your mind by listing items in categories",
    duration: "2-5 minutes",
    difficulty: "easy",
    steps: [
      "Choose a category (colors, animals, countries, etc.)",
      "Name as many items in that category as you can",
      "Go through the alphabet if needed (A - Apple, B - Banana...)",
      "Switch categories when you're ready",
    ],
  },
  {
    id: "cold_water",
    name: "Cold Water Splash",
    description: "Use cold sensation to reset your nervous system",
    duration: "1-2 minutes",
    difficulty: "easy",
    steps: [
      "Splash cold water on your face",
      "Or hold ice cubes in your hands",
      "Or run cold water over your wrists",
      "Focus on the sensation of cold",
      "Breathe slowly as you do this",
    ],
  },
  {
    id: "safe_place_visualization",
    name: "Safe Place Visualization",
    description: "Imagine a place where you feel completely safe and calm",
    duration: "3-5 minutes",
    difficulty: "medium",
    steps: [
      "Close your eyes or soften your gaze",
      "Picture a place where you feel safe (real or imagined)",
      "Notice what you see, hear, smell, and feel there",
      "Imagine yourself there, feeling safe and calm",
      "Take a few deep breaths in this safe space",
    ],
  },
];

// ============================================================================
// BREATHING EXERCISES
// ============================================================================

export type BreathingExercise = {
  id: string;
  name: string;
  description: string;
  pattern: {
    inhale: number;
    hold1?: number;
    exhale: number;
    hold2?: number;
  };
  cycles: number;
  duration: string;
  benefits: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
};

export const BREATHING_EXERCISES: BreathingExercise[] = [
  {
    id: "box_breathing",
    name: "Box Breathing",
    description: "Also called square breathing. Used by Navy SEALs to stay calm under pressure.",
    pattern: { inhale: 4, hold1: 4, exhale: 4, hold2: 4 },
    cycles: 5,
    duration: "4 minutes",
    benefits: ["Reduces stress", "Improves focus", "Calms nervous system"],
    difficulty: "beginner",
  },
  {
    id: "4-7-8",
    name: "4-7-8 Breathing",
    description: "Dr. Andrew Weil's relaxing breath technique. Great for sleep.",
    pattern: { inhale: 4, hold1: 7, exhale: 8 },
    cycles: 4,
    duration: "2 minutes",
    benefits: ["Promotes sleep", "Reduces anxiety", "Lowers heart rate"],
    difficulty: "beginner",
  },
  {
    id: "calm_breathing",
    name: "Calm Breathing",
    description: "Simple slow breathing to activate relaxation response",
    pattern: { inhale: 4, exhale: 6 },
    cycles: 10,
    duration: "3 minutes",
    benefits: ["Easy to learn", "Quickly calms", "Can do anywhere"],
    difficulty: "beginner",
  },
  {
    id: "coherent_breathing",
    name: "Coherent Breathing",
    description: "Breathe at 5 breaths per minute for optimal heart-brain coherence",
    pattern: { inhale: 6, exhale: 6 },
    cycles: 10,
    duration: "5 minutes",
    benefits: ["Heart rate variability", "Emotional balance", "Mental clarity"],
    difficulty: "intermediate",
  },
  {
    id: "extended_exhale",
    name: "Extended Exhale",
    description: "Longer exhale activates parasympathetic nervous system",
    pattern: { inhale: 4, exhale: 8 },
    cycles: 8,
    duration: "4 minutes",
    benefits: ["Deep relaxation", "Stress relief", "Better sleep"],
    difficulty: "beginner",
  },
];

// ============================================================================
// AFFIRMATIONS & COPING STATEMENTS
// ============================================================================

export type CopingStatement = {
  category: "grounding" | "self_compassion" | "strength" | "safety" | "acceptance";
  statements: string[];
};

export const COPING_STATEMENTS: CopingStatement[] = [
  {
    category: "grounding",
    statements: [
      "I am here, right now, in this moment.",
      "This feeling will pass.",
      "I am safe right now.",
      "I can handle this one breath at a time.",
      "My body knows how to calm down.",
    ],
  },
  {
    category: "self_compassion",
    statements: [
      "I am doing the best I can.",
      "It's okay to feel what I'm feeling.",
      "I deserve kindness, especially from myself.",
      "I am enough, just as I am.",
      "Everyone struggles sometimes. I am not alone.",
    ],
  },
  {
    category: "strength",
    statements: [
      "I have survived difficult moments before.",
      "I am stronger than I think.",
      "I can take small steps.",
      "I have the resources I need.",
      "I am capable of getting through this.",
    ],
  },
  {
    category: "safety",
    statements: [
      "I am in a safe place.",
      "This feeling is temporary.",
      "I can reach out for help if I need to.",
      "I have support available to me.",
      "I can trust myself to know what I need.",
    ],
  },
  {
    category: "acceptance",
    statements: [
      "I accept what I cannot control.",
      "I can feel this and be okay.",
      "Discomfort is part of growth.",
      "I don't have to be perfect.",
      "I can let go of what no longer serves me.",
    ],
  },
];

// ============================================================================
// SAFETY PLAN TEMPLATE
// ============================================================================

export type SafetyPlanSection = {
  id: string;
  title: string;
  description: string;
  prompts: string[];
};

export const SAFETY_PLAN_TEMPLATE: SafetyPlanSection[] = [
  {
    id: "warning_signs",
    title: "Warning Signs",
    description: "Identify thoughts, feelings, or behaviors that indicate a crisis may be developing",
    prompts: [
      "What thoughts do I have when crisis is approaching?",
      "What feelings or emotions are warning signs for me?",
      "What behaviors indicate I'm struggling?",
    ],
  },
  {
    id: "coping_strategies",
    title: "Internal Coping Strategies",
    description: "Things you can do on your own to help yourself feel better",
    prompts: [
      "Activities that distract me (hobbies, exercise, etc.)",
      "Places I can go that are calming",
      "Things I can do to relax",
    ],
  },
  {
    id: "social_support",
    title: "People for Distraction & Support",
    description: "Friends or family who can provide distraction and support",
    prompts: [
      "Name and phone number",
      "When/how to contact them",
      "What they can help with",
    ],
  },
  {
    id: "professional_contacts",
    title: "Professional Contacts",
    description: "Mental health professionals and agencies to contact during crisis",
    prompts: [
      "Therapist name and number",
      "Local crisis center",
      "Hospital emergency department",
    ],
  },
  {
    id: "safe_environment",
    title: "Making Environment Safe",
    description: "Ways to reduce access to lethal means",
    prompts: [
      "Remove or secure items that could be harmful",
      "Who can help me with this?",
      "Where to store items safely",
    ],
  },
  {
    id: "reasons_to_live",
    title: "Reasons for Living",
    description: "What makes life worth living for me",
    prompts: [
      "People I care about",
      "Future goals and dreams",
      "Things that bring me joy",
    ],
  },
];

// ============================================================================
// EMERGENCY ACTION CATEGORIES
// ============================================================================

export type EmergencyAction = {
  level: "immediate" | "urgent" | "support";
  title: string;
  description: string;
  actions: string[];
  color: string; // Tailwind color class
};

export const EMERGENCY_ACTIONS: EmergencyAction[] = [
  {
    level: "immediate",
    title: "Immediate Danger",
    description: "If you or someone else is in immediate danger",
    color: "bg-red-600",
    actions: [
      "Call 911 or your local emergency number",
      "Go to the nearest emergency room",
      "Don't leave the person alone if possible",
      "Remove any means of self-harm",
    ],
  },
  {
    level: "urgent",
    title: "Crisis Support Needed",
    description: "If you're thinking of harming yourself or feeling hopeless",
    color: "bg-orange-600",
    actions: [
      "Call 988 (Suicide & Crisis Lifeline)",
      "Text 'HELLO' to 741741 (Crisis Text Line)",
      "Call your therapist or mental health provider",
      "Go to an urgent care or crisis center",
    ],
  },
  {
    level: "support",
    title: "Need Someone to Talk To",
    description: "If you're struggling but not in immediate danger",
    color: "bg-blue-600",
    actions: [
      "Reach out to a trusted friend or family member",
      "Use a grounding technique from this app",
      "Contact your therapist or counselor",
      "Call a warmline or support line (not crisis)",
    ],
  },
];
