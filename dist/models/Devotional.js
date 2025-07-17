"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const devotionalSchema = new mongoose_1.Schema({
    title: String,
    body: String,
    category: String,
    tags: [String],
    authorId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    likes: Number,
    bookmarkedBy: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    recommendedFor: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Devotional', devotionalSchema);
//# sourceMappingURL=Devotional.js.map