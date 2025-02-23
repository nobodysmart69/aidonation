import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Crisis, Fund } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function FundDistribution() {
  const { toast } = useToast();
  const [selectedCrisis, setSelectedCrisis] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");

  const { data: crises } = useQuery<Crisis[]>({
    queryKey: ["/api/crises"],
  });

  const { data: funds } = useQuery<Fund[]>({
    queryKey: ["/api/funds"],
  });

  const createFund = useMutation({
    mutationFn: async (fund: { crisisId: number; amount: number; recipient: string }) => {
      await apiRequest("POST", "/api/funds", {
        ...fund,
        status: "pending"
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/funds"] });
      toast({
        title: "Fund Distribution Created",
        description: "The fund has been successfully allocated.",
      });
      setAmount("");
      setRecipient("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCrisis || !amount || !recipient) return;

    createFund.mutate({
      crisisId: parseInt(selectedCrisis),
      amount: parseInt(amount) * 100, // Convert to cents
      recipient
    });
  };

  const activeCrises = crises?.filter((c) => c.status === "active") || [];
  const totalDistributed = funds?.reduce((acc, f) => acc + f.amount, 0) || 0;

  return (
    <div className="p-8 space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total Funds Distributed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(totalDistributed / 100).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distribute Funds</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crisis">Crisis</Label>
              <Select
                value={selectedCrisis}
                onValueChange={setSelectedCrisis}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a crisis" />
                </SelectTrigger>
                <SelectContent>
                  {activeCrises.map((crisis) => (
                    <SelectItem key={crisis.id} value={crisis.id.toString()}>
                      {crisis.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Organization</Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient organization"
              />
            </div>

            <Button
              type="submit"
              disabled={createFund.isPending || !selectedCrisis || !amount || !recipient}
              className="w-full"
            >
              {createFund.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Distribute Funds
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
