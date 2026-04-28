"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = void 0;
function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0)
        return '00:00';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return "".concat(m.toString().padStart(2, '0'), ":").concat(s.toString().padStart(2, '0'));
}
exports.formatTime = formatTime;
