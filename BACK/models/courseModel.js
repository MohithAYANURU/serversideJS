import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: String,
      required: true,
      trim: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

courseSchema.index(
  { student: 1, title: 1, semester: 1 },
  { unique: true },
);

export default mongoose.model("Course", courseSchema);
