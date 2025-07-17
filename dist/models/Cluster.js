"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clusterSchema = new mongoose_1.Schema({
    name: String,
    region: String,
    state: String,
    country: String,
    leaderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    cellGroups: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Cell' }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Cluster', clusterSchema);
//# sourceMappingURL=Cluster.js.map