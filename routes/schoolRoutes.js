const express = require('express');
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');
const { validateSchoolInput, handleValidationErrors } = require('../middlewares/validationMiddleware');
const {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
} = require('../controllers/schoolController');

const router = express.Router();

router.post(
  '/',
  authenticate,
  authorizeRole(['Superadmin']),
  validateSchoolInput,
  handleValidationErrors,
  createSchool
);

router.get('/', authenticate, authorizeRole(['Superadmin', 'School Admin']), getAllSchools);
router.get('/:id', authenticate, getSchoolById);
router.put('/:id', authenticate, authorizeRole(['Superadmin']), updateSchool);
router.delete('/:id', authenticate, authorizeRole(['Superadmin']), deleteSchool);

module.exports = router;
