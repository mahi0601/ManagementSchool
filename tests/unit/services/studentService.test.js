
const mongoose = require('mongoose');
const Student = require('../../../models/Student');
const studentService = require('../../../services/studentService');

jest.mock('../../../models/Student');

describe('Student Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createStudent', () => {
    it('should create and save a new student', async () => {
      const studentData = { name: 'John Doe', age: 15, schoolId: 'schoolId', classroomId: 'classroomId' };
      const savedStudent = { ...studentData, _id: 'studentId' };

      Student.mockImplementation(() => ({ save: jest.fn().mockResolvedValue(savedStudent) }));

      const result = await studentService.createStudent(studentData);

      expect(Student).toHaveBeenCalledWith(studentData);
      expect(result).toEqual(savedStudent);
    });

    it('should handle errors during creation', async () => {
      const studentData = { name: 'John Doe', age: 15, schoolId: 'schoolId', classroomId: 'classroomId' };
      Student.mockImplementation(() => ({ save: jest.fn().mockRejectedValue(new Error('Error saving student')) }));

      await expect(studentService.createStudent(studentData)).rejects.toThrow('Error saving student');
    });
  });

  describe('getAllStudents', () => {
    it('should return all students with populated fields', async () => {
      const students = [
        { name: 'John Doe', schoolId: { name: 'School A' }, classroomId: { name: 'Class A' } },
      ];

      Student.find.mockReturnValue({
        populate: jest.fn().mockResolvedValue(students),
      });

      const result = await studentService.getAllStudents();

      expect(Student.find).toHaveBeenCalled();
      expect(result).toEqual(students);
    });
  });

  describe('getStudentById', () => {
    it('should return a student by ID with populated fields', async () => {
      const studentId = 'studentId';
      const student = { name: 'John Doe', schoolId: { name: 'School A' }, classroomId: { name: 'Class A' } };

      Student.findById.mockReturnValue({
        populate: jest.fn().mockResolvedValue(student),
      });

      const result = await studentService.getStudentById(studentId);

      expect(Student.findById).toHaveBeenCalledWith(studentId);
      expect(result).toEqual(student);
    });

    it('should return null if student does not exist', async () => {
      const studentId = 'nonexistentId';

      Student.findById.mockReturnValue({ populate: jest.fn().mockResolvedValue(null) });

      const result = await studentService.getStudentById(studentId);

      expect(Student.findById).toHaveBeenCalledWith(studentId);
      expect(result).toBeNull();
    });
  });

  describe('updateStudent', () => {
    it('should update a student and return the updated document', async () => {
      const studentId = 'studentId';
      const updateData = { name: 'John Smith' };
      const updatedStudent = { _id: studentId, ...updateData };

      Student.findByIdAndUpdate.mockResolvedValue(updatedStudent);

      const result = await studentService.updateStudent(studentId, updateData);

      expect(Student.findByIdAndUpdate).toHaveBeenCalledWith(studentId, updateData, { new: true });
      expect(result).toEqual(updatedStudent);
    });

    it('should return null if student does not exist', async () => {
      const studentId = 'nonexistentId';
      const updateData = { name: 'John Smith' };

      Student.findByIdAndUpdate.mockResolvedValue(null);

      const result = await studentService.updateStudent(studentId, updateData);

      expect(Student.findByIdAndUpdate).toHaveBeenCalledWith(studentId, updateData, { new: true });
      expect(result).toBeNull();
    });
  });

  describe('deleteStudent', () => {
    it('should delete a student and return the deleted document', async () => {
      const studentId = 'studentId';
      const deletedStudent = { _id: studentId, name: 'John Doe' };

      Student.findByIdAndDelete.mockResolvedValue(deletedStudent);

      const result = await studentService.deleteStudent(studentId);

      expect(Student.findByIdAndDelete).toHaveBeenCalledWith(studentId);
      expect(result).toEqual(deletedStudent);
    });

    it('should return null if student does not exist', async () => {
      const studentId = 'nonexistentId';

      Student.findByIdAndDelete.mockResolvedValue(null);

      const result = await studentService.deleteStudent(studentId);

      expect(Student.findByIdAndDelete).toHaveBeenCalledWith(studentId);
      expect(result).toBeNull();
    });
  });
});
