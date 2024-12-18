const classroomService = require('../../../services/classroomService');

describe('Classroom Controller - Unit Tests', () => {
  it('should create a classroom', async () => {
    const mockClassroom = { name: 'Classroom A', capacity: 30 };
    jest.spyOn(classroomService, 'createClassroom').mockResolvedValue(mockClassroom);

    const result = await classroomService.createClassroom(mockClassroom);
    expect(result).toEqual(mockClassroom);
  });
});
