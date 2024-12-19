const { body, validationResult } = require('express-validator');

const validateSchoolInput = [
  body('name').notEmpty().withMessage('School name is required'),
  body('address').notEmpty().withMessage('School address is required'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
  
};

const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};



module.exports = { validateSchoolInput, handleValidationErrors,validationMiddleware };
