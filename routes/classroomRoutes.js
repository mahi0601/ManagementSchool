const express = require('express');
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');
const { validateSchoolInput, handleValidationErrors } = require('../middlewares/validationMiddleware');
const {
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  updateClassroom,
  deleteClassroom,
} = require('../controllers/classroomController');

const router = express.Router();

router.post('/', authenticate, authorizeRole(['School Admin']), createClassroom);
router.get('/', authenticate, authorizeRole(['School Admin', 'Superadmin']), getAllClassrooms);
router.get('/:id', authenticate, getClassroomById);
// router.get('/:id', getClassroomById);
router.put('/:id', authenticate, authorizeRole(['School Admin']), updateClassroom);
router.delete('/:id', authenticate, authorizeRole(['School Admin']), deleteClassroom);

module.exports = router;
