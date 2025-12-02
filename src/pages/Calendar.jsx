import React,{ useState, useMemo} from 'react';
import { DateTime } from 'luxon'; 
import '../styles/Calendar.css';

const sampleTasksByDate = {
  "2025-12-05": [{ id: 1, title: "Essay due", type: "high-priority" }],
  "2025-12-08": [{ id: 2, title: "Group meeting", type: "scheduled" }],
  "2025-11-12": [{ id: 3, title: "Submit lab", type: "overdue" }],
  "2025-11-22": [{ id: 3, title: "Submit lab", type: "overdue" }],
  "2025-11-02": [{ id: 3, title: "Submit lab", type: "overdue" }],
  "2025-11-13": [{ id: 3, title: "Submit lab", type: "overdue" }],
};


export default function Calendar() {
    const today = DateTime.local();
    const [ visibleMonth, setvisibleMonth] = React.useState(today.startOf('month'));
    const[selectedDate, setselectedDate] = React.useState(null);
    const tasksByDate = useMemo(() => sampleTasksByDate , []);
    const monthInfo = useMemo(() => {
        const startOfMonth = visibleMonth.startOf('month');
        const daysInMonth = visibleMonth.daysInMonth;
        const startWeekdayIndex  = startOfMonth.weekday % 7; 
        return { startOfMonth, daysInMonth, startWeekdayIndex };
    }, [visibleMonth]);


    const calendarCells = useMemo(() => {
        const cells = [];
        for (let i = 0; i < monthInfo.startWeekdayIndex; i++) {
            cells.push(null);
        }
        for (let d = 1 ; d <= monthInfo.daysInMonth; d++) {
            cells.push(d);
        }
        return cells;
    }, [monthInfo]);

    const PrevMonth = () => {
        setvisibleMonth((vm) => vm.minus({ months: 1 }). startOf('month'));
    };
    const NextMonth = () => {
        setvisibleMonth((vm) => vm.plus({ months: 1 }). startOf('month'));
    };
    const MonthHeading = visibleMonth.toLocaleString({ month: 'long', year: 'numeric' });

    const isToday = (dayNumber) => {
        return (
            visibleMonth.hasSame(today, 'month') && 
            visibleMonth.hasSame(today, 'year') &&
            dayNumber === today.day

        );
    };

    const isoFor = (dayNumber) => {
        return visibleMonth.set({ day: dayNumber }).toISODate();    
    };

    const getTasksfor = (dayNumber) => {
        const iso = isoFor(dayNumber);
        if (!iso ) return [];
        return tasksByDate[iso] || [];

    };

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    

        
    return(
        <div  className ="calendar-container"> This is the Calendar Page        
              <div className='calendar-header'>
                <div    className='calendar-controls'>
                    <h2> {monthHeading} </h2>
                    <div className='calendar-nav' >         
                        <button
                        className='calendar-nav-button' onClick={PrevMonth}  aria-label="Previous Month"> &lt; </button>
                        <button 
                        className='calendar-nav-button' onClick={NextMonth} aria-label="Next Month"> &gt;

                        </button>
                    </div>
                </div>
              </div>
        
        

        <div
         className='calendar-grid' >
            <div
            className='calendar-main-card'>
                <div
                 className='calendar-weekdays'>
                    {weekdays.map((w, i) => (
                        <div key={i} className='calendar-weekday'>
                            {w}
                        </div>
                    ))}
                </div>
                <div
                className='caledar-days'>
                    {calendarCells.map((dayValue, index) => {
                        if (dayValue === null) {
                            return <div className='calendar-day' key={"blank-" + index}></div>;
                        }
                        const dayIsToday = isToday (dayValue);
                        const iso =isoFor(dayValue);
                        const tasks = getTasksfor(dayValue);
                        const isSelected = 
                            selectedDate && selectedDate.hasSame(visibleMonth.set({ day: dayValue }), 'day');
                        return (
                            <div
                             key={iso}
                             onClick={()    => setselectedDate(visibleMonth.set({ day: dayValue }))}
                                className={
                                    "calendar-day"+
                                    (dayIsToday ? "today":"") +
                                    (isSelected ? "selected" : "")
                                }
                            >
                                
                            </div>

                </div>

            </div>

        </div>
    </div>
    );
}