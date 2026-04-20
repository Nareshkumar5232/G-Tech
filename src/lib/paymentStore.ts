
import axios from 'axios';

const API_URL = 'https://g-tech-backend-1.onrender.com/api';
const STORAGE_KEYS = {
    TOKEN: 'gtech_token',
};

const getAuthHeader = () => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createCashfreeOrder = async (amount: number, currency: string = "INR") => {
    try {
        const res = await axios.post(`${API_URL}/payment/create-order`, { amount, currency }, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        console.error("Error creating Cashfree order:", error);
        throw error;
    }
};

export const verifyCashfreePayment = async (paymentData: any) => {
    try {
        const res = await axios.post(`${API_URL}/payment/verify-payment`, paymentData, { headers: getAuthHeader() });
        return res.data;
    } catch (error) {
        console.error("Error verifying Cashfree payment:", error);
        throw error;
    }
};
