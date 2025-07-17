"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEventSchema = exports.createEventSchema = exports.EventStatusEnum = exports.idSchema = exports.updateGoalSchema = exports.goalSchema = void 0;
const zod_1 = require("zod");
const signUpSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    surname: zod_1.z.string(),
    otherNames: zod_1.z.string(),
    email: zod_1.z.string().email({ message: 'Invalid email format' }), // ✅ Fixed
    roles: zod_1.z.array(zod_1.z.string()),
    id: zod_1.z.string().optional(),
    password: zod_1.z
        .string()
        .min(5, { message: 'Password must be at least 5 characters' }),
    phone: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    cluster: zod_1.z.record(zod_1.z.string()).optional(), //  Accepts object like { key: "value" }
    cell: zod_1.z.record(zod_1.z.string()).optional(),
    bookmarkedContent: zod_1.z.record(zod_1.z.string()).optional(),
    contributionHistory: zod_1.z.string().optional(),
    spiritualGoals: zod_1.z.string().optional(),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email format' }), // ✅ Fixed
    password: zod_1.z
        .string()
        .min(5, { message: 'Password must be at least 5 characters' }),
});
const updateUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    surname: zod_1.z.string().optional(),
    otherNames: zod_1.z.string().optional(),
    email: zod_1.z.string().email({ message: 'Invalid email format' }).optional(),
    roles: zod_1.z.array(zod_1.z.string()).optional(),
    phone: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    state: zod_1.z.string().optional(),
    city: zod_1.z.string().optional(),
    cluster: zod_1.z.record(zod_1.z.string()).optional(), // { key: value }
    cell: zod_1.z.record(zod_1.z.string()).optional(),
    bookmarkedContent: zod_1.z.record(zod_1.z.string()).optional(),
    contributionHistory: zod_1.z.string().optional(),
    spiritualGoals: zod_1.z.string().optional(),
});
exports.goalSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1, 'Title is required'),
    category: zod_1.z.string().trim(),
    target: zod_1.z.number(),
    timeFrame: zod_1.z.string().trim(),
    currentProgress: zod_1.z.number().optional(),
    description: zod_1.z.string(),
});
exports.updateGoalSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1, 'Title is required').optional(),
    category: zod_1.z.string().trim().optional(),
    target: zod_1.z.number().optional(),
    timeFrame: zod_1.z.string().trim().optional(),
    description: zod_1.z.string().optional(),
    currentProgress: zod_1.z.number().optional(),
});
exports.idSchema = zod_1.z.object({
    id: zod_1.z.string()
});
exports.EventStatusEnum = zod_1.z.enum(['PENDING', 'CONFIRMED']);
exports.createEventSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Event title is required'),
    date: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    }),
    time: zod_1.z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Invalid time format (HH:mm expected)',
    }),
    status: exports.EventStatusEnum.optional().default('PENDING'),
});
exports.updateEventSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    date: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
    })
        .optional(),
    time: zod_1.z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .optional(),
    status: exports.EventStatusEnum.optional(),
});
module.exports = {
    signUpSchema,
    loginSchema,
    updateUserSchema,
    goalSchema: exports.goalSchema,
    updateGoalSchema: exports.updateGoalSchema,
    idSchema: exports.idSchema,
    createEventSchema: exports.createEventSchema,
    updateEventSchema: exports.updateEventSchema,
    EventStatusEnum: exports.EventStatusEnum
};
//# sourceMappingURL=zodSchema.js.map