"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gamificationSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    points: Number,
    earnedBadges: [String],
    unlockedFeatures: [String],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Gamification', gamificationSchema);
//# sourceMappingURL=Gamification.js.map