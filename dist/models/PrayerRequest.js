"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const prayerRequestSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    message: String,
    submittedAt: Date,
    assignedLeaderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    status: String
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('PrayerRequest', prayerRequestSchema);
//# sourceMappingURL=PrayerRequest.js.map