import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'https://ncuappteam.github.io', credentials: true }));

// OAuth Token Exchange Endpoint
app.post('/api/oauth/token', async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: '缺少授權碼 (code)' });
    }

    try {
        const body = new URLSearchParams({
            client_id: process.env.VITE_NCU_PORTAL_CLIENT_ID,
            client_secret: process.env.VITE_NCU_PORTAL_CLIENT_SECRET,
            code,
            redirect_uri: 'https://ncuappteam.github.io/callback',
            grant_type: 'authorization_code',
        });

        const tokenResponse = await fetch('https://portal.ncu.edu.tw/oauth2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString(),
        });

        if (!tokenResponse.ok) {
            return res.status(tokenResponse.status).json({ error: 'OAuth token 交換失敗' });
        }

        const tokenData = await tokenResponse.json();
        res.json(tokenData);
    } catch (error) {
        console.error('伺服器錯誤:', error);
        res.status(500).json({ error: '伺服器錯誤', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
