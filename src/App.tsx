import { useMemo, useState } from "react";
import { Timeline } from "./components/Timeline/Timeline";
import timelineItems from "./services/data/timelineItems";
import { transformEventsData } from "./utils/events.util";
import { WeeksHeaderProvider } from "./utils/WeeksHeaderContext.util";
import { getInitialWeek } from "./utils/date.util";

function App() {
  const events = useMemo(() => transformEventsData(timelineItems), []);
  const initialWeekDates = useMemo(() => getInitialWeek(events), [events]);
  const [weekDates, setWeekDates] = useState(initialWeekDates);

  return (
    <WeeksHeaderProvider value={{ weekDates, setWeekDates }}>
      <Timeline events={events} />
    </WeeksHeaderProvider>
  );
}

export default App;
