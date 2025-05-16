// src/api/auth.js
import axios from 'axios';
import ROUTES from '../constants/routes';

export const signUpUser = async (userData) => {
    const headers = {
        'Content-Type': 'application/json', // 👈 Add this
      }
    try {
        const response = await axios.post(
            `${ROUTES.base}${ROUTES.signUpUser}`, 
            userData,
            {headers}
        );
        console.log("SUCCESS ", response)
        return {status: true, response: `Welcome, ${response.data.first_name}! Sign-up successful.`}
    } catch (error) {
        console.log("FAILED ", error)
        return {status: false, response: error.response.data.error}
    }
};
