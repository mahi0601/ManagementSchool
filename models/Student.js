const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  classroomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
});

module.exports = mongoose.model('Student', studentSchema);
