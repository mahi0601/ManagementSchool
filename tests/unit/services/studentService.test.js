const Student = require('../../../models/Student');
const studentService = require('../../../services/studentService');

describe('Student Service - Unit Tests', () => {
  it('should create a new student', async () => {
    const studentData = {
      name: 'John Doe',
      schoolId: '507f1f77bcf86cd799439011',
      classroomId: '507f191e810c19729de860ea',
    };

    jest.spyOn(Student.prototype, 'save').mockResolvedValue(studentData);

    const result = await studentService.createStudent(studentData);

    expect(result).toEqual(studentData);
  });
});
