import { FC } from "react";
import style from "./Timeline.module.scss";
import { CalendarHeader } from "../CalendarHeader/CalendarHeader";
import { EventBox } from "../EventBox/EventBox";
import { HeaderOptions } from "../HeaderOptions/HeaderOptions";
import { CoreTypography } from "../CoreTypography/CoreTypography";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useEventsTimelineContext } from "../../utils/EventsTimelineContext.util";

export const Timeline: FC = () => {
  const { weekDates, events } = useEventsTimelineContext();

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
        {events.map(({ id, eventTitle, startDate, endDate }) => (
          <EventBox
            id={id}
            title={eventTitle}
            startDate={startDate}
            endDate={endDate}
          />
        ))}
      </div>
    </div>
  );
};
