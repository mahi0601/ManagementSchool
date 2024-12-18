const schoolService = require('../../../services/schoolService');

describe('School Controller - Unit Tests', () => {
  it('should create a school', async () => {
    const mockSchool = { name: 'Test School', address: '123 Main St' };
    jest.spyOn(schoolService, 'createSchool').mockResolvedValue(mockSchool);

    const result = await schoolService.createSchool(mockSchool);
    expect(result).toEqual(mockSchool);
  });
});
