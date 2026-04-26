import User from "../models/userModel.js";
import students from "../data/students.js";
import bcrypt from "bcrypt";

const getAllStudentsService = () => {
  return User.find();
};

const getStudentByIdService = (id) => {
  return User.findById(id);
};

// const hashPassword = async (password) => {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };
const createStudentService = async (studentData) => {
  console.log("Creating student with data:", studentData); 
  try {
    const hashedPassword = await bcrypt.hash(studentData.password, 10);
    console.log("Hashed password:", hashedPassword);
    studentData.password = hashedPassword;
    const newStudent = new User(studentData);

    await newStudent.save();
  } catch (error) {
    throw new Error("Error creating student: " + error.message);  
    
  }

  

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
  deleteStudentService
};