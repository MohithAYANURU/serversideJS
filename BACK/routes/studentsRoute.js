import express from "express";
import multerConfig from  "../middleware/multer-config.js";
import { validateStudent } from "../middleware/validateStudent.js";
import { authCheck } from "../middleware/auth-middleware.js";

// TODO 1: Import getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent
//         from ../controllers/studentsController.js
import {
    getAllStudents, 
    getStudentById, 
    createStudent, 
    updateStudent, 
    deleteStudent
} from "../controllers/studentsController.js";

const studentRouter = express.Router();


studentRouter.post(
  "/signup",
  (req, res, next) => {
    multerConfig(req, res, (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(400).json({ error: err.message });
      }
      console.log("req.file:", req.file);
      console.log("req.body:", req.body);
      next();
    });
  },
  validateStudent,
  createStudent
);



// TODO 2: Wire up the routes:
//   GET    /        → getAllStudents
//   GET    /:id     → getStudentById
//   POST   /        → createStudent
//   PUT    /:id     → updateStudent
//   DELETE /:id     → deleteStudent

studentRouter.get("/", getAllStudents);
studentRouter.get("/:id", authCheck, getStudentById);
studentRouter.post("/", validateStudent, createStudent);
studentRouter.put("/:id", authCheck, validateStudent, updateStudent);
studentRouter.delete("/:id", authCheck, deleteStudent);
export default studentRouter;


