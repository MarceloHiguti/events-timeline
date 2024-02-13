import { FC, useMemo } from "react";
import style from "./DateBox.module.scss";
import { translateWeekDay } from "../../../utils/date.util";
import { CoreTypography } from "../../CoreTypography/CoreTypography";

interface IDateBox {
  dateTitle: string;
}

export const DateBox: FC<IDateBox> = ({ dateTitle }) => {
  const { dayNumber, weekDayName } = useMemo(() => {
    const [_, __, dayNumber] = dateTitle.split("-");
    const weekDayName = translateWeekDay(dateTitle);

    return { dayNumber, weekDayName };
  }, [dateTitle]);

  return (
    <div className={style.date__box__container}>
      <CoreTypography customClassName={style.date__text__dayNumber}>
        {dayNumber}
      </CoreTypography>
      <CoreTypography>{weekDayName}</CoreTypography>
    </div>
  );
};
