import Course from "../models/courseModel.js";

const getAllCoursesService = (studentId) => {
  return Course.find({ student: studentId });
};

const getCourseByIdService = (id, studentId) => {
  return Course.findOne({ _id: id, student: studentId });
};

const findDuplicateCourseService = (studentId, title, semester) => {
  return Course.findOne({ student: studentId, title, semester });
};

const createCourseService = (courseData) => {
  return Course.create(courseData);
};

const updateCourseService = (id, studentId, courseData) => {
  return Course.findOneAndUpdate({ _id: id, student: studentId }, courseData, {
    new: true,
    runValidators: true,
  });
};

const deleteCourseService = (id, studentId) => {
  return Course.findOneAndDelete({ _id: id, student: studentId });
};

export {
  getAllCoursesService,
  getCourseByIdService,
  findDuplicateCourseService,
  createCourseService,
  updateCourseService,
  deleteCourseService,
};
