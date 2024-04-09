const express = require('express');
const axios = require('axios');
const WebSocket = require('ws');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors')


const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
dotenv.config();
app.use(express.json());
// app.use(cors())

app.use(cors({
  origin: 'http://localhost:3000',
  
}));
const apiKey = '49a93aadde7bfaf18d8929dff0e9f1e5'; 

// API endpoint to fetch weather data
app.post('/api/weather', async (req, res) => {
  try {
    const { longitude, latitude } = req.body;

    
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);

    res.json({
      location: data.name,
      temperature: data.main.temp,
      conditions: data.weather[0].description
      
    });
    console.log(data)
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


wss.on('connection', (ws) => {
 
  const interval = setInterval(async () => {
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`);

      ws.send(JSON.stringify({
        location: data.name,
        temperature: data.main.temp,
        conditions: data.weather[0].description
        
      
      }));
      console.log(data)
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, 30000);

  ws.on('close', () => {
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
