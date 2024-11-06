import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItemText,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const WorkoutForm = ({ date, onSave, traineeName }) => {
    const [trainingName, setTrainingName] = useState('Training');
    const [description, setDescription] = useState('');
    const [exercises, setExercises] = useState([]);
    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState([{ weight: '', reps: '' }]);
    const [open, setOpen] = useState(false);
    const [editingExerciseIndex, setEditingExerciseIndex] = useState(null);

    const handleAddSet = () => {
        setSets([...sets, { weight: '', reps: '' }]);
    };

    const handleSetChange = (index, field, value) => {
        const updatedSets = sets.map((set, i) =>
            i === index ? { ...set, [field]: value } : set
        );
        setSets(updatedSets);
    };

    const handleDeleteSet = (index) => {
        setSets((prevSets) => prevSets.filter((_, i) => i !== index));
    };

    const handleAddOrUpdateExercise = () => {
        const newExercise = {
            name: exerciseName,
            sets: sets.map((set) => ({ weight: Number(set.weight), reps: Number(set.reps) })),
        };

        if (editingExerciseIndex !== null) {
            const updatedExercises = exercises.map((exercise, index) =>
                index === editingExerciseIndex ? newExercise : exercise
            );
            setExercises(updatedExercises);
            setEditingExerciseIndex(null); // Сбрасываем режим редактирования
        } else {
            setExercises([...exercises, newExercise]);
        }

        setExerciseName('');
        setSets([{ weight: '', reps: '' }]);
        setOpen(false); // Закрываем модальное окно после добавления/обновления упражнения
    };

    const handleEditExercise = (index) => {
        const exercise = exercises[index];
        setExerciseName(exercise.name);
        setSets(exercise.sets);
        setEditingExerciseIndex(index);
        setOpen(true);
    };

    const handleDeleteExercise = (index) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        const trainingData = {
            training: {
                name: trainingName,
                date,
                description,
                trainee: traineeName,
                exercises,
            },
        };
        onSave(trainingData);
    };

    const formattedDate = format(new Date(date), "eeee dd.MM.yyyy", { locale: ru });

    return (
        <Box sx={{ backgroundColor: '#f9f9f9', padding: 2, borderRadius: 2, mt: 2 }}>
            <Typography variant="h6" sx={{ color: '#0088cc', fontWeight: 'bold', textAlign: 'center' }}>
                {formattedDate}
            </Typography>
            <TextField
                label="Название тренировки"
                value={trainingName}
                onChange={(e) => setTrainingName(e.target.value)}
                sx={{ mb: 2, backgroundColor: 'white', borderRadius: 1 }}
                fullWidth
            />

            <Button
                variant="outlined"
                onClick={() => {
                    setOpen(true);
                    setEditingExerciseIndex(null); // Сбрасываем режим редактирования при добавлении нового упражнения
                }}
                sx={{ mb: 2, color: '#0088cc' }}
            >
                Добавить упражнение
            </Button>

            {/* Список упражнений */}
            <List sx={{ backgroundColor: 'white', borderRadius: 2, padding: 0 }}>
                {exercises.map((exercise, index) => (
                    <Accordion key={index} sx={{ backgroundColor: 'white', boxShadow: 'none', mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#0088cc' }} />}>
                            <ListItemText
                                primary={exercise.name}
                                secondary={`${exercise.sets.length} подходов`}
                                primaryTypographyProps={{ fontWeight: 'bold' }}
                            />
                            <IconButton edge="end" onClick={() => handleEditExercise(index)} sx={{ color: '#0088cc' }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" onClick={() => handleDeleteExercise(index)} sx={{ color: '#d32f2f' }}>
                                <DeleteIcon />
                            </IconButton>
                        </AccordionSummary>
                        <AccordionDetails>
                            {exercise.sets.map((set, i) => (
                                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography sx={{ color: '#555' }}>
                                        {i + 1}. {set.weight}кг x {set.reps}
                                    </Typography>
                                </Box>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </List>

            {/* Модальное окно для ввода/редактирования упражнения */}
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle sx={{ color: '#0088cc' }}>{editingExerciseIndex !== null ? 'Редактировать упражнение' : 'Добавить упражнение'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Упражнение"
                        value={exerciseName}
                        onChange={(e) => setExerciseName(e.target.value)}
                        fullWidth
                        sx={{ mb: 2, backgroundColor: '#f9f9f9', borderRadius: 1 }}
                    />
                    {sets.map((set, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                            <TextField
                                label="Вес"
                                type="number"
                                value={set.weight}
                                onChange={(e) => handleSetChange(index, 'weight', e.target.value)}
                                sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
                            />
                            <TextField
                                label="Повторения"
                                type="number"
                                value={set.reps}
                                onChange={(e) => handleSetChange(index, 'reps', e.target.value)}
                                sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
                            />
                            <IconButton onClick={() => handleDeleteSet(index)} sx={{ color: '#d32f2f' }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))}
                    <Button onClick={handleAddSet} sx={{ mb: 2, color: '#0088cc' }}>
                        Добавить подход
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} sx={{ color: '#555' }}>Отмена</Button>
                    <Button variant="contained" onClick={handleAddOrUpdateExercise} sx={{ backgroundColor: '#0088cc', color: 'white' }}>
                        {editingExerciseIndex !== null ? 'Обновить упражнение' : 'Сохранить упражнение'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Button variant="contained" onClick={handleSave} sx={{ mt: 2, backgroundColor: '#0088cc', color: 'white' }}>
                Сохранить тренировку
            </Button>
        </Box>
    );
};

export default WorkoutForm;
