"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const geoPlacementSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    location: {
        lat: Number,
        lng: Number
    },
    matchedCluster: String,
    matchedCell: String,
    assignedAt: Date
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('GeoPlacement', geoPlacementSchema);
//# sourceMappingURL=GeoPlacement.js.map