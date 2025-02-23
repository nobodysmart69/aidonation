import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function NavHeader() {
  return (
    <header className="border-b border-border/40 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo section */}
          <div className="flex items-center">
            <img 
              src="/6ADAF987-1C3B-493F-9035-078E85DB2CF0.png"
              alt="Crisis Response Logo"
              className="h-8 w-8 rounded-full"
            />
            {/* Text only visible on desktop */}
            <div className="ml-2 hidden md:flex md:flex-col">
              <h1 className="text-xl font-bold text-foreground">Crisis Response</h1>
              <p className="text-sm text-muted-foreground">
                Guess Who's Beating You to the Rescue? A Snail.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/fund-distribution">
              <Button variant="ghost">Fund Distribution</Button>
            </Link>
            <Link href="/analytics">
              <Button variant="ghost">Analytics</Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="flex flex-col gap-4 p-6">
                  <Link href="/">
                    <Button variant="ghost" className="w-full justify-start">
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/fund-distribution">
                    <Button variant="ghost" className="w-full justify-start">
                      Fund Distribution
                    </Button>
                  </Link>
                  <Link href="/analytics">
                    <Button variant="ghost" className="w-full justify-start">
                      Analytics
                    </Button>
                  </Link>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </nav>
      </div>
    </header>
  );
}