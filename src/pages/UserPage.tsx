import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../features/users/usersSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { Box, Button, TextField } from '@mui/material';

const UserPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.users.users);

  const handleAddUser = () => {
    if (!userName.trim()) {
      setError('User name cannot be empty');
      return;
    }

    const existingUser = users.find(user => user.name === userName);

    if (existingUser) {
      navigate('/home', { state: { userId: existingUser.id } });
    } else {
      const newUser = { id: `${Date.now()}`, name: userName };
      dispatch(addUser(newUser));
      setUserName('');
      navigate('/home', { state: { userId: newUser.id } });
    }
  };

  const handleTextFieldClick = () => {
    setError('');
  };

  return (
    <div className='App body'>
      <div className='auth-wrapper'>
        <div className="auth-inner">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <h1>Hello, Please add your Username</h1>
            <TextField
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                setError('');
              }}
              onClick={handleTextFieldClick}
              label="User Name"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!error}
              helperText={error}
              autoComplete="off"
            />
            <Button variant="contained" color="primary" onClick={handleAddUser}>
              Add User
            </Button>
          </Box>
        </div>
      </div>

    </div>

  );
};

export default UserPage;
