import { useQuery } from "@tanstack/react-query";
import CrisisCard from "./crisis-card";
import { type Crisis } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function CrisisFeed() {
  const { data: crises, isLoading } = useQuery<Crisis[]>({
    queryKey: ["/api/crises"],
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[400px]" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {crises?.map((crisis) => (
        <CrisisCard key={crisis.id} crisis={crisis} />
      ))}
    </div>
  );
}
