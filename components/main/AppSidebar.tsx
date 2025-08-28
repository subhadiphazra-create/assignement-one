"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu, GraduationCap } from "lucide-react";

export default function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <aside
        className={cn(
          "hidden md:flex flex-col w-64 bg-neutral-100 text-white p-4 transition-all duration-300"
        )}
      >
        <div className="flex items-center space-x-2 mb-8">
          <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center">
            <span className="text-white font-bold">K</span>
          </div>
          <h1 className="text-xl text-black font-semibold">Keross</h1>
        </div>

        {/* Section Heading */}
        <h2 className="text-xs uppercase text-gray-400 mb-2">Application</h2>

        {/* Navigation List */}
        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white text-black"
          >
            <GraduationCap className="h-5 w-5" />
            <span>Training</span>
          </a>
        </nav>
      </aside>

      {/* Collapsible sidebar for mobile */}
      <div className="md:hidden p-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-neutral-100 text-white p-4">
            <div className="flex items-center space-x-2 mb-8">
              <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <h1 className="text-xl text-black font-bold">Keross</h1>
            </div>

            <h2 className="text-sm uppercase text-slate-600">
              Application
            </h2>

            <nav className="space-y-2">
              <a
                href="#"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white text-black"
              >
                <GraduationCap className="h-5 w-5" />
                <span>Training</span>
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
