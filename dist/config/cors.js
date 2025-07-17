"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptionsDelegate = void 0;
const allowedOrigins = ['http://localhost:4000', 'https://yourdomain.com'];
const corsOptionsDelegate = (req, callback) => {
    const origin = req.headers?.origin;
    if (!origin || allowedOrigins.includes(origin)) {
        callback(null, {
            origin: true,
            credentials: true,
            methods: ['GET', 'POST', 'OPTIONS'],
        });
    }
    else {
        callback(new Error('Not allowed by CORS'), { origin: false });
    }
};
exports.corsOptionsDelegate = corsOptionsDelegate;
//# sourceMappingURL=cors.js.map