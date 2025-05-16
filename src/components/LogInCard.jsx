import React, { useState } from "react";
import { useDispatch } from 'react-redux';;
import { Button, Dialog, DialogActions, DialogContent, Typography, DialogTitle, TextField, Box, Link, Divider, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import { logIn } from '../features/authSlice';

 const LogInCard =({ isOpen, onClose, signUp }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        userId: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
    }));
    setErrors(prev => ({
            ...prev,
            [field]: ''
        }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.userId.trim()) newErrors.userId = 'User Id is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onLogin = () => {
        return dispatch(logIn({ firstName: 'Amritayan', lastName: 'Banerjee' }))
    };

    const handleSubmit = () => {
        if (validate()) {
            onLogin()
        }
    }
    

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle> 
                Welcome to Trip Toe
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    size="small"
                >
                <CloseIcon fontSize="small" />
            </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Sign In or Register to dive into the world of exploration
                </Typography>

                <TextField
                    variant="filled"
                    label="User Id"
                    fullWidth
                    margin="dense"
                    required
                    value={formData.userId}
                    onChange={handleChange('userId')}
                    error={!!errors.userId}
                    helperText={errors.userId}
                />

                <TextField
                    variant="filled"
                    label="Password"
                    type="password"
                    fullWidth
                    margin="dense"
                    required
                    value={formData.password}
                    onChange={handleChange('password')}
                    error={!!errors.password}
                    helperText={errors.password}
                />

                <Box textAlign="right" mt={1}>
                    <Link href="#" underline="hover" variant="body2">
                        Forgot Password?
                    </Link>
                </Box>
            </DialogContent>
            <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', px: 3, pb: 3 }}>
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                    Login
                </Button>

                <Divider />
                
                <Box mt={2} textAlign="center">
                    <Typography variant="body2" gutterBottom>
                        New to TripToe?
                    </Typography>
                    <Button variant="outlined" color="primary" fullWidth onClick={signUp}>
                        Sign Up
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default LogInCard