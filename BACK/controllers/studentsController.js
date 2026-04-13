// TODO 1: Import the functions you need from ../services/studentServiceMongoDB.js
import { 
  getAllStudentsService,
  getStudentByIdService,
  createStudentService,
  updateStudentService,
  deleteStudentService
} from "../services/studentServiceMongoDB.js";

// TODO 2: Implement each controller below

export const getAllStudents = async (req, res) => {
  try {
    // We MUST await the service because database calls are asynchronous
    const students = await getAllStudentsService();
    res.status(200).json(students);
  } catch (error) {
    // GDPR/Security: Don't leak system details, just a clean error message
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
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: "Invalid Student ID format" });
  }
};

export const createStudent = async (req, res) => {
  try {
    // GDPR Tip: Destructure to ensure you only take what's allowed
    const { name, email, password } = req.body;
    
    // Service handles hashing (bcrypt) before saving to MongoDB
    const newStudent = await createStudentService({ name, email, password });
    
    res.status(201).json({ 
      message: "Student created successfully", 
      studentId: newStudent._id 
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating student: " + error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await updateStudentService(id, req.body);

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
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

