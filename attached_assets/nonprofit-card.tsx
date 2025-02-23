import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ExternalLink } from "lucide-react";
import { type Nonprofit } from "@shared/schema";

interface NonprofitCardProps {
  nonprofit: Nonprofit;
}

export default function NonprofitCard({ nonprofit }: NonprofitCardProps) {
  // Randomly choose between Snailbrook.ai and thegivingblock.com
  const donationUrl = Math.random() < 0.5 
    ? "https://snailbrook.ai" 
    : "https://thegivingblock.com";

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={nonprofit.logoUrl}
            alt={nonprofit.name}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{nonprofit.name}</h3>
              {nonprofit.verified && (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {nonprofit.description}
            </p>
          </div>
        </div>

        <Button 
          onClick={() => window.open(donationUrl, '_blank')}
          className="w-full gap-2"
        >
          Donate via Crypto
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}