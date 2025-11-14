"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CRISIS_RESOURCES,
  GROUNDING_TECHNIQUES,
  BREATHING_EXERCISES,
  EMERGENCY_ACTIONS,
} from "@/lib/constants/crisis-resources";
import { Phone, MessageSquare, Globe, Clock } from "lucide-react";

interface EmergencyResourcesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Emergency Resources Modal
 * Displays crisis hotlines, grounding techniques, breathing exercises,
 * and emergency action steps
 */
export function EmergencyResourcesModal({
  open,
  onOpenChange,
}: EmergencyResourcesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <span className="text-red-600">⚠️</span> Emergency Resources &
            Support
          </DialogTitle>
          <DialogDescription>
            If you&apos;re in crisis or need immediate support, these resources are
            available 24/7
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="crisis" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="crisis">Crisis Lines</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="grounding">Grounding</TabsTrigger>
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
          </TabsList>

          {/* Crisis Lines Tab */}
          <TabsContent value="crisis" className="space-y-4">
            <div className="grid gap-4">
              {CRISIS_RESOURCES.filter((r) => r.region === "us").map(
                (resource) => (
                  <Card key={resource.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {resource.name}
                          </CardTitle>
                          <CardDescription>
                            {resource.description}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{resource.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {resource.phoneNumber && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={`tel:${resource.phoneNumber}`}
                            className="text-lg font-semibold text-primary hover:underline"
                          >
                            {resource.phoneNumber}
                          </a>
                        </div>
                      )}
                      {resource.textNumber && (
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Text{" "}
                            <span className="font-semibold">
                              {resource.textNumber}
                            </span>
                          </span>
                        </div>
                      )}
                      {resource.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={resource.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            Visit website
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {resource.hours}
                        </span>
                      </div>
                      {resource.languages && (
                        <p className="text-xs text-muted-foreground">
                          Languages: {resource.languages.join(", ")}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )
              )}
            </div>

            <Card className="bg-muted">
              <CardHeader>
                <CardTitle className="text-base">
                  International Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  For international crisis support, visit:{" "}
                  <a
                    href="https://www.iasp.info/resources/Crisis_Centres/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    International Association for Suicide Prevention
                  </a>
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Actions Tab */}
          <TabsContent value="emergency" className="space-y-4">
            <div className="space-y-4">
              {EMERGENCY_ACTIONS.map((action) => (
                <Card
                  key={action.level}
                  className={`border-l-4 ${
                    action.level === "immediate"
                      ? "border-l-red-600"
                      : action.level === "urgent"
                      ? "border-l-orange-600"
                      : "border-l-blue-600"
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Badge className={action.color}>{action.level}</Badge>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </div>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {action.actions.map((actionItem, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm">{actionItem}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator />

            <Card className="bg-yellow-50 dark:bg-yellow-950 border-yellow-600">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  ⚕️ When to Call 911
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>Call 911 or your local emergency number if:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>You or someone else is in immediate danger</li>
                  <li>Someone has seriously harmed themselves</li>
                  <li>Someone is unable to care for themselves</li>
                  <li>You believe someone&apos;s life is at risk</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grounding Techniques Tab */}
          <TabsContent value="grounding" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Grounding techniques help you reconnect with the present moment
              when feeling overwhelmed, anxious, or dissociated.
            </p>

            <div className="grid gap-4">
              {GROUNDING_TECHNIQUES.map((technique) => (
                <Card key={technique.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {technique.name}
                        </CardTitle>
                        <CardDescription>
                          {technique.description}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{technique.duration}</Badge>
                        <Badge
                          variant={
                            technique.difficulty === "easy"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {technique.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {technique.steps.map((step, idx) => (
                        <li key={idx} className="flex gap-3">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                            {idx + 1}
                          </span>
                          <span className="text-sm pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Breathing Exercises Tab */}
          <TabsContent value="breathing" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Controlled breathing exercises help calm your nervous system and
              reduce stress and anxiety.
            </p>

            <div className="grid gap-4">
              {BREATHING_EXERCISES.map((exercise) => (
                <Card key={exercise.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">
                          {exercise.name}
                        </CardTitle>
                        <CardDescription>
                          {exercise.description}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge variant="outline">{exercise.duration}</Badge>
                        <Badge variant="secondary">
                          {exercise.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-accent rounded-lg">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">
                          {exercise.pattern.inhale}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Inhale
                        </div>
                      </div>
                      {exercise.pattern.hold1 && (
                        <>
                          <span className="text-muted-foreground">→</span>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary">
                              {exercise.pattern.hold1}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Hold
                            </div>
                          </div>
                        </>
                      )}
                      <span className="text-muted-foreground">→</span>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">
                          {exercise.pattern.exhale}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Exhale
                        </div>
                      </div>
                      {exercise.pattern.hold2 && (
                        <>
                          <span className="text-muted-foreground">→</span>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary">
                              {exercise.pattern.hold2}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Hold
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Benefits:</p>
                      <ul className="space-y-1">
                        {exercise.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-muted-foreground flex items-center gap-2"
                          >
                            <span className="text-green-600">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full" variant="outline">
                      Start {exercise.cycles} Cycles
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Separator />

        <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
          <span className="text-2xl">💙</span>
          <div className="space-y-1">
            <p className="text-sm font-medium">You are not alone</p>
            <p className="text-sm text-muted-foreground">
              Reaching out for help is a sign of strength, not weakness. These
              resources are here to support you whenever you need them.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
