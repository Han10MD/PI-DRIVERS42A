const { Driver } = require('../db');
const { Teams } = require('../db');

const postDrivers = async (req, res) => {
    try {
        const { name, lastName, description, image, nationality, birthDate, teams } = req.body;

        if (!name || !lastName || !description || !image || !nationality || !birthDate || !teams) return res.status(404).send({error: 'No llega info correctamente'})
        
        
        const [newDriver, isCreate] = await Driver.findOrCreate({
            where: {
                name,
                lastName,
                description,
                image,
                nationality,
                birthDate
            }
        });

        if (isCreate) {
            await newDriver.addTeams(teams);
        }

        res.status(200).send({message: "Success"});
    } catch (error) {
        res.status(500).json({ error: 'Ha ocurrido un error en el servidor catch' });
    }
};

module.exports = { postDrivers };



// {
//     "name": "Pepe",
//     "lastName": "Argento",
//     "description": "Corredor Profesional",
//     "image": "",
//     "nationality": "Argentino",
//     "birthDate": "1985-01-07"
// }