"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
function generateId(prefix) {
    if (prefix === void 0) { prefix = 'id'; }
    return "".concat(prefix, "_").concat(Date.now().toString(36), "_").concat(Math.random().toString(36).slice(2, 9));
}
exports.generateId = generateId;
