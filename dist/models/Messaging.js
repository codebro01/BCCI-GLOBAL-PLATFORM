"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messagingSchema = new mongoose_1.Schema({
    senderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    receiverId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    threadId: String,
    sentAt: Date,
    readAt: Date
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Message', messagingSchema);
//# sourceMappingURL=Messaging.js.map