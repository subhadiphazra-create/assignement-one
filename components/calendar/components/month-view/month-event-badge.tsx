import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { IEvent } from "../../interfaces";
import { useCalendar } from "../../contexts/calendar-context";
import { DraggableEvent } from "../dnd/draggable-event";
import { EventDetailsDialog } from "../dialogs/event-details-dialog";
import { Eye } from "lucide-react";

interface IProps {
  event: IEvent;
  cellDate: Date;
  className?: string;
}

export function MonthEventBadge({ event, cellDate, className }: IProps) {
  const { badgeVariant } = useCalendar();

  const colorMap: Record<string, string> = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-green-200 bg-green-50 text-green-700",
    red: "border-red-200 bg-red-50 text-red-700",
    yellow: "border-yellow-200 bg-yellow-50 text-yellow-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
    gray: "border-neutral-200 bg-neutral-50 text-neutral-900",
  };

  const colorClass = colorMap[event.color] ?? colorMap.blue;

  return (
    <DraggableEvent event={event}>
      <EventDetailsDialog event={event}>
        <div
          role="button"
          tabIndex={0}
          className={cn(
            "flex w-full items-center justify-between gap-2 truncate rounded-md border px-2 py-1 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            colorClass,
            className
          )}
        >
          <span className="truncate">{event.title}</span>
          <Eye size={14} className="text-primary cursor-pointer hover:scale-110 transition" onClick={() => console.log("View plan:", event.plan)} />
        </div>
      </EventDetailsDialog>
    </DraggableEvent>
  );
}
