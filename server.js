const express = require('express');
const fetch = require('node-fetch'); // Or import fetch if you are using ES modules
const app = express();
const port = 3000;

const apiKey = 'f00c38e0279b7bc85480c3fe775d518c'; // Your OpenWeather API key

// Weather route
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City name is required.' });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            res.json(data);
        } else {
            res.status(404).json({ error: 'City not found' });
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});
