import { IEventData, ITimelineItems } from "./events.model";

export function translateMonth(date: string): string {
  const months = {
    en: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };
  const [_, month] = date.split("-");

  return months.en[parseInt(month) - 1];
}

export function translateWeekDay(date: string): string {
  const weekdays = {
    en: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  };
  const weekDate = new Date(date);
  return weekdays.en[weekDate.getDay()];
}

export function getNewDates(
  startDateString: string,
  numberOfDays: number,
  order: string = "asc"
): Array<string> {
  const finalDatesArray = [];
  const initialDate = new Date(startDateString);

  for (let i = 0; i < numberOfDays; i++) {
    const newDate = new Date(initialDate);
    const nextOrPrevious =
      order === "asc" ? initialDate.getDate() + i : initialDate.getDate() - i;
    newDate.setDate(nextOrPrevious);
    finalDatesArray.push(newDate.toISOString().slice(0, 10));
  }

  return finalDatesArray;
}

export function getInitialWeek<T extends IEventData>(
  arrayWithDates: Array<T>
): Array<string> {
  const [firstDate] = arrayWithDates;
  const firstDateString = firstDate.startDate;
  const weekDates = getNewDates(firstDateString, 7);
  return weekDates;
}

export function orderByAscDate<T extends ITimelineItems>(
  arrayWithDates: Array<T>
): Array<T> {
  return arrayWithDates.sort((first, second) => {
    const firstDate = new Date(first.start);
    const secondDate = new Date(second.start);
    return firstDate.getTime() - secondDate.getTime();
  });
}

export function differenceInDays(date1: string, date2: string): number {
  const oneDay = 24 * 60 * 60 * 1000;

  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  const differenceInMs = Math.abs(firstDate.getTime() - secondDate.getTime());
  const differenceInDays = Math.round(differenceInMs / oneDay);

  return differenceInDays;
}
