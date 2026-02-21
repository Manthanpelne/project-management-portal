const User = require('../models/User');

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Don't send passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};


//update
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user' });
  }
};



//delete
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: 'User removed successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
};


exports.getAdminStats = async (req, res) => {
  const totalUsers = await User.countDocuments({ role: 'user' });
  const totalClients = await User.countDocuments({ role: 'client' });
  res.json({ totalUsers, totalClients });
};