const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, deleteUser, getAdminStats, createProject, getAllProjects, getReports, getClients } = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/authMiddleware');


router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.get("/stats",getAdminStats)
router.get('/clients', getClients);
router.post('/projects', protect, authorize('admin'), createProject);
router.get('/all-projects', getAllProjects);
router.get('/get-reports', protect, authorize('admin'), getReports);
router.get('/clients', protect, authorize('admin'), getClients);

module.exports = router;