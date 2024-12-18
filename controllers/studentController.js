const studentService = require('../services/studentService');

const createStudent = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

const getAllStudents = async (req, res, next) => {
  try {
    const students = await studentService.getAllStudents();
    res.json(students);
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
    if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const result = await studentService.deleteStudent(req.params.id);
    if (!result) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };
