const School = require('../models/School');

const createSchool = async (data) => {
  const school = new School(data);
  return await school.save();
};

const getAllSchools = async () => {
  return await School.find();
};

const getSchoolById = async (id) => {
  return await School.findById(id);
};

const updateSchool = async (id, data) => {
  return await School.findByIdAndUpdate(id, data, { new: true });
};

const deleteSchool = async (id) => {
  return await School.findByIdAndDelete(id);
};

module.exports = { createSchool, getAllSchools, getSchoolById, updateSchool, deleteSchool };
