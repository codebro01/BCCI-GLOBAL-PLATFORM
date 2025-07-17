"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cellSchema = new mongoose_1.Schema({
    name: String,
    clusterId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Cluster' },
    leaderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    maxCapacity: { type: Number, default: 10 },
    communicationTools: {
        chatId: String,
        announcementBoardId: String
    },
    location: String
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Cell', cellSchema);
//# sourceMappingURL=Cell.js.map