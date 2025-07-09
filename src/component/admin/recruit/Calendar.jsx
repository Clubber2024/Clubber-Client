import Calendar from 'react-calendar';
import './calendar.css';
import { useState } from 'react';

const MyCalendar = ({ date, onChange }) => {
    return <Calendar value={date} onChange={onChange} />;
};

export default MyCalendar;
