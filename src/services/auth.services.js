// src/api/auth.js
import axios from 'axios';
import ROUTES from '../constants/routes';


export const signUpUser = async (userData) => {
    const headers = {
        'Content-Type': 'application/json',
      }
    try {
        const response = await axios.post(
            `${ROUTES.base}${ROUTES.signUpUser}`, 
            userData,
            {headers}
        );
        console.log("SUCCESS ", response)
        return {status: true, message: `Welcome, ${response.data.first_name}! Sign-up successful.`}
    } catch (error) {
        console.log("FAILED ", error)
        return {status: false, message: error.response.data.error}
    }
};

export const signInUser = async (userData) => {
    const headers = {
        'Content-Type': 'application/json',
      }
    try {
        const response = await axios.post(
            `${ROUTES.base}${ROUTES.signInUser}`, 
            userData,
            {headers}
        );
        console.log("SUCCESS ", response)
        return {
            status: true,
            message: `Welcome, ${response.data.user.first_name}`,
            user: {
                id: response.data.user.id,
                firstName: response.data.user.first_name,
                middleName: response.data.user.middle_name,
                profilePicture: response.data.user.profile_picture,
                meta: response.data.user.meta,
                email: response.data.user.email,
                mobile: response.data.user.mobile
            },
            access_token: response.data.access_token,
        }
    } catch (error) {
        console.log("FAILED ", error.response.data.error)
        return {status: false, message: error.response.data.error}
    }
};
