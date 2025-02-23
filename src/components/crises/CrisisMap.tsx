import { Card } from "@/components/ui/card";
import { Crisis } from "@shared/schema";

interface CrisisMapProps {
  crises: Crisis[];
}

export function CrisisMap({ crises }: CrisisMapProps) {
  return (
    <Card className="p-4 h-[400px] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* World map SVG background */}
        <svg viewBox="0 0 1024 512" className="w-full h-full">
          <path
            d="M217.6 384h-45.3l-32-168.6L108.8 384H63.5L16 192h44.8l22.4 169.6 32-169.6h44.8l32 169.6L214.4 192h44.8l-47.5 192zm208 0h-44.8l-32-168.6L316.8 384h-45.3l-47.5-192h44.8l22.4 169.6 32-169.6h44.8l32 169.6L422.4 192h44.8l-47.5 192zm208 0h-44.8l-32-168.6L524.8 384h-45.3l-47.5-192h44.8l22.4 169.6 32-169.6h44.8l32 169.6L630.4 192h44.8l-47.5 192zm208 0h-44.8l-32-168.6L732.8 384h-45.3l-47.5-192h44.8l22.4 169.6 32-169.6h44.8l32 169.6L838.4 192h44.8l-47.5 192z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Crisis markers */}
      {crises.map((crisis) => (
        <div
          key={crisis.id}
          className="absolute w-4 h-4 rounded-full animate-pulse"
          style={{
            backgroundColor: crisis.severity >= 4 ? "red" : "orange",
            left: `${Math.random() * 80 + 10}%`,
            top: `${Math.random() * 80 + 10}%`
          }}
        />
      ))}
    </Card>
  );
}
