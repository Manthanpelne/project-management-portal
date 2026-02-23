const projectModel = require("../models/projectModel");
const userModel = require("../models/userModel");


//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}).select('+password'); // Don't send passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};


//update
exports.updateUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
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
    const user = await userModel.findById(req.params.id);
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
  const totalUsers = await userModel.countDocuments({ role: 'user' });
  const totalClients = await userModel.countDocuments({ role: 'client' });
  res.json({ totalUsers, totalClients });
};


//Create a new project and assign to a client
exports.createProject = async (req, res) => {
  const { title, description, clientId } = req.body;

  try {
    const project = await projectModel.create({
      title,
      description,
      clientId
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project' });
  }
};


//  Get all projects for the admin list

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectModel.find({}).populate('clientId', 'name email');
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};



exports.getReports = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalClients = await userModel.countDocuments({ role: 'client' }); 
    
    const totalProjects = await projectModel.countDocuments();
    
    const projectsByStatus = await projectModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    
    const detailedProjects = await projectModel.find({}).populate('clientId', 'name email');

    res.json({
      summary: { totalUsers, totalClients, totalProjects, projectsByStatus },
      detailedProjects
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating report' });
  }
};



exports.getClients = async (req, res) => {
  try {
    const clients = await User.find({ role: 'client' }).select('-password');
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching clients" });
  }
};