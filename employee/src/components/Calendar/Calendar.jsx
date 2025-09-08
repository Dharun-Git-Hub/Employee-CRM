import { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from 'react-redux';


const Calendars = () => {
    const locales = {"en-US":enUS};
    const themed = useSelector(state=>state.theme.mode)
    const [theme,setThemed] = useState(themed)
    const [events,setEvents] = useState([])

    useEffect(()=>{
        setThemed(themed)
    },[themed])

    const localizer = dateFnsLocalizer({format,parse,startOfWeek,getDay,locales});
    const handleSelectSlot = (slotInfo) => {
        const clickedDate = slotInfo.start;
        const newEvent = {title: "Meeting",start: clickedDate,end: new Date(clickedDate.getTime() + 2 * 60 * 60 * 1000)};
        setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    return (
        <div style={{position:'fixed',left:'20vw',top:'15vh',height:"80vh",width:'80vw',padding:'20px',cursor:'pointer',background:theme==='dark'?'black':'white'}}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={(info)=>handleSelectSlot(info)}
                style={{width:'75vw',background:'white',fontFamily:'Poppins'}}
            />
        </div>
    );
}

export default Calendars