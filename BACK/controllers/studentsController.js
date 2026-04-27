// TODO 1: Import the functions you need from ../services/studentServiceMongoDB.js
import {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService
} from "../services/studentServiceMongoDB.js";
import jwt from "jsonwebtoken";

const toStudentDTO = (student) => ({
  id: student._id,
  name: student.name,
  email: student.email,
  gpa: student.gpa,
  major: student.major,
  createdAt: student.createdAt,
  updatedAt: student.updatedAt,
});

export const getAllStudents = async (req, res) => {
  try {
    const students = await getAllStudentsService();
    const studentsDTO = students.map(toStudentDTO);
    res.status(200).json(studentsDTO);
  } catch (error) {
    res.status(404).json({ message: "Could not retrieve students" });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await getStudentByIdService(id);
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(toStudentDTO(student));
  } catch (error) {
    res.status(404).json({ message: "Invalid Student ID format" });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, email, password, gpa, major } = req.body;
    const newStudent = { name, email, password, gpa, major };
    const loggedUser = await createStudentService(newStudent);
    const token = jwt.sign({ id: loggedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    }); // signed token with user's id ONLY
    res.status(201).json({ token, user: toStudentDTO(loggedUser) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await updateStudentService(id, req.body);

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(toStudentDTO(updatedStudent));
  } catch (error) {
    res.status(500).json({ message: "Error updating student data" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await deleteStudentService(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    // GDPR: Right to erasure confirmed
    res.status(200).json({ message: "Student record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error fulfilling deletion request" });
  }
};





