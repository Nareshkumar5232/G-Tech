const axios = require('axios');

const API_URL = 'https://g-tech-backend-1.onrender.com/api';

async function verify() {
    console.log('--- Verifying Products ---');
    try {
        const res = await axios.get(`${API_URL}/product`);
        const data = res.data;
        const items = Array.isArray(data) ? data : (data.products || []);
        console.log(`Status: ${res.status}`);
        console.log(`Product Count: ${items.length}`);
        if (items.length > 0) {
            console.log('First Product Sample:', JSON.stringify(items[0], null, 2));
        } else {
            console.log('Response Data:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('Product Fetch Failed:', error.message);
        if (error.response) console.error('Response:', error.response.data);
    }

    console.log('\n--- Verifying Orders (Admin) ---');
    try {
        // Login first
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            mail: 'reach2ias@gmail.com',
            password: 'abdul@samad'
        });

        const token = loginRes.data.token;
        console.log('Login Successful. Token obtained.');

        const ordersRes = await axios.get(`${API_URL}/orders/myorders`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log(`Orders Count: ${ordersRes.data.length}`);
        if (ordersRes.data.length > 0) {
            console.log('First Order Sample:', JSON.stringify(ordersRes.data[0], null, 2));
        }
    } catch (error) {
        console.error('Order Verification Failed:', error.message);
        if (error.response) console.error('Response:', error.response.data);
    }
}

verify();
