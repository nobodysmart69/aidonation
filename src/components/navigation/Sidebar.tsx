import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LineChart, Banknote, ChevronLeft, ChevronRight } from "lucide-react";

export function Sidebar() {
  const [location] = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const items = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/"
    },
    {
      title: "Fund Distribution",
      icon: Banknote, 
      href: "/fund-distribution"
    },
    {
      title: "Analytics",
      icon: LineChart,
      href: "/analytics"
    }
  ];

  return (
    <div className={cn(
      "sticky top-0 h-screen border-r bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/80 p-4 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-2 z-50 rounded-full border bg-background"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className={cn(
        "flex items-center gap-2 mb-8",
        isCollapsed && "justify-center"
      )}>
        <img 
          src="/6ADAF987-1C3B-493F-9035-078E85DB2CF0.png"
          alt="Crisis Response Logo"
          className="h-8 w-8 rounded-full"
        />
        {!isCollapsed && (
          <h1 className="font-bold text-lg">Crisis Response</h1>
        )}
      </div>

      <nav className="space-y-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={location === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                location === item.href && "bg-secondary",
                isCollapsed && "justify-center"
              )}
            >
              <item.icon className="w-4 h-4" />
              {!isCollapsed && item.title}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}