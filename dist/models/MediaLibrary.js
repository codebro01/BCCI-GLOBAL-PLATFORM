"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mediaLibrarySchema = new mongoose_1.Schema({
    title: String,
    type: { type: String, enum: ['video', 'audio'] },
    url: String,
    thumbnail: String,
    tags: [String],
    eventId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Event' },
    region: String,
    uploadedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('MediaLibrary', mediaLibrarySchema);
//# sourceMappingURL=MediaLibrary.js.map