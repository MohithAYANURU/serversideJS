import User from "../models/userModel.js";
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
    return newStudent;
  } catch (error) {
    throw new Error("Error creating student: " + error.message);  
    
  }

  

};
const updateStudentService = (id, studentData) => {
  const updatedStudentData = { ...studentData };

  if (updatedStudentData.password) {
    return bcrypt.hash(updatedStudentData.password, 10).then((hashedPassword) => {
      updatedStudentData.password = hashedPassword;
      return User.findByIdAndUpdate(id, updatedStudentData, {
        new: true,
        runValidators: true,
      });
    });
  }

  return User.findByIdAndUpdate(id, studentData, {
    new: true,
    runValidators: true,
  });
};

const deleteStudentService = (id) => {
  return User.findByIdAndDelete(id);
};




export {
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService
};
