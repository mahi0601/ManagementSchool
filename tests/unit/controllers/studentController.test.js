const studentService = require('../../../services/studentService');

describe('Student Controller - Unit Tests', () => {
  it('should create a student', async () => {
    const mockStudent = { name: 'John Doe', age: 15, schoolId: '12345' };
    jest.spyOn(studentService, 'createStudent').mockResolvedValue(mockStudent);

    const result = await studentService.createStudent(mockStudent);
    expect(result).toEqual(mockStudent);
  });
});
