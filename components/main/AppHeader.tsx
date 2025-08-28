"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function AppHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b flex items-center justify-between px-4 py-2">
      {/* Left: Mobile Sidebar Trigger */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64 p-4">
            {/* You can reuse your Sidebar component here */}
            <div>Sidebar content here...</div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Center: Heading (currently empty) */}
      <h1 className="text-lg font-semibold flex-1 text-center">
        {/* Empty for now */}
      </h1>

      {/* Right: Profile / Actions (example placeholder) */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          Login
        </Button>
      </div>
    </header>
  );
}
