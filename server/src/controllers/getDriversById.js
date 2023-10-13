const axios = require('axios');
const { Driver, Teams } = require('../db');

const getDriversById = async (req, res) => {
    const { id } = req.params;


    try {
        const dbDriver = await Driver.findByPk(id, { include: Teams });

        if (dbDriver) {
            res.status(200).json(dbDriver);
        } else {
            throw new Error('Driver not found in the database');
        }
    } catch (error) {

        try {
            const response = await axios.get(`http://localhost:5000/drivers/${id}`);
            const apiDriver = response.data;

            res.status(200).json(apiDriver);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = { getDriversById };