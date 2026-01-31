
import axios from 'axios';

const API_URL = 'https://g-tech-backend-1.onrender.com/api';
const STORAGE_KEYS = {
    TOKEN: 'gtech_token',
};

// Helper to get auth header
const getAuthHeader = () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return token ? { Authorization: `Bearer ${token}` } : {};
};


export const createRazorpayOrder = async (amount: number, currency: string = "INR") => {
    try {
        const res = await axios.post(`${API_URL}/payment/create-order`, { amount, currency }, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        throw error;
    }
};

export const verifyPayment = async (paymentData: any) => {
    try {
        const res = await axios.post(`${API_URL}/payment/verify-payment`, paymentData, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        console.error("Error verifying payment:", error);
        throw error;
    }
};
