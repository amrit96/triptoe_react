import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, Typography, DialogTitle, TextField, Box, Link, Divider, IconButton, Alert, Snackbar, InputAdornment } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';

import { logIn } from '../features/authSlice';
import { signInUser } from "../services/auth.services";
import { Visibility, VisibilityOff } from "@mui/icons-material";

 const LogInCard =({ isOpen, onClose, signUp }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    }); 
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState({
        open: false,
        type: 'success', // 'success' | 'error'
        message: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onLogin = async () => {
        const {status, message, user, access_token} = await signInUser(formData)
        
        if (status) {
            dispatch(logIn(user))
            Cookies.set('token', access_token, { expires: 1 });
            showAlert('success', message)
            clearAndClose();
        } else {
            showAlert('error', message)
        }
    };

    const handleSubmit = async() => {
        if (validate()) {
            await onLogin()
        }
    }

    const clearAndSwitch = () => {
        setFormData({
            email: '',
            password: ''
        });
        setErrors({});
        setShowPassword(false);
        signUp();
    }

    const clearAndClose = () => {
        setFormData({
            email: '',
            password: ''
        });
        setErrors({});
        setShowPassword(false);
        onClose();
    }

    const showAlert = (type, message) => {
        console.log("Alert Message: ", message)
        setAlert({ open: true, type, message });
    };

    const handleCloseAlert = (_, reason) => {
        if (reason === 'clickaway') return;
        setAlert({ ...alert, open: false });
    };
    

    return (
        <>
            <Dialog open={isOpen} onClose={clearAndClose}>
                <DialogTitle> 
                    Welcome to Trip Toe
                    <IconButton
                        aria-label="close"
                        onClick={clearAndClose}
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
                        label="Email"
                        fullWidth
                        margin="dense"
                        required
                        value={formData.email}
                        onChange={handleChange('email')}
                        error={!!errors.email}
                        helperText={errors.email}
                    />

                    <TextField
                        variant="filled"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        margin="dense"
                        required
                        value={formData.password}
                        onChange={handleChange('password')}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                        size="small"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
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
                        <Button variant="outlined" color="primary" fullWidth onClick={clearAndSwitch}>
                            Sign Up
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={alert.open}
                autoHideDuration={4000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
                    {alert.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default LogInCard