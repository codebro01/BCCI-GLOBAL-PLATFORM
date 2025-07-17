"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeValidate = void 0;
function safeValidate(schema, data) {
    const result = schema.safeParse(data);
    if (!result.success) {
        return {
            success: false,
            errors: result.error.errors.map((e) => ({
                field: e.path.join('.'),
                message: e.message,
            })),
        };
    }
    return {
        success: true,
        data: result.data,
    };
}
exports.safeValidate = safeValidate;
//# sourceMappingURL=zodInputValidator.js.map