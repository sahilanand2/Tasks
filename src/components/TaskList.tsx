// src/components/TaskList.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleChecklistItem, addChecklistItem } from '../features/tasks/tasksSlice';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  TextField,
  Box,
  Grid,
} from '@mui/material';
import { Add, CheckBox, CheckBoxOutlineBlank, Circle, ExpandMore } from '@mui/icons-material';

interface TaskListProps {
  selectedUserId: string;
}

const TaskList: React.FC<TaskListProps> = ({ selectedUserId }) => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [newItemText, setNewItemText] = useState('');

  const handleToggle = (taskId: string, itemId: string) => {
    dispatch(toggleChecklistItem({ taskId, itemId }));
  };

  const handleAddNewItem = (taskId: string) => {
    if (!newItemText.trim()) {
      return; 
    }

    const newItem = {
      id: `${Date.now()}-${Math.random()}`,
      text: newItemText,
      completed: false,
    };

    dispatch(addChecklistItem({ taskId, newItem }));
    setNewItemText('');
  };

  return (
    <div>
      {tasks
        .filter((task) => task.userId === selectedUserId)
        .map((task) => (
          <Accordion key={task.id} style={{ marginBottom: '10px' }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '20px',
                    fontWeight: '600',
                    lineHeight: '23.44px',
                    textAlign: 'left',
                  }}
                >
                  {task.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
                  {task.checklist.some((item) => !item.completed) ? (
                    <>
                      <Circle sx={{ color: 'red', marginRight: '8px', height: '12px', width: '12px' }} />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          fontSize: '12px',
                          fontWeight: '400',
                          lineHeight: '14.06px',
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ color: 'red' }}>Ticket progress is blocked</span>
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Circle sx={{ color: 'green', marginRight: '8px', height: '12px', width: '12px' }} />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          fontSize: '12px',
                          fontWeight: '400',
                          lineHeight: '14.06px',
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ color: 'green' }}>All tasks completed</span>
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {task.checklist.map((item) => (
                  <ListItem key={item.id} button onClick={() => handleToggle(task.id, item.id)}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={item.completed}
                        tabIndex={-1}
                        disableRipple
                        icon={<CheckBoxOutlineBlank />}
                        checkedIcon={<CheckBox style={{ color: '#68BD27' }} />}
                        sx={{
                          height: "28px",
                          width: "28px"
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: '16px',
                            fontWeight: '400',
                            lineHeight: '22px',
                            color: '#0C0D0D'
                          }}
                        >
                          {item.text}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          sx={{
                            fontSize: '12px',
                            fontWeight: '400',
                            lineHeight: '14.06px',
                            color: '#787B80'
                          }}
                        >
                          {item.completed ? (
                            item.text.includes('Blocked') ? (
                              <>
                              <Circle sx={{ color: 'green', marginRight: '8px', height: '12px', width: '12px', marginBottom: '-2px' }} />
                              <span style={{ color: 'red' }}>Blocked: Part installation done</span>
                              </>
                            ) : (
                              <>
                              <Circle sx={{ color: 'green', marginRight: '8px', height: '12px', width: '12px', marginBottom: '-2px' }} />
                              <span style={{ color: 'green'}}>Done: Part installation done</span>
                              </>
                            )
                          ) : (
                            <>
                              <Circle sx={{ color: '#CFCFCF', marginRight: '8px', height: '12px', width: '12px', marginBottom: '-2px' }} />
                              <span style={{ color: '#CFCFCF' }}>Not started</span>
                              </>
                          )}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
            <Grid container spacing={2} sx={{ alignItems: 'center', padding: '0px 24px 24px 24px' }}>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  label="New Checklist Item"
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  startIcon={<Add />}
                  color="primary"
                  onClick={() => handleAddNewItem(task.id)}
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Accordion>
        ))}
    </div>
  );
};

export default TaskList;
