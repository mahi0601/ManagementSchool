const express = require('express');
const { authenticate, authorizeRole } = require('../middlewares/authMiddleware');
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

const router = express.Router();

router.post('/', authenticate, authorizeRole(['School Admin']), createStudent);
router.get('/', authenticate, authorizeRole(['School Admin', 'Superadmin']), getAllStudents);
router.get('/:id', authenticate, getStudentById);
router.put('/:id', authenticate, authorizeRole(['School Admin']), updateStudent);
router.delete('/:id', authenticate, authorizeRole(['School Admin']), deleteStudent);

module.exports = router;
