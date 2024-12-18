const classroomService = require('../services/classroomService');

const createClassroom = async (req, res, next) => {
  try {
    const classroom = await classroomService.createClassroom(req.body);
    res.status(201).json(classroom);
  } catch (error) {
    next(error);
  }
};

const getAllClassrooms = async (req, res, next) => {
  try {
    const classrooms = await classroomService.getAllClassrooms();
    res.json(classrooms);
  } catch (error) {
    next(error);
  }
};

const getClassroomById = async (req, res, next) => {
  try {
    const classroom = await classroomService.getClassroomById(req.params.id);
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });
    res.json(classroom);
  } catch (error) {
    next(error);
  }
};

const updateClassroom = async (req, res, next) => {
  try {
    const updatedClassroom = await classroomService.updateClassroom(req.params.id, req.body);
    if (!updatedClassroom) return res.status(404).json({ message: 'Classroom not found' });
    res.json(updatedClassroom);
  } catch (error) {
    next(error);
  }
};

const deleteClassroom = async (req, res, next) => {
  try {
    const result = await classroomService.deleteClassroom(req.params.id);
    if (!result) return res.status(404).json({ message: 'Classroom not found' });
    res.json({ message: 'Classroom deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createClassroom, getAllClassrooms, getClassroomById, updateClassroom, deleteClassroom };
