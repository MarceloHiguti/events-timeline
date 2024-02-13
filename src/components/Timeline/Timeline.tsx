import { FC } from "react";
import style from "./Timeline.module.scss";
import { CalendarHeader } from "../CalendarHeader/CalendarHeader";
import { EventBox } from "../EventBox/EventBox";
import { IEventData } from "../../utils/events.model";
import { useWeeksHeaderContext } from "../../utils/WeeksHeaderContext.util";
import { HeaderOptions } from "../HeaderOptions/HeaderOptions";
import { CoreTypography } from "../CoreTypography/CoreTypography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface ITimeline {
  events: Array<IEventData>;
}

export const Timeline: FC<ITimeline> = ({ events }) => {
  const { weekDates } = useWeeksHeaderContext();

  return (
    <div className={style.timeline__container}>
      <div className={style.timeline__title}>
        <CalendarMonthIcon
          style={{ width: "35px", height: "35px", fill: "#585ba2" }}
        />
        <CoreTypography customClassName={style.timeline__title__text}>
          Events timeline
        </CoreTypography>
      </div>
      <HeaderOptions />
      <CalendarHeader dates={weekDates} />

      <div className={style.grid__container}>
        {events.map(({ eventTitle, startDate, endDate }) => (
          <EventBox
            title={eventTitle}
            startDate={startDate}
            endDate={endDate}
          />
        ))}
      </div>
    </div>
  );
};
