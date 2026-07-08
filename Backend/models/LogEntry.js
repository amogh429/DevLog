import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

entrySchema.index({ user: 1, date: -1 });

const DevLog = mongoose.model("DevLog",entrySchema);

export default DevLog;

