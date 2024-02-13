export interface ITimelineItems {
  id: number;
  start: string;
  end: string;
  name: string;
}

export interface IEventData {
  eventTitle: string;
  startDate: string;
  endDate: string;
}

export interface ICheckEventInWeekParams {
  weekRange: Array<string>;
  startDate: string;
  endDate: string;
}

export interface IConvertionDatesResults {
  initialWeekDate: Date;
  finalWeekDate: Date;
  startDateConverted: Date;
  endDateConverted: Date;
}
