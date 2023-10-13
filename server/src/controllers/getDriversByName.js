const axios = require('axios');
const { Driver, Teams } = require('../db');
const { Op } = require('sequelize');

const getDriversByName = async (req, res) => {
    const { name } = req.query;
    

    try {
        const apiResponse = await axios.get(`http://localhost:5000/drivers?name.forename=${name.slice(0,1).toUpperCase() + name.slice(1)}`);
        const apiDrivers = apiResponse.data;

        const dbDrivers = await Driver.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` }
                
            },
            limit: 15,
            include: {
                model: Teams
            }
        });

        const driversByName = [...apiDrivers, ...dbDrivers];

        if (driversByName.length > 0) {
            res.status(200).json(driversByName);
        } else {
            res.status(404).json({ error: 'No se encontraron drivers con el nombre proporcionado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los drivers por nombre' });
    }
}

module.exports = { getDriversByName };