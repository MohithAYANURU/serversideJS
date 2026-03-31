import {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
} from "../services/studentsService.js";

const getAllStudents = (req, res) => {
  const students = getAllStudentsService();
  res.status(200).json(students);
};

const getStudentById = (req, res) => {
  const student = getStudentByIdService(req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
};

const createStudent = (req, res) => {
  const newStudent = createStudentService(req.body);
  res.status(201).json(newStudent);
};

const updateStudent = (req, res) => {
  const updatedStudent = updateStudentService(req.params.id, req.body);

  if (!updatedStudent) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(updatedStudent);
};

const deleteStudent = (req, res) => {
  const deletedStudent = deleteStudentService(req.params.id);

  if (!deletedStudent) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(deletedStudent);
};

export {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
