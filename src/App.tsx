import { useMemo, useState } from "react";
import { Timeline } from "./components/Timeline/Timeline";
import timelineItems from "./services/data/timelineItems";
import { transformEventsData } from "./utils/events.util";
import { EventsTimelineProvider } from "./utils/EventsTimelineContext.util";
import { getInitialWeek } from "./utils/date.util";

function App() {
  const initialEvents = useMemo(() => transformEventsData(timelineItems), []);
  const initialWeekDates = useMemo(
    () => getInitialWeek(initialEvents),
    [initialEvents]
  );
  const [weekDates, setWeekDates] = useState(initialWeekDates);
  const [events, setEvents] = useState(initialEvents);

  return (
    <EventsTimelineProvider
      value={{ weekDates, setWeekDates, events, setEvents }}
    >
      <Timeline />
    </EventsTimelineProvider>
  );
}

export default App;
