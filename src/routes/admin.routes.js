import { adminLogin, getAllStudents, deleteStudent, adminForgotPassword, adminLogout, adminLogin, adminRegister } from "../controllers/admin.controller.js";

import {Router} from 'express';
const router = Router();

router.post('/login', adminLogin);
router.get('/getallstudents', getAllStudents);
router.delete("/deletestudent", deleteStudent)
router.route("/adminregister").post(adminRegister);
router.route("/adminForgotPassword").post(adminForgotPassword);
router.route("/adminLogout").post(adminLogout);
router.route("/adminLogin").post(adminLogin);
export default router;



