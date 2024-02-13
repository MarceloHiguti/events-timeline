import { useCallback, useMemo, useState } from "react";
import { useEventsTimelineContext } from "../../utils/EventsTimelineContext.util";

interface IEventBoxEditNameParams {
  id: number;
}

interface IEventBoxEditNameResults {
  toggleEditing: () => void;
  isEditing: boolean;
  inputValue: string;
  handleOnBlur: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useEventBoxEditName({
  id,
}: IEventBoxEditNameParams): IEventBoxEditNameResults {
  const { events, setEvents } = useEventsTimelineContext();

  const foundInputValue = useMemo(() => {
    const foundEvent = events.find(({ id: eventId }) => eventId === id);
    return foundEvent?.eventTitle ?? "";
  }, [events]);

  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(foundInputValue);

  const toggleEditing = useCallback(() => {
    setIsEditing((prevValue) => !prevValue);
  }, []);

  const handleOnBlur = useCallback(() => {
    const newEvents = events.map((event) => {
      if (event.id === id) {
        return {
          ...event,
          eventTitle: inputValue,
        };
      } else {
        return event;
      }
    });
    setEvents(newEvents);
  }, [inputValue]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

  return {
    toggleEditing,
    isEditing,
    inputValue,
    handleOnBlur,
    handleInputChange,
  };
}
