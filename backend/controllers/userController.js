const userModel = require("../models/userModel");

// Update user profile (Name, Email, Password, Image)
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (user) {
      // Update fields if they are provided in the request body
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      // If your assignment requires profile images
      if (req.body.profileImage) {
        user.profileImage = req.body.profileImage;
      }

      // If a new password is provided
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
        message: "Profile updated successfully"
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};