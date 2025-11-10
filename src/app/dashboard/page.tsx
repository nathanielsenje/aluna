
import { RecentCheckIns } from "./recent-check-ins";
import { StatCards } from "./stat-cards";
import { WellnessCharts } from "./wellness-charts";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <StatCards />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <WellnessCharts />
        </div>
        <div className="lg:col-span-3">
          <RecentCheckIns />
        </div>
      </div>
    </div>
  );
}
