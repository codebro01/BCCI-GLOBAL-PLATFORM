"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const attendanceSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    eventId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Event' },
    cellId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Cell' },
    date: Date,
    status: { type: String, enum: ['present', 'absent', 'late'] },
    type: String
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Attendance', attendanceSchema);
//# sourceMappingURL=Attendance.js.map