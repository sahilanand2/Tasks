// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import './styles.css';
import ImageWithMarkers from '../components/ImageWithMarkers';

const HomePage: React.FC = () => {
  const location = useLocation();
  const { userId } = location.state as { userId: string };
  const user = useSelector((state: RootState) => state.users.users.find(user => user.id === userId));
  const tasks = useSelector((state: RootState) => state.tasks.tasks.filter(task => task.userId === userId));
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!user) {
    return <p>User not found</p>;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='App body'>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '40vh', // Ensure it fills the entire viewport height
              }}
            >
              <Paper sx={{ p: 3, mb: 3, width: '100%', textAlign: 'center' }}>
                <h1>
                  Welcome, {user.name}
                </h1>
                <TaskForm selectedUserId={userId} />
              </Paper>
              <Paper sx={{ p: 3, width: '100%' }}>
                <TaskList selectedUserId={userId} />
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                  Add Task to Image
                </Button>
              </Paper>
            </Box>
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '600px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <h1>
            Add Task to Image
          </h1>
          <ImageWithMarkers tasks={tasks} userId={userId} onClose={handleCloseModal} />
        </Box>
      </Modal>
    </>


  );
};

export default HomePage;
