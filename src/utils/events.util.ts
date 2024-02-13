import { differenceInDays, orderByAscDate } from "./date.util";
import {
  ICheckEventInWeekParams,
  IConvertionDatesResults,
  IEventData,
  ITimelineItems,
} from "./events.model";

export function transformEventsData(
  eventsInput: Array<ITimelineItems>
): Array<IEventData> {
  const orderedByDate = orderByAscDate(eventsInput);
  return orderedByDate.map(({ id, name, start, end }) => {
    return {
      eventTitle: `${id} - ${name}`,
      startDate: start,
      endDate: end,
    };
  });
}

function getInitialAndEndDates({
  weekRange,
  startDate,
  endDate,
}: ICheckEventInWeekParams): IConvertionDatesResults {
  const firstDate = weekRange[0];
  const lastDate = weekRange[weekRange.length - 1];
  const initialWeekDate = new Date(firstDate);
  const finalWeekDate = new Date(lastDate);
  const startDateConverted = new Date(startDate);
  const endDateConverted = new Date(endDate);

  return {
    initialWeekDate,
    finalWeekDate,
    startDateConverted,
    endDateConverted,
  };
}

export function checkEventIsInsideWeek({
  weekRange,
  startDate,
  endDate,
}: ICheckEventInWeekParams): boolean {
  const {
    initialWeekDate,
    finalWeekDate,
    startDateConverted,
    endDateConverted,
  } = getInitialAndEndDates({
    weekRange,
    startDate,
    endDate,
  });

  const startIsInside =
    startDateConverted >= initialWeekDate &&
    startDateConverted <= finalWeekDate;
  const endIsInside =
    endDateConverted >= initialWeekDate && endDateConverted <= finalWeekDate;
  const isEndDateAfterLastWeekDay = endDateConverted > finalWeekDate;
  const isStartDateABeforeFirstWeekDay = startDateConverted < initialWeekDate;
  const isLongDuration =
    isStartDateABeforeFirstWeekDay && isEndDateAfterLastWeekDay;

  return startIsInside || endIsInside || isLongDuration;
}

export function checkEventDurationOnThisWeek({
  weekRange,
  startDate,
  endDate,
}: ICheckEventInWeekParams): number {
  if (
    !checkEventIsInsideWeek({
      weekRange,
      startDate,
      endDate,
    })
  ) {
    return 0; // event not on this week
  }

  const isStartingDateInsideWeek = checkEventIsInsideWeek({
    weekRange,
    startDate,
    endDate: startDate,
  });

  const isEndDateInsideWeek = checkEventIsInsideWeek({
    weekRange,
    startDate: endDate,
    endDate,
  });

  if (!isStartingDateInsideWeek && !isEndDateInsideWeek) {
    return 7; // event during more than this week
  }

  let numberOfDaysInsideWeek = 1;
  const currentDate = isStartingDateInsideWeek
    ? new Date(startDate)
    : new Date(weekRange[0]);
  const endConvertedDarte = new Date(endDate);
  for (let i = 0; i < 7; i++) {
    const isCurrentDateLowerThanEndDate = currentDate < endConvertedDarte;
    if (
      checkEventIsInsideWeek({
        weekRange,
        startDate: currentDate.toISOString().slice(0, 10),
        endDate: currentDate.toISOString().slice(0, 10),
      }) &&
      isCurrentDateLowerThanEndDate
    ) {
      numberOfDaysInsideWeek += 1;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return numberOfDaysInsideWeek;
}

export function checkEventStartingPointOnThisWeek({
  weekRange,
  startDate,
  endDate,
}: ICheckEventInWeekParams): number {
  const foundStartDateIndex = weekRange.findIndex(
    (weekDate) => weekDate === startDate
  );
  const foundEndDateIndex = weekRange.findIndex(
    (weekDate) => weekDate === endDate
  );

  if (foundStartDateIndex > -1) {
    return foundStartDateIndex + 1;
  }

  if (foundEndDateIndex > -1) {
    return 1;
  }

  return 1;
}
