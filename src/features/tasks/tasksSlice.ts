// src/features/tasks/tasksSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Marker {
  x: number;
  y: number;
  taskId: string;
}

export interface Task {
  id: string;
  name: string;
  userId: string;
  checklist: ChecklistItem[];
  markers?: Marker[];
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ userId: string, task: Task }>) => {
      state.tasks.push(action.payload.task);
    },
    toggleChecklistItem: (state, action: PayloadAction<{ taskId: string, itemId: string }>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        const item = task.checklist.find(item => item.id === action.payload.itemId);
        if (item) {
          item.completed = !item.completed;
        }
      }
    },
    addChecklistItem: (state, action: PayloadAction<{ taskId: string, newItem: ChecklistItem }>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        task.checklist.push(action.payload.newItem);
      }
    },
    addMarker: (state, action: PayloadAction<Marker>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task) {
        if (!task.markers) {
          task.markers = [];
        }
        task.markers.push(action.payload);
      }
    },
    removeMarker: (state, action: PayloadAction<Marker>) => {
      const task = state.tasks.find(task => task.id === action.payload.taskId);
      if (task && task.markers) {
        task.markers = task.markers.filter(marker => marker.x !== action.payload.x || marker.y !== action.payload.y);
      }
    },
    initializeMarkers: (state, action: PayloadAction<{ userId: string, markers: Marker[] }>) => {
      action.payload.markers.forEach(marker => {
        const task = state.tasks.find(task => task.id === marker.taskId);
        if (task) {
          if (!task.markers) {
            task.markers = [];
          }
          task.markers.push(marker);
        }
      });
    },
  },
});

export const { addTask, toggleChecklistItem, addChecklistItem, addMarker,removeMarker, initializeMarkers  } = tasksSlice.actions;

export default tasksSlice.reducer;
