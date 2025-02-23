import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, HelpCircle } from "lucide-react";
import { type Crisis } from "@shared/schema";
import { Link } from "wouter";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CrisisCardProps {
  crisis: Crisis;
}

export default function CrisisCard({ crisis }: CrisisCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="mb-2">Urgent Crisis Situation</Badge>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Crisis cards show active emergencies that need immediate support</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>

      <div className="relative h-48">
        <img
          src={crisis.imageUrl}
          alt={crisis.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant={crisis.severity >= 4 ? "destructive" : "secondary"}
                className="gap-1"
              >
                <AlertTriangle className="h-3 w-3" />
                Urgency Level: {crisis.severity}/5
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Higher numbers indicate more urgent situations</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-2">{crisis.title}</h3>
        <p className="text-muted-foreground text-sm mb-4">
          {crisis.description}
        </p>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Crisis Categories:</p>
          <div className="flex flex-wrap gap-2">
            {crisis.aiCategories.map((category) => (
              <Badge key={category} variant="outline">
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/50 p-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Location:</span>
            <span className="text-sm text-muted-foreground">{crisis.location}</span>
          </div>
          <Link href={`/crisis/${crisis.id}`}>
            <Button size="lg" className="gap-2">
              Support Now
              <span className="text-xs opacity-90">→</span>
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}