import { useQuery } from "@tanstack/react-query";
import { Crisis, Fund } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const { data: crises } = useQuery<Crisis[]>({
    queryKey: ["/api/crises"],
  });

  const { data: funds } = useQuery<Fund[]>({
    queryKey: ["/api/funds"],
  });

  const severityData = crises?.reduce((acc, crisis) => {
    const severity = crisis.severity;
    acc[severity] = (acc[severity] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const severityChartData = Object.entries(severityData || {}).map(([severity, count]) => ({
    severity: `Level ${severity}`,
    count,
  }));

  const fundsByCrisis = crises?.map((crisis) => {
    const crisisFunds = funds?.filter((f) => f.crisisId === crisis.id) || [];
    const totalAmount = crisisFunds.reduce((acc, f) => acc + f.amount, 0) / 100;
    return {
      name: crisis.title.length > 20 ? crisis.title.slice(0, 20) + "..." : crisis.title,
      amount: totalAmount,
    };
  });

  return (
    <div className="p-8 space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Crisis Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={severityChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="severity" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funds Distribution by Crisis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fundsByCrisis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
