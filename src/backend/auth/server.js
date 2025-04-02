import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CLIENT_ID = process.env.VITE_NCU_PORTAL_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_NCU_PORTAL_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5173/callback";

app.post('/oauth2/token', async (req, res) => {
    // console.log("Received request body:", req.body); // Debugging log

    const { code } = req.body;
    // console.log(code);
    if (!code) {
        console.error("Missing parameters:", req.body);
        return res.status(400).json({ error: "invalid_request", message: "Missing required parameters" });
    }

    const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    // console.log(CLIENT_ID);
    // console.log(CLIENT_SECRET);

    try {
        const response = await fetch("https://portal.ncu.edu.tw/oauth2/token", {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${authHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: new URLSearchParams({
                code,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            }).toString()
        });

        const data = await response.json();
        if (!response.ok) {
            return res.status(400).json({ error: data.error, message: "OAuth token exchange failed" });
        }

        res.json(data);
    } catch (error) {
        console.error("OAuth error:", error);
        res.status(500).json({ error: "server_error" });
    }
});

app.get('/oauth2/userinfo', async (req, res) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
       return res.status(401).json({ error: "Unauthorized", message: "Missing Authorization header" });
    }

    try {
       const response = await fetch("https://portal.ncu.edu.tw/apis/oauth/v1/info", {
           method: 'GET',
           headers: {
               'Authorization': authHeader,
               'Accept': 'application/json'
           }
       });

       if(!response.ok) {
          throw new Error(`Failed to fetch user info: ${response.statusText}`);
       }

       const userData = await response.json();
       res.json(userData);
    } catch(error) {
        console.error("User info fetch error: ", error);
        res.status(500).json({ error: "server_error", message: "Failed to retrieve user info" });
    }
});


app.listen(3000, () => {
    console.log("OAuth server running on http://localhost:3000");
});