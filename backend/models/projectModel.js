const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'In Progress', 'Completed'], 
    default: 'Pending' 
  },
  clientId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);