import { useQuery } from "@tanstack/react-query";
import { Crisis, Nonprofit } from "@shared/schema";
import CrisisCard from "@/components/crises/CrisisCard";
import NonprofitCard from "@/components/nonprofits/NonprofitCard";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Activity, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const { data: crises, isLoading: crisesLoading, error: crisesError } = useQuery<Crisis[]>({
    queryKey: ["/api/crises"]
  });

  const { data: nonprofits, isLoading: nonprofitsLoading } = useQuery<Nonprofit[]>({
    queryKey: ["/api/nonprofits"]
  });

  if (crisesError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load crisis data</AlertDescription>
      </Alert>
    );
  }

  const activeCrises = crises?.filter((c) => c.status === "active") || [];
  const avgSeverity =
    activeCrises.reduce((acc, c) => acc + c.severity, 0) / (activeCrises.length || 1);

  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Crises</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCrises.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Severity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSeverity.toFixed(1)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Crisis Cards Section */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold">Active Crises</h2>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {crisesLoading ? (
              [...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-[400px]" />
              ))
            ) : (
              activeCrises.slice(0, 4).map((crisis) => (
                <CrisisCard key={crisis.id} crisis={crisis} />
              ))
            )}
          </div>
        </div>

        {/* Nonprofit Partners Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Nonprofit Partners</h2>
          <div className="space-y-4 sticky top-4">
            {nonprofitsLoading ? (
              [...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-[150px]" />
              ))
            ) : (
              nonprofits?.map((nonprofit) => (
                <NonprofitCard key={nonprofit.id} nonprofit={nonprofit} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}