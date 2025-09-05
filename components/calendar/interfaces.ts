import { TrainingPlan } from "@/types/type";
import { TEventColor } from "./types";
import { format } from "date-fns";

export interface IUser {
  id: string;
  name: string;
  picturePath: string | null;
}

export interface ICalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}

export interface IEvent {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  color: TEventColor;
  user: IUser;
  startTime?: string;
  endTime?: string;
  plan?: TrainingPlan;
  planId: string;
  topicId: string;

  // added for calendar rendering
  isHoliday?: boolean;
  dayOfEvent?: string;
  position?: number;
  isMultiDay?: boolean;
}
