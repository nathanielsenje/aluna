import Image from "next/image";
import { WellnessCharts } from "./wellness-charts";
import { Card } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function DashboardPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'dashboard-hero');

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <Card className="relative w-full h-48 md:h-64 overflow-hidden rounded-xl">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Your Wellness Dashboard</h1>
          <p className="mt-2 text-lg text-white/80 max-w-2xl">
            Visualize your emotional and physical well-being over time.
          </p>
        </div>
      </Card>
      <WellnessCharts />
    </div>
  );
}
