// src/components/TaskForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';
import { TextField, Button, Grid, Typography } from '@mui/material';

interface TaskFormProps {
  selectedUserId: string;
}

const TaskForm: React.FC<TaskFormProps> = ({ selectedUserId }) => {
  const [taskName, setTaskName] = useState('');
  const [checklist, setChecklist] = useState<string[]>(['']);
  const dispatch = useDispatch();

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, '']);
  };

  const handleChecklistChange = (index: number, value: string) => {
    const newChecklist = [...checklist];
    newChecklist[index] = value;
    setChecklist(newChecklist);
  };

  const handleAddTask = () => {
    if (selectedUserId) {
      const newTask = {
        id: `${Date.now()}`,
        name: taskName,
        checklist: checklist.map((item, index) => ({
          id: `${Date.now()}-${index}`,
          text: item,
          completed: false,
        })),
        userId: selectedUserId,
      };
      dispatch(addTask({ userId: selectedUserId, task: newTask }));
      setTaskName('');
      setChecklist(['']);
    } else {
      alert('Please select a user.');
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Task Form</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </Grid>
      {checklist.map((item, index) => (
        <Grid item xs={12} key={index}>
          <TextField
            fullWidth
            variant="outlined"
            label={`Checklist Item ${index + 1}`}
            value={item}
            onChange={(e) => handleChecklistChange(index, e.target.value)}
          />
        </Grid>
      ))}
      <Grid item xs={6}>
        <Button fullWidth variant="contained" color="primary" onClick={handleAddChecklistItem}>
          Add Checklist Item
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button fullWidth variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Grid>
    </Grid>
  );
};

export default TaskForm;
