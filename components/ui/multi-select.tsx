"use client";

import * as React from "react";
import { Check, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface Option {
  label: string;
  value: string;
  role?: string;
}

interface SmartSelectProps {
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  isMultiSelect?: boolean;
}

export function SmartSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  isMultiSelect = false,
}: SmartSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("All");

  const roles = ["All", ...Array.from(new Set(options.map((o) => o.role)))];

  const filteredOptions = options.filter((opt) => {
    const matchesRole = roleFilter === "All" || opt.role === roleFilter;
    const matchesSearch = opt.label.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  /** ---------------------- MULTI SELECT ---------------------- */
  if (isMultiSelect) {
    const selectedValues = Array.isArray(value) ? value : [];
    const toggleValue = (val: string) => {
      if (selectedValues.includes(val)) {
        onChange(selectedValues.filter((v) => v !== val));
      } else {
        onChange([...selectedValues, val]);
      }
    };

    const clearAll = () => onChange([]);

    const selectedOptions = options.filter((opt) =>
      selectedValues.includes(opt.value)
    );

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between flex items-center min-h-[42px] px-2"
          >
            {selectedOptions.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1 flex-1">
                {selectedOptions.slice(0, 3).map((opt) => (
                  <Badge
                    key={opt.value}
                    variant="secondary"
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                  >
                    {opt.label}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleValue(opt.value);
                      }}
                      className="ml-1 rounded-full p-0.5 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </div>
                  </Badge>
                ))}
                {selectedOptions.length > 3 && (
                  <Badge
                    variant="outline"
                    className="rounded-full px-2 py-0.5 text-xs"
                  >
                    +{selectedOptions.length - 3}
                  </Badge>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}

            {selectedOptions.length > 0 && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  clearAll();
                }}
                className="ml-2 rounded-full p-1 hover:bg-muted cursor-pointer"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </div>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0">
          {/* 🔹 Role Filter */}
          <div className="p-2 border-b">
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((r) => (
                  <SelectItem key={r} value={r || ""}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 🔹 Search + Options */}
          <Command>
            <CommandInput
              placeholder={`Search in ${roleFilter}...`}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>No option found.</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleValue(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedValues.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                    <span className="text-xs text-gray-400 ml-2">
                      ({option.role})
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }

  /** ---------------------- SINGLE SELECT ---------------------- */
  const selectedValue = Array.isArray(value) ? value[0] : value;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between flex items-center min-h-[42px] px-2"
        >
          {selectedValue ? (
            options.find((o) => o.value === selectedValue)?.label
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[300px] p-0">
        {/* 🔹 Search + Options */}
        <Command>
          <CommandInput
            placeholder={`Search in ${roleFilter}...`}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      option.value === selectedValue
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
