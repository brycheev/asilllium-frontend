import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const TraineeForm = ({ onNext }) => {
    const [name, setName] = useState('');

    const handleNext = () => {
        if (name.trim()) {
            onNext(name);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <Typography variant="h6" gutterBottom>
                Введите имя подопечного
            </Typography>
            <TextField
                variant="outlined"
                label="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 2, width: '80%' }}
            />
            <Button variant="contained" onClick={handleNext} sx={{ width: '80%' }}>
                Продолжить
            </Button>
        </Box>
    );
};

export default TraineeForm;
