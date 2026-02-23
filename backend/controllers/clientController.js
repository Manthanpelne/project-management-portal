const projectModel = require("../models/projectModel");


exports.getClientProjects = async (req, res) => {
  try {
    // req.user.id comes from our 'protect' middleware
    const projects = await projectModel.find({ clientId: req.user.id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};



exports.updateProjectStatus = async (req, res) => {
  try {
    const project = await projectModel.findById(req.params.id);
    if (project && project.clientId.toString() === req.user.id) {
      project.status = req.body.status || project.status;
      await project.save();
      res.json(project);
    } else {
      res.status(403).json({ message: 'Not authorized or project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating status' });
  }
};