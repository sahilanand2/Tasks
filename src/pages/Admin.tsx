import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const Admin: React.FC = () => {
    const users = useSelector((state: RootState) => state.users.users);

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
                            minHeight: '40vh',
                            textAlign: 'center'
                        }}>
                        <h1>Hello Admin, Here is the list of all the users: </h1>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>User ID</TableCell>
                                        <TableCell>Username</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, index) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            </div>

        </div>
    );
};

export default Admin;
