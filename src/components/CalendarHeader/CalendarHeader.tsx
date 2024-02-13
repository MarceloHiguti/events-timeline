import { FC } from "react";
import style from "./CalendarHeader.module.scss";
import { DateBox } from "./DateBox/DateBox";

interface ICalendarHeader {
  dates: Array<string>;
}

export const CalendarHeader: FC<ICalendarHeader> = ({ dates }) => {
  return (
    <div className={style.calendar__header__container}>
      {dates.map((dateString) => (
        <DateBox dateTitle={dateString} />
      ))}
    </div>
  );
};
