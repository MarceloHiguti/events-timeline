import { useCallback, useMemo } from "react";
import { getNewDates, translateMonth } from "../../utils/date.util";
import { useEventsTimelineContext } from "../../utils/EventsTimelineContext.util";

interface IHeaderOptionsResults {
  countPreviousWeek: () => void;
  countNextWeek: () => void;
  monthAndYear: string;
}

export function useHeaderOptions(): IHeaderOptionsResults {
  const { weekDates, setWeekDates } = useEventsTimelineContext();

  const countPreviousWeek = useCallback(() => {
    const firstDay = weekDates[0];
    const [_, ...previousWeek] = getNewDates(firstDay, 8, "desc");
    setWeekDates(previousWeek.reverse());
  }, [weekDates, setWeekDates]);

  const countNextWeek = useCallback(() => {
    const lastDay = weekDates[weekDates.length - 1];
    const [_, ...nextWeek] = getNewDates(lastDay, 8);
    setWeekDates(nextWeek);
  }, [weekDates, setWeekDates]);

  const monthAndYear = useMemo(() => {
    const monthString = translateMonth(weekDates[0]);
    const [year] = weekDates[0].split("-");
    return `${monthString} ${year}`;
  }, [weekDates]);

  return { countPreviousWeek, countNextWeek, monthAndYear };
}
