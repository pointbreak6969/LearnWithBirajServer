import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Query } from "../models/query.model.js";
import { Student } from "../models/student.model.js";
const postQuery = asyncHandler(async (req, res) => {
    try {
        const { email, query } = req.body;
        if (!email || !query) {
            throw new ApiError(400, "All fields are required");
        }
        const existingUser = await Student.findOne({ email });
        if (!existingUser) {
            throw new ApiError(400, "User does not exist");
        }
        const newQuery = await Query.create({
            email,
            query,
        });
        if (!newQuery) {
            throw new ApiError(500, "Query not posted");
        }
        return res.status(201).json(new ApiResponse(201, newQuery, "Query posted successfully"));
    } catch (error) {
        console.log("Error posting query", error);
        throw new ApiError(500, "Internal Server Error");
    }
}
);

export { postQuery };