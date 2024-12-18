const schoolService = require('../services/schoolService');

const createSchool = async (req, res, next) => {
  try {
    const school = await schoolService.createSchool(req.body);
    res.status(201).json(school);
  } catch (error) {
    next(error);
  }
};

const getAllSchools = async (req, res, next) => {
  try {
    const schools = await schoolService.getAllSchools();
    res.json(schools);
  } catch (error) {
    next(error);
  }
};

const getSchoolById = async (req, res, next) => {
  try {
    const school = await schoolService.getSchoolById(req.params.id);
    if (!school) return res.status(404).json({ message: 'School not found' });
    res.json(school);
  } catch (error) {
    next(error);
  }
};

const updateSchool = async (req, res, next) => {
  try {
    const updatedSchool = await schoolService.updateSchool(req.params.id, req.body);
    if (!updatedSchool) return res.status(404).json({ message: 'School not found' });
    res.json(updatedSchool);
  } catch (error) {
    next(error);
  }
};

const deleteSchool = async (req, res, next) => {
  try {
    const result = await schoolService.deleteSchool(req.params.id);
    if (!result) return res.status(404).json({ message: 'School not found' });
    res.json({ message: 'School deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { createSchool, getAllSchools, getSchoolById, updateSchool, deleteSchool };
