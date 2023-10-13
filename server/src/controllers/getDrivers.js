const axios = require('axios');
const { Driver, Teams } = require('../db');
const URL = 'http://localhost:5000/drivers';

const getDrivers = async (req, res) => {
  try {
    const response = await axios.get(URL);
    const driversApi = response.data;



    const driversDb = await Driver.findAll({ include: Teams});

    const drivers = [...driversApi, ...driversDb];

    const driversWithDefaultImage = drivers.map(driver => {
      if (!driver.image.url) {
        driver.image.url = 'https://cdn-1.motorsport.com/images/amp/68eyZ1B0/s1000/f1-f1-logo-2017-f1-logo-6693340.jpg';
      }
      return driver;
    });

    res.status(200).json(driversWithDefaultImage);
  } catch (error) {
    console.error('Error al obtener los drivers:', error);
    res.status(500).json({ error: 'Error al obtener los drivers' });
  }
};

module.exports = { getDrivers };