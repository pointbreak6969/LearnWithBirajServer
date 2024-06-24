import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {  Student } from "../models/student.model.js";

const registerStudent = asyncHandler(async (req, res)=>{
    try {
        const {name, email, phone, subjects } = req.body;
        if (!name || !email || !phone || !subjects) {
            throw new ApiError(400, "All fields are required");
        }
        const existingUser = await Student.findOne({email});
        if (existingUser) {
            throw new ApiError(400, "User already exists");
        }
        const newStudent = await Student.create({
            name, email, phone, subjects: {
                DSA: subjects.DSA || false,
                OOPS: subjects.OOPS || false,
            }
        });
        if (!newStudent) {
            throw new ApiError(500, "Student not registered");
        }
        return res.status(201).json(new ApiResponse(201, newStudent, "Student registered successfully"));
    } catch (error) {
        console.log("Error registering student", error);
        throw new ApiError(500, "Internal Server Error");
    }
})

export {registerStudent};