import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Student } from "../models/student.model.js";

const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }
    if (email !== "baralbiraj@gmail.com" || password !== "admin") {
      throw new ApiError(401, "Invalid credentials");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Admin logged in successfully"));
  } catch (error) {
    console.log("Error logging in admin", error);
    throw new ApiError(500, "Internal Server Error");
  }
});
const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const students = await Student.find();
    return res
      .status(200)
      .json(
        new ApiResponse(200, students, "All students fetched successfully")
      );
  } catch (error) {
    console.log("Error fetching students", error);
    throw new ApiError(500, "Internal Server Error");
  }
});
