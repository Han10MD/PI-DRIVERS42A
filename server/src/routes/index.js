const { Router } = require("express");
const { getDrivers } = require('../controllers/getDrivers');
const { getDriversByName } = require('../controllers/getDriversByName');
const { postDrivers } = require('../controllers/postDrivers');
const { getTeams } = require('../controllers/getTeams');
const { getDriversById } = require('../controllers/getDriversById');

const router = Router();

router.get('/', getDrivers)
router.get('/name', getDriversByName)
router.get('/teams', getTeams)
router.get('/:id', getDriversById)
router.post('/', postDrivers);

module.exports = router;
