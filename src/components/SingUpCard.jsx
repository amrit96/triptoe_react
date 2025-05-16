import React, { useState } from "react";
// import { useDispatch } from 'react-redux';;
import { Button, Dialog, DialogActions, DialogContent, Typography, DialogTitle, TextField, Box, Link, Divider, IconButton, InputAdornment } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CloseIcon from '@mui/icons-material/Close';

import ListInfoTooltip from "./ListInfoToolTip";

import REGEX from "../constants/regex";

import { styled } from '@mui/material/styles';

const RegistrationForm = styled("div")(() => ({
    height: "100%",
    width: "99%",
    padding: "2px",
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
}));

const FormRow = styled("div")(() => ({
    display: "flex",
    margin: "2px",
}))

 const SignUpCard =({ isOpen, onClose, logIn }) => {

    const passwordRules = [
        'At least 8 characters',
        '1+ lowercase letter',
        '1+ uppercase letter',
        '1+ number',
        '1+ special character: < > * _ - ( ) [ ] +'
    ];
    
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        mobile: '',
        dob: null,
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        setErrors({ ...errors, [field]: '' }); // clear error on change
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, dob: date });
        setErrors({ ...errors, dob: '' });
    };

    const onSignUp = () => {
        //implement Registration
        logIn()
    }

    const validate = () => {
        const newErrors = {};
        const passwordRegex = REGEX.password;
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }else if (!passwordRegex.test(formData.password.trim())) {
            newErrors.password = 'Weak password';
        }
    
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = () => {
        if (validate()) {
            onSignUp();
        }
    };

    const closeAndSwitch = () => {
        setFormData({
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            mobile: '',
            dob: null,
            password: '',
        })
        setErrors({})
        logIn()
    }

    const clearAndClose = () => {
        setFormData({
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            mobile: '',
            dob: null,
            password: '',
        })
        setErrors({})
        onClose()
    }

    const today = new Date();

    return (
        <Dialog open={isOpen} onClose={clearAndClose}>
            <DialogTitle> 
                Sign Up to Trip Toe
                <IconButton
                    aria-label="close"
                    onClick={clearAndClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    size="dense"
                >
                <CloseIcon fontSize="dense" />
            </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <Typography gutterBottom>
                    Sign up to dive into the world of exploration
                </Typography>
                <RegistrationForm>
                    <FormRow>
                        <TextField 
                            variant="filled" 
                            label="Firtst Name"  
                            margin="dense" 
                            required 
                            fullWidth
                            value={formData.firstName}
                            onChange={handleChange('firstName')}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                            sx={{marginRight: "3px"}}
                        />
                        <TextField 
                            variant="filled" 
                            label="Middle Name"  
                            margin="dense"  
                            fullWidth
                            value={formData.middleName}
                            onChange={handleChange('middleName')}
                            error={!!errors.middleName}
                            helperText={errors.middleName}
                            sx={{marginRight: "3px", marginLeft: "3px"}}
                        />
                        <TextField 
                            variant="filled"
                            label="Last Name"
                            margin="dense"
                            required
                            fullWidth
                            value={formData.lastName}
                            onChange={handleChange('lastName')}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                            sx={{marginLeft: "3px"}}
                        />
                    </FormRow>
                    <FormRow>
                        <TextField 
                            variant="filled"
                            label="Email"
                            type="email"
                            fullWidth
                            margin="dense"
                            required
                            value={formData.email}
                            onChange={handleChange('email')}
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{marginRight: "3px"}}
                        />
                        <TextField 
                            variant="filled"
                            label="Mobile"
                            fullWidth
                            margin="dense"
                            required
                            value={formData.mobile}
                            onChange={handleChange('mobile')}
                            error={!!errors.mobile}
                            helperText={errors.mobile}
                            sx={{marginLeft: "3px"}}
                        />
                    </FormRow>
                    <FormRow>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Birth"
                                value={formData.dob}
                                onChange={handleDateChange}
                                maxDate={today}
                                format="yyyy-MM-dd"
                                slotProps={{
                                  textField: {
                                    variant: 'filled',
                                    fullWidth: true,
                                    margin: 'dense',
                                    required: true,
                                    error: !!errors.dob,
                                    helperText: errors.dob,
                                  },
                                }}
                            />
                        </LocalizationProvider>
                    </FormRow>
                    <FormRow>
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
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <ListInfoTooltip infoList={passwordRules} />
                                  </InputAdornment>
                                ),
                            }}
                        />
                    </FormRow>
                </RegistrationForm>
            </DialogContent>
            <DialogActions sx={{ flexDirection: 'column', alignItems: 'stretch', px: 3, pb: 3 }}>
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                    Sign Up
                </Button>
                <Divider />
                <Box mt={2} textAlign="center">
                    <Typography variant="body2" gutterBottom>
                        Already Registered to TripToe?
                    </Typography>
                    <Button variant="outlined" color="primary" fullWidth onClick={closeAndSwitch}>
                        Sign In
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

export default SignUpCard