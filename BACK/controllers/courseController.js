import {
  getAllCoursesService,
  getCourseByIdService,
  createCourseService,
  updateCourseService,
  deleteCourseService,
} from "../services/courseService.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await getAllCoursesService();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving courses" });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await getCourseByIdService(id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: "Invalid course ID format" });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, credits, instructor, semester } = req.body;
    const newCourse = await createCourseService({
      title,
      description,
      credits,
      instructor,
      semester,
    });

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error creating course" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await updateCourseService(id, req.body);

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await deleteCourseService(id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course" });
  }
};
