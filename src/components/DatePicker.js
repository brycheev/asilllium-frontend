import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, Button } from '@mui/material';

const DatePicker = ({ onDatesSelected }) => {
    const [selectedDates, setSelectedDates] = useState([]);

    const handleDateChange = (date) => {
        const dateString = date.toDateString();
        setSelectedDates((prevDates) =>
            prevDates.includes(dateString)
                ? prevDates.filter((d) => d !== dateString) // Убираем, если дата уже выбрана
                : [...prevDates, dateString] // Добавляем, если дата не выбрана
        );
    };

    const handleNext = () => {
        onDatesSelected(selectedDates);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Выберите даты тренировок
            </Typography>
            <Calendar
                onClickDay={handleDateChange}
                tileClassName={({ date, view }) =>
                    view === 'month' && selectedDates.includes(date.toDateString()) ? 'highlight' : null
                }
                selectRange={false} // Отключаем выбор диапазона
            />
            <Button variant="contained" onClick={handleNext} sx={{ mt: 2 }}>
                Продолжить
            </Button>
        </Box>
    );
};

export default DatePicker;
