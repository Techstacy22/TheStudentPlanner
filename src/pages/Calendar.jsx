import React,{ useState, useMemo} from 'react';
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
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
    const monthHeading = visibleMonth.toLocaleString({ month: 'long', year: 'numeric' });
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
        <div  className ="calendar-container">     <h2> My Calendar <FaRegCalendarAlt />                     </h2>  
              <div className='calendar-header'>
                <div    className='calendar-controls'>
                    <h2> {monthHeading} </h2>
                    <div className='calendar-nav' >         
                        <button
                        className='calendar-nav-button' onClick={PrevMonth}  aria-label="Previous Month"> <FaLessThan />
                        </button>
                        <button 
                        className='calendar-nav-button' onClick={NextMonth} aria-label="Next Month"> <FaGreaterThan />

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
                className='calendar-days'>
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
                                <div
                                 className='calendar-day-content'>
                                    <div>
                                        {dayValue}
                                    </div>
                                    <div
                                    className='calendar-day-indicators'>
                                        {tasks.slice(0,3).map((t,i) => {
                                            const dotClass =
                                             t.type === "high-priority"
                                             ? "high-priority"
                                                : t.type === "overdue"
                                                ? "overdue"
                                                : "scheduled";
                                            return (
                                                <div
                                                key={t.id|| i}
                                                className={`calendar-day-dot ${dotClass}`}
                                                title={t.title}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
              <aside className="calendar-sidebar-card"> 
          <div className="calendar-sidebar-header">
                {selectedDate ? (
              <div>
               <strong>{selectedDate.toLocaleString(DateTime.DATE_FULL)}</strong>
                <div>{selectedDate.toLocaleString(DateTime.TIME_SIMPLE)}</div>
              </div>
            ) : (
              <div>
                <strong>Select a day</strong>
                <div>Click a calendar date to see tasks</div>
              </div>
            )}
          </div>

          
          <div className="calendar-tasks-list">
            {selectedDate ? (
              
              (tasksByDate[selectedDate.toISODate()] || []).map((t) => (
                <div
                  key={t.id}
                  className={`calendar-task-item ${t.completed ? "completed" : ""}`}
                >
                  <div className="calendar-task-content">
                   
                    <input
                      type="checkbox"
                      className="calendar-task-checkbox"
                      defaultChecked={!!t.completed}
                      aria-label={`Mark ${t.title} complete`}
                    />
                    
                    <div>
                      <div>{t.title}</div>
                     
                      <div
                        className={`calendar-task-priority ${
                          t.type === "high-priority"
                            ? "high"
                            : t.type === "overdue"
                            ? "high"
                            : "low"
                        }`}
                      >
                        {t.type}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
             
              <div>No date selected 
                 click a day to view tasks</div>
            )}
          </div>

         
          <div className="calendar-legend-card">
            <h4>Legend</h4>
            <div className="calendar-legend-list">
              <div className="calendar-legend-item">
                <div className="calendar-legend-dot overdue" /> <div>Overdue tasks</div>
              </div>

              <div className="calendar-legend-item">
                <div className="calendar-legend-dot high-priority" /> <div>High priority</div>
              </div>

              <div className="calendar-legend-item">
                <div className="calendar-legend-dot scheduled" /> <div>Tasks scheduled</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}