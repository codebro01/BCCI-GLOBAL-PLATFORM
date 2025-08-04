"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const detectPlatform = (req) => {
    const platform = req.headers['x-client-platform'] || req.query.platform;
    return platform === 'mobile' ? 'mobile' : 'web';
};
module.exports = detectPlatform;
//# sourceMappingURL=detectPlatform.js.map