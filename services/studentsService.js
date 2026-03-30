import students from "../students.js";

const getAllStudentsService = () => {
  return students;
};

const getStudentByIdService = (id) => {
  return students.find((student) => student.id === Number(id));
};

const createStudentService = (studentData) => {
  const newStudent = {
    id: students.length + 1,
    ...studentData,
  };

  students.push(newStudent);
  return newStudent;
};

const updateStudentService = (id, studentData) => {
  const student = students.find((student) => student.id === Number(id));

  if (!student) {
    return null;
  }

  student.name = studentData.name;
  student.email = studentData.email;
  student.major = studentData.major;
  student.gpa = studentData.gpa;

  return student;
};

const deleteStudentService = (id) => {
  const index = students.findIndex((student) => student.id === Number(id));

  if (index === -1) {
    return null;
  }

  const deletedStudents = students.splice(index, 1);
  return deletedStudents[0];
};

export {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
};