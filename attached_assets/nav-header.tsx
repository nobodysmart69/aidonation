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
    <header className="border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo section */}
          <div className="flex items-center">
            {/* Temporarily removing the image until we get the correct path */}
            <div className="h-8 w-8 bg-primary rounded-full" />
            {/* Text only visible on desktop */}
            <div className="ml-2 hidden md:flex md:flex-col">
              <h1 className="text-xl font-bold">Snailvation Snoldiers</h1>
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