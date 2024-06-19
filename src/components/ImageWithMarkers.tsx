import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, MenuItem, Select, Typography, Modal, List, ListItem, ListItemText, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Tooltip } from '@mui/material';
import { Task, Marker, addMarker, removeMarker } from '../features/tasks/tasksSlice'; // Ensure removeMarker action is created in tasksSlice
import { RootState } from '../store';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import EditLocationIcon from '@mui/icons-material/EditLocation';

interface ImageWithMarkersProps {
    tasks: Task[];
    userId: string;
    onClose: () => void;
}

const ImageWithMarkers: React.FC<ImageWithMarkersProps> = ({ tasks, userId, onClose }) => {
    const dispatch = useDispatch();
    const markersFromStore = useSelector((state: RootState) =>
        state.tasks.tasks.filter(task => task.userId === userId).flatMap(task => task.markers || [])
    );
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const [markers, setMarkers] = useState<Marker[]>(markersFromStore);
    const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    useEffect(() => {
        // Initialize markers from the Redux store only if markers are not already set
        if (markers.length === 0 && markersFromStore.length > 0) {
            setMarkers(markersFromStore);
        }
    }, [markersFromStore, markers.length]);

    const handleImageClick = (e: React.MouseEvent) => {
        if (selectedTaskId) {
            const rect = (e.target as HTMLImageElement).getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const newMarker = { x, y, taskId: selectedTaskId };
            setMarkers(prevMarkers => [...prevMarkers, newMarker]);
            dispatch(addMarker(newMarker));
        } else {
            alert('Please select a task.');
        }
    };

    const handleMarkerClick = (marker: Marker) => {
        setSelectedMarker(marker);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedMarker(null);
    };

    const handleDeleteMarker = () => {
        if (selectedMarker) {
            setMarkers(markers.filter(marker => marker !== selectedMarker));
            dispatch(removeMarker(selectedMarker));
            handleClosePopup();
            handleCloseDeleteConfirm();
        }
    };

    const handleOpenDeleteConfirm = () => {
        setIsDeleteConfirmOpen(true);
    };

    const handleCloseDeleteConfirm = () => {
        setIsDeleteConfirmOpen(false);
    };

    return (
        <Box>
            <Box sx={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', marginBottom: 2 }}>
                <img
                    src="/image.png"
                    alt="Building"
                    style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                    onClick={handleImageClick}
                />
                {markers.map((marker, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'absolute',
                            top: `${marker.y}px`,
                            left: `${marker.x}px`,
                            transform: 'translate(-50%, -50%)',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleMarkerClick(marker)}
                    >
                        <Tooltip title={tasks.find(task => task.id === marker.taskId)?.name}>
                            <EditLocationIcon sx={{ color: 'red', fontSize: 24 }} />
                        </Tooltip>
                    </Box>
                ))}
            </Box>
            <Select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                displayEmpty
                fullWidth
            >
                <MenuItem value="" disabled>Select Task</MenuItem>
                {tasks.map((task) => (
                    <MenuItem key={task.id} value={task.id}>
                        {task.name}
                    </MenuItem>
                ))}
            </Select>

            <Button variant="contained" color="secondary" onClick={onClose} sx={{ mt: 2 }}>
                Close
            </Button>

            <Modal open={isPopupOpen} onClose={handleClosePopup}>
                <Box
                    sx={{
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
                        overflow: 'auto',
                    }}
                >
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Task Details
                    </Typography>
                    {selectedMarker && (
                        <>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Task: {tasks.find(task => task.id === selectedMarker.taskId)?.name}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Checklist:
                            </Typography>
                            <List>
                                {tasks.find(task => task.id === selectedMarker.taskId)?.checklist.map(item => (
                                    <ListItem key={item.id}>
                                        <ListItemText
                                            primary={item.text}
                                            secondary={item.completed ? 'Completed' : 'Not Completed'}
                                        />
                                        {item.completed ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}
                                    </ListItem>
                                ))}
                            </List>
                            <Divider sx={{ mt: 2, mb: 1 }} />
                            <Grid container spacing={2} justifyContent="flex-end">
                                <Grid item>
                                    <Button variant="contained" color="error" onClick={handleOpenDeleteConfirm} startIcon={<DeleteIcon />}>
                                        Delete Marker
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="secondary" onClick={handleClosePopup} startIcon={<CloseIcon />}>
                                        Close
                                    </Button>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </Box>
            </Modal>

            <Dialog
                open={isDeleteConfirmOpen}
                onClose={handleCloseDeleteConfirm}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this marker?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteConfirm} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteMarker} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ImageWithMarkers;
