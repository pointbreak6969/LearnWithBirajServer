import { adminLogin, getAllStudents, deleteStudent } from "../controllers/admin.controller.js";

import {Router} from 'express';
const router = Router();

router.post('/login', adminLogin);
router.get('/getallstudents', getAllStudents);
router.delete("/deletestudent", deleteStudent)

export default router;



