"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const { connect } = require('mongoose');
function connectDB(MONGO_URI) {
    return connect(MONGO_URI);
}
exports.connectDB = connectDB;
//# sourceMappingURL=connectDB.js.map