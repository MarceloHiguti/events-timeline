import { FC } from "react";
import style from "./EventBox.module.scss";
import classNames from "classnames";
import { CoreTypography } from "../CoreTypography/CoreTypography";
import { useEventBox } from "./useEventBox.hook";
import { useEventBoxEditName } from "./useEventBoxEditName.hook";

interface IEventBox {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}

export const EventBox: FC<IEventBox> = ({ id, title, startDate, endDate }) => {
  const {
    isDateInsideWeek,
    durationOnThisWeek,
    startingPointOnThisWeek,
    startsInThisWeek,
    endsInThisWeek,
  } = useEventBox({ startDate, endDate });

  const {
    toggleEditing,
    isEditing,
    inputValue,
    handleOnBlur,
    handleInputChange,
  } = useEventBoxEditName({ id });

  return isDateInsideWeek ? (
    <div
      className={classNames(style.box__item, {
        [style[`box__item__columns__${durationOnThisWeek}`]]: true,
        [style[`box__item__columns__start__${startingPointOnThisWeek}`]]: true,
        [style[`box__item__borderLeft`]]: startsInThisWeek,
        [style[`box__item__borderRight`]]: endsInThisWeek,
      })}
      onClick={toggleEditing}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleOnBlur}
            autoFocus
          />
        </div>
      ) : (
        <div className={style.box__item__content}>
          <CoreTypography customClassName={style.eventTitle}>
            {id} - {title}
          </CoreTypography>
          <CoreTypography>
            from {startDate} to {endDate}
          </CoreTypography>
        </div>
      )}
    </div>
  ) : null;
};
