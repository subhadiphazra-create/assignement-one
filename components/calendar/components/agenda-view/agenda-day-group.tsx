import { differenceInDays, format, parseISO, startOfDay } from "date-fns";
import { IEvent } from "../../interfaces";
import { AgendaEventCard } from "./agenda-event-card";

interface IProps {
  date: Date;
  events: IEvent[];
  multiDayEvents: IEvent[];
}

export function AgendaDayGroup({ date, events, multiDayEvents }: IProps) {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  console.log("rendering add event dialog 2");

  return (
    <div className="space-y-4">
      <div className="sticky top-0 flex items-center gap-4 bg-background py-2">
        <p className="text-sm font-semibold">
          {format(date, "EEEE, MMMM d, yyyy")}
        </p>
      </div>

      <div className="space-y-2">
        {multiDayEvents.length > 0 &&
          multiDayEvents.map((event) => {
            const eventStart = startOfDay(parseISO(event.startDate));
            const eventEnd = startOfDay(parseISO(event.endDate));
            const currentDate = startOfDay(date);

            const eventTotalDays = differenceInDays(eventEnd, eventStart) + 1;
            const eventCurrentDay =
              differenceInDays(currentDate, eventStart) + 1;
            return (
              <AgendaEventCard
                key={event.id}
                event={event}
                eventCurrentDay={eventCurrentDay}
                eventTotalDays={eventTotalDays}
              />
            );
          })}

        {sortedEvents.length > 0 &&
          sortedEvents.map((event) => (
            <AgendaEventCard key={event.id} event={event} />
          ))}
      </div>
    </div>
  );
}
