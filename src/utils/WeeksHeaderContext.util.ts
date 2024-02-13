import { Dispatch, SetStateAction } from "react";
import { createContext } from "./createContext";

export const [WeeksHeaderProvider, useWeeksHeaderContext] = createContext<{
  weekDates: Array<string>;
  setWeekDates: Dispatch<SetStateAction<Array<string>>>;
}>({
  name: "WeeksHeaderContext",
});
