import { FC } from "react";
import style from "./EventBox.module.scss";
import classNames from "classnames";
import { CoreTypography } from "../CoreTypography/CoreTypography";
import { useEventBox } from "./useEventBox.hook";

interface IEventBox {
  title: string;
  startDate: string;
  endDate: string;
}

export const EventBox: FC<IEventBox> = ({ title, startDate, endDate }) => {
  const {
    isDateInsideWeek,
    durationOnThisWeek,
    startingPointOnThisWeek,
    startsInThisWeek,
    endsInThisWeek,
  } = useEventBox({ startDate, endDate });

  return isDateInsideWeek ? (
    <div
      className={classNames(style.box__item, {
        [style[`box__item__columns__${durationOnThisWeek}`]]: true,
        [style[`box__item__columns__start__${startingPointOnThisWeek}`]]: true,
        [style[`box__item__borderLeft`]]: startsInThisWeek,
        [style[`box__item__borderRight`]]: endsInThisWeek,
      })}
    >
      <CoreTypography customClassName={style.eventTitle}>
        {title}
      </CoreTypography>
      <CoreTypography>
        from {startDate} to {endDate}
      </CoreTypography>
    </div>
  ) : null;
};
