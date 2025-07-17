"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const spiritualCVSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    eventsAttended: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Event' }],
    rolesHeld: [{
            name: String,
            from: Date,
            to: Date
        }],
    testimonies: [{
            text: String,
            date: Date
        }],
    trainingsCompleted: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Training' }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('SpiritualCV', spiritualCVSchema);
//# sourceMappingURL=SpiritualCV.js.map