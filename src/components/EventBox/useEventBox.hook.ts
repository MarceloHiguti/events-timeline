import { useMemo } from "react";
import {
  checkEventDurationOnThisWeek,
  checkEventIsInsideWeek,
  checkEventStartingPointOnThisWeek,
} from "../../utils/events.util";
import { useEventsTimelineContext } from "../../utils/EventsTimelineContext.util";

interface IEventBoxParams {
  startDate: string;
  endDate: string;
}

interface IEventBoxResults {
  isDateInsideWeek: boolean;
  durationOnThisWeek: number;
  startingPointOnThisWeek: number;
  startsInThisWeek: boolean;
  endsInThisWeek: boolean;
}

export function useEventBox({
  startDate,
  endDate,
}: IEventBoxParams): IEventBoxResults {
  const { weekDates } = useEventsTimelineContext();
  const isDateInsideWeek = useMemo(
    () => checkEventIsInsideWeek({ weekRange: weekDates, startDate, endDate }),
    [weekDates]
  );

  const durationOnThisWeek = useMemo(
    () =>
      checkEventDurationOnThisWeek({
        weekRange: weekDates,
        startDate,
        endDate,
      }),
    [weekDates]
  );

  const startingPointOnThisWeek = useMemo(
    () =>
      checkEventStartingPointOnThisWeek({
        weekRange: weekDates,
        startDate,
        endDate,
      }),
    [weekDates]
  );

  const startsInThisWeek = useMemo(
    () =>
      checkEventIsInsideWeek({
        weekRange: weekDates,
        startDate,
        endDate: startDate,
      }),
    [weekDates]
  );

  const endsInThisWeek = useMemo(
    () =>
      checkEventIsInsideWeek({
        weekRange: weekDates,
        startDate: endDate,
        endDate,
      }),
    [weekDates]
  );

  return {
    isDateInsideWeek,
    durationOnThisWeek,
    startingPointOnThisWeek,
    startsInThisWeek,
    endsInThisWeek,
  };
}
