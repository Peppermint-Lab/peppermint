/// <reference types="react" />
import { Moment } from 'moment';
import { CalendarProps } from './generateCalendar';
declare const Calendar: (props: CalendarProps<Moment>) => JSX.Element;
export { CalendarProps };
export default Calendar;
