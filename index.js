const express = require('express');
const app = express();
const port = 3111; 
const axios = require('axios');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
// Ruta principal

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.get('/city', async (req, res) => {
     const city = req.body;
  
    // Verificar si la ciudad se proporcionó correctamente
    if (!city) {
      return res.status(400).send('Se requiere el parámetro "city" en el cuerpo de la solicitud');
    } 
    const apiKey = "0e6c5765f0d4918426a525dd5e23fb62";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}i&appid=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      // Devolver los datos obtenidos de la API
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'No se pudo obtener la información de la ciudad proporcionada' });
    }
  });


  app.post('/days', async (req, res) => {
    const city = req.body.city;
 
   // Verificar si la ciudad se proporcionó correctamente
   if (!city) {
     return res.status(400).send('Se requiere el parámetro "city" en el cuerpo de la solicitud');
   }  
   const apiKey = "TXD94CRES28LMJ5FA8P3A34LA";
   const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`
  
   try {
     const response = await axios.get(url);
     // Devolver los datos obtenidos de la API
     res.json(response.data);
   } catch (error) {
     res.status(500).json({ error: 'No se pudo obtener la información de la ciudad proporcionada' });
   }
 });



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});