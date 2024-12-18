const Classroom = require('../models/Classroom');

const createClassroom = async (data) => {
  const classroom = new Classroom(data);
  return await classroom.save();
};

const getAllClassrooms = async () => {
  return await Classroom.find().populate('schoolId', 'name address');
};

const getClassroomById = async (id) => {
  return await Classroom.findById(id).populate('schoolId', 'name address');
};

const updateClassroom = async (id, data) => {
  return await Classroom.findByIdAndUpdate(id, data, { new: true });
};

const deleteClassroom = async (id) => {
  return await Classroom.findByIdAndDelete(id);
};

module.exports = { createClassroom, getAllClassrooms, getClassroomById, updateClassroom, deleteClassroom };
