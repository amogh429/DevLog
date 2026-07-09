import mongoose from "mongoose";

const weeklySummarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    weekStartDate: {
      type: Date,
      required: true,
    },
    weekEndDate: {
      type: Date,
      required: true,
    },
    summary: {
      topicsWorkedOn: {
        type: [String],
        default: [],
      },
      patternsNotices: {
        type: String,
        default: "",
      },
      suggestedFocus: {
        type: String,
        default: "",
      },
      moodOfTheWeek: {
        type: String,
        default: "",
      },
    },
    entryCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    generatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

weeklySummarySchema.index({ user: 1, weekStartDate: 1 }, { unique: true });

const WeeklySummary = mongoose.model("WeeklySummary", weeklySummarySchema);

export default WeeklySummary;
