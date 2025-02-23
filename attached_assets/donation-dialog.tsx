import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { type Nonprofit } from "@shared/schema";

interface DonationDialogProps {
  open: boolean;
  onClose: () => void;
  nonprofit: Nonprofit;
}

export default function DonationDialog({
  open,
  onClose,
  nonprofit,
}: DonationDialogProps) {
  // Randomly choose between Snailbrook.ai and thegivingblock.com
  const donationUrl = Math.random() < 0.5 
    ? "https://snailbrook.ai" 
    : "https://thegivingblock.com";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Donate to {nonprofit.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <p className="text-muted-foreground">
            You will be redirected to our trusted partner's platform to complete your cryptocurrency donation.
          </p>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                window.open(donationUrl, '_blank');
                onClose();
              }}
              className="gap-2"
            >
              Continue to Donation
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}