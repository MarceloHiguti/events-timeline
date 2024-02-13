import { Dispatch, SetStateAction } from "react";
import { createContext } from "./createContext";
import { IEventData } from "./events.model";

export const [EventsTimelineProvider, useEventsTimelineContext] =
  createContext<{
    weekDates: Array<string>;
    setWeekDates: Dispatch<SetStateAction<Array<string>>>;
    events: Array<IEventData>;
    setEvents: Dispatch<SetStateAction<Array<IEventData>>>;
  }>({
    name: "EventsTimelineContext",
  });
