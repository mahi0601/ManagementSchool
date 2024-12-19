const { notFoundHandler, errorHandler } = require('../../../middlewares/errorMiddleware');

const mockRequest = (overrides = {}) => ({ originalUrl: '/test-route', ...overrides });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
const mockNext = jest.fn();

describe('Error Middleware', () => {
  describe('notFoundHandler', () => {
    it('should set a 404 status and pass an error to next', () => {
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext;

      notFoundHandler(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
      expect(next.mock.calls[0][0].message).toBe('Route /test-route not found');
    });
  });

  describe('errorHandler', () => {
    it('should handle an error and send a response with status 500', () => {
      const err = new Error('Test Error');
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext;

      res.statusCode = 200; 
      errorHandler(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Test Error',
        stack: expect.any(String),
      });
    });

    it('should use the provided status code if already set', () => {
      const err = new Error('Test Error');
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext;

      res.statusCode = 400; 
      errorHandler(err, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Test Error',
        stack: expect.any(String),
      });
    });

    it('should hide the stack trace in production mode', () => {
      const err = new Error('Test Error');
      const req = mockRequest();
      const res = mockResponse();
      const next = mockNext;

      process.env.NODE_ENV = 'production';
      res.statusCode = 500;
      errorHandler(err, req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Test Error',
        stack: null,
      });

      process.env.NODE_ENV = 'test'; 
    });
  });
});
