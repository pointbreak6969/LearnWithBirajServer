import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  subjects: {
    DSA: {
      type: Boolean,
    },
    OOPS: {
      type: Boolean,
    },
  },
}, {
  timestamps: true
});

const Student = mongoose.model("student", studentSchema);
export {Student};
