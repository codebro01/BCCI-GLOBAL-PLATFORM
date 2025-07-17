"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const learningPathSchema = new mongoose_1.Schema({
    title: String,
    steps: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Lesson' }],
    type: String,
    progressPerUser: [{
            userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
            step: Number,
            status: String
        }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('LearningPath', learningPathSchema);
//# sourceMappingURL=LearningPath.js.map