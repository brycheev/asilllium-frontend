import React, { useState } from 'react';
import TraineeForm from './components/TraineeForm';
import DatePicker from './components/DatePicker';
import WorkoutForm from './components/WorkoutForm';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [traineeName, setTraineeName] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleNext = (name) => {
    setTraineeName(name);
    setStep(2);
  };

  const handleDatesSelected = (dates) => {
    setSelectedDates(dates);
    setStep(3);
  };

  const handleWorkoutSave = (trainingData) => {
    setTrainings((prevTrainings) => [...prevTrainings, trainingData]);
    setSelectedDate(null); // Закрываем форму после сохранения
  };

  return (
      <div>
        {step === 1 && <TraineeForm onNext={handleNext} />}
        {step === 2 && <DatePicker onDatesSelected={handleDatesSelected} />}
        {step === 3 && (
            <div>
              <h2>План тренировок для {traineeName}</h2>
              <ul>
                {selectedDates.map((date) => (
                    <li key={date}>
                      <button onClick={() => setSelectedDate(date)}>
                        {date}
                      </button>
                    </li>
                ))}
              </ul>
              {selectedDate && (
                  <WorkoutForm date={selectedDate} onSave={handleWorkoutSave} traineeName={traineeName} />
              )}
            </div>
        )}
      </div>
  );
}

export default App;
