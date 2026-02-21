const express = require('express');
const router = express.Router();
const { getAllUsers, updateUser, deleteUser, getAdminStats } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.get("/stats",getAdminStats)

module.exports = router;