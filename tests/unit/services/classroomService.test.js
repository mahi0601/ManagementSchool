const Classroom = require('../../../models/Classroom');
const classroomService = require('../../../services/classroomService');

describe('Classroom Service - Unit Tests', () => {
  it('should create a new classroom', async () => {
    const classroomData = {
      name: 'Math Class',
      capacity: 30,
      schoolId: '507f1f77bcf86cd799439011',
    };

    jest.spyOn(Classroom.prototype, 'save').mockResolvedValue(classroomData);

    const result = await classroomService.createClassroom(classroomData);

    expect(result).toEqual(classroomData);
  });
});
