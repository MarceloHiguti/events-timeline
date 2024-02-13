import { FC } from "react";
import { CoreButton } from "../CoreButton/CoreButton";
import { useHeaderOptions } from "./useHeaderOptions.hook";
import { CoreTypography } from "../CoreTypography/CoreTypography";
import style from "./HeaderOptions.module.scss";

export const HeaderOptions: FC = () => {
  const { countPreviousWeek, countNextWeek, monthAndYear } = useHeaderOptions();

  return (
    <div className={style.header__container}>
      <CoreButton
        onClick={countPreviousWeek}
        customClassName={style.header__monthButton}
      >
        {"<"}
      </CoreButton>
      <CoreTypography customClassName={style.header__monthName}>
        {monthAndYear}
      </CoreTypography>
      <CoreButton
        onClick={countNextWeek}
        customClassName={style.header__monthButton}
      >
        {">"}
      </CoreButton>
    </div>
  );
};
