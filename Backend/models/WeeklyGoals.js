import mongoose from "mongoose";

const weeklyGoalsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true,
        },
        weekStartDate: {
            type: Date,
            required: true,
        },
        goals: [
            {
                text: {
                    type: String,
                    required: true,
                },
                completed: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const weeklyGoals = mongoose.model("WeeklyGoals",weeklyGoalsSchema);

export default weeklyGoals;
