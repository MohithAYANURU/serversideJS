import Course from "../models/courseModel.js";

const getAllCoursesService = () => {
  return Course.find();
};

const getCourseByIdService = (id) => {
  return Course.findById(id);
};

const createCourseService = (courseData) => {
  return Course.create(courseData);
};

const updateCourseService = (id, courseData) => {
  return Course.findByIdAndUpdate(id, courseData, {
    new: true,
    runValidators: true,
  });
};

const deleteCourseService = (id) => {
  return Course.findByIdAndDelete(id);
};

export {
  getAllCoursesService,
  getCourseByIdService,
  createCourseService,
  updateCourseService,
  deleteCourseService,
};
