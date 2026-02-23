const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getClientProjects, updateProjectStatus } = require('../controllers/clientController');
const router = express.Router();


router.use(protect);
router.use(authorize('client'));

router.get('/projects', getClientProjects);
router.put('/project/:id', updateProjectStatus);

module.exports = router;