import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Student } from "../models/student.model.js";
import { Admin } from "../models/admin.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import { getResetPasswordToken } from "../utils/ResetPassword.js";
const adminRegister = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      throw new ApiError(400, "Admin already exists");
    }
    const admin = await Admin.create({ email, password });
    return res
      .status(201)
      .json(new ApiResponse(201, admin, "Admin registered successfully"));
  } catch (error) {
    console.log("Error registering admin", error);
    throw new ApiError(500, "Internal Server Error");
  }
});
const adminLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }
    const isPasswordCorrect = await admin.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
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
const adminLogout = asyncHandler(async (req, res) => {
  try {
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Admin logged out successfully"));
  } catch (error) {
    console.log("Error logging out admin", error);
    throw new ApiError(500, "Internal Server Error");
  }
});
const adminForgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    const admin = await Admin.findOne({ email });
    const resetToken = getResetPasswordToken();
    await admin.save();
    const sendEmailResponse = await sendEmail({
      userEmail: email,
      resetToken,
    });
    // Send email with resetToken
    return res
      .status(200)
      .json(
        new ApiResponse(200, sendEmailResponse, "Reset password email sent")
      );
  } catch (error) {
    console.log("Error forgot password", error);
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
const deleteStudent = asyncHandler(async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }
    await student.remove();
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Student deleted successfully"));
  } catch (error) {
    console.log("Error deleting student", error);
    throw new ApiError(500, "Internal Server Error");
  }
});
export { adminLogin, getAllStudents, deleteStudent };
