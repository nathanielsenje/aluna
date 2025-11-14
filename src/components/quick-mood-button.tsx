"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { QUICK_MOOD_OPTIONS } from "@/lib/constants/context-options";
import { Smile } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickMoodButtonProps {
  onMoodSelected: (emoji: string, label: string) => void;
  currentMood?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Floating Quick Mood Button
 * Allows users to quickly capture their mood with an emoji before full check-in
 * Appears as a floating action button with emoji picker popover
 */
export function QuickMoodButton({
  onMoodSelected,
  currentMood,
  disabled = false,
  className,
}: QuickMoodButtonProps) {
  const [open, setOpen] = useState(false);

  const handleMoodSelect = (emoji: string, label: string) => {
    onMoodSelected(emoji, label);
    setOpen(false);
  };

  // Find current mood option for display
  const currentMoodOption = QUICK_MOOD_OPTIONS.find(
    (opt) => opt.emoji === currentMood
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={currentMood ? "default" : "outline"}
          size="lg"
          disabled={disabled}
          className={cn(
            "gap-2 shadow-lg transition-all hover:scale-105",
            currentMood && "animate-pulse",
            className
          )}
        >
          {currentMood ? (
            <>
              <span className="text-2xl">{currentMood}</span>
              <span className="text-sm font-medium">
                {currentMoodOption?.label || "Mood captured"}
              </span>
            </>
          ) : (
            <>
              <Smile className="h-5 w-5" />
              <span>Quick Mood</span>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4" align="center">
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">How are you feeling?</h3>
            <p className="text-sm text-muted-foreground">
              Quick capture before your full check-in
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {QUICK_MOOD_OPTIONS.map((mood) => (
              <button
                key={mood.value}
                onClick={() => handleMoodSelect(mood.emoji, mood.label)}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all hover:scale-105",
                  "hover:border-primary hover:bg-accent",
                  currentMood === mood.emoji &&
                    "border-primary bg-accent ring-2 ring-primary ring-offset-2",
                  mood.color.replace("bg-", "hover:bg-")
                )}
                title={mood.label}
              >
                <span className="text-3xl">{mood.emoji}</span>
                <span className="text-xs font-medium text-center leading-tight">
                  {mood.label}
                </span>
              </button>
            ))}
          </div>

          {currentMood && (
            <p className="text-xs text-center text-muted-foreground pt-2">
              ✓ Mood captured at {new Date().toLocaleTimeString()}
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/**
 * Mini Quick Mood Display
 * Shows captured mood in a compact format (for form preview)
 */
export function QuickMoodDisplay({
  emoji,
  label,
  timestamp,
}: {
  emoji: string;
  label: string;
  timestamp?: Date;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent border">
      <span className="text-lg">{emoji}</span>
      <span className="text-sm font-medium">{label}</span>
      {timestamp && (
        <span className="text-xs text-muted-foreground">
          {timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      )}
    </div>
  );
}
