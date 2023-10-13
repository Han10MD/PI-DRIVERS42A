const axios = require('axios');
const { Teams } = require('../db');
const { where } = require('sequelize');
const URL = 'http://localhost:5000/drivers';

const getTeams = async (req, res) => {
  try {
    const { data } = await axios.get(URL);
    let teams = data.map(obj => obj.teams);
    teams = teams.join(',').split(',');
    teams = teams.map(team => team.trim());
    teams = teams.filter(team => team !== '' && team !== 'undefined');
    teams = [...new Set(teams)];

    await Teams.sync({ alter: true });

    for (const team of teams) {
      await Teams.findOrCreate({ where: { name: team } });
    }

    res.status(200).json(await Teams.findAll());
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los teams' });
  }
};

module.exports = { getTeams };
