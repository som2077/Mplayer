"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioEngine = exports.AudioEngine = void 0;
var expo_av_1 = require("expo-av");
var AudioEngine = /** @class */ (function () {
    function AudioEngine() {
        var _this = this;
        this.sound = null;
        this.currentTrackId = null;
        this.isPlaying = false;
        this.duration = 0;
        this.position = 0;
        this.handleStatusUpdate = function (status) {
            var _a, _b;
            if (!status)
                return;
            if (status.isLoaded) {
                _this.duration = status.durationMillis ? status.durationMillis / 1000 : _this.duration;
                _this.position = status.positionMillis ? status.positionMillis / 1000 : _this.position;
                (_a = _this.onTimeUpdate) === null || _a === void 0 ? void 0 : _a.call(_this, _this.position, _this.duration);
                if (status.didJustFinish) {
                    (_b = _this.onEnded) === null || _b === void 0 ? void 0 : _b.call(_this);
                }
            }
        };
    }
    AudioEngine.getInstance = function () {
        if (!AudioEngine.instance)
            AudioEngine.instance = new AudioEngine();
        return AudioEngine.instance;
    };
    // Callbacks registration
    AudioEngine.prototype.setTimeUpdateListener = function (cb) {
        this.onTimeUpdate = cb;
    };
    AudioEngine.prototype.setEndedListener = function (cb) {
        this.onEnded = cb;
    };
    AudioEngine.prototype.loadTrack = function (uri, trackId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, _c, sound, status, dur, pos;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!this.sound) return [3 /*break*/, 5];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.sound.unloadAsync()];
                    case 2:
                        _d.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        _b = _d.sent();
                        return [3 /*break*/, 4];
                    case 4:
                        this.sound = null;
                        _d.label = 5;
                    case 5:
                        this.currentTrackId = trackId;
                        return [4 /*yield*/, expo_av_1.Audio.Sound.createAsync({ uri: uri }, { shouldPlay: false }, function (status) { return _this.handleStatusUpdate(status); })];
                    case 6:
                        _c = _d.sent(), sound = _c.sound, status = _c.status;
                        this.sound = sound;
                        dur = status === null || status === void 0 ? void 0 : status.durationMillis;
                        pos = status === null || status === void 0 ? void 0 : status.positionMillis;
                        this.duration = typeof dur === 'number' ? dur / 1000 : 0;
                        this.position = typeof pos === 'number' ? pos / 1000 : 0;
                        (_a = this.onTimeUpdate) === null || _a === void 0 ? void 0 : _a.call(this, this.position, this.duration);
                        return [2 /*return*/];
                }
            });
        });
    };
    AudioEngine.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sound)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.sound.playAsync()];
                    case 1:
                        _a.sent();
                        this.isPlaying = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    AudioEngine.prototype.pause = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sound)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.sound.pauseAsync()];
                    case 1:
                        _a.sent();
                        this.isPlaying = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    AudioEngine.prototype.seek = function (positionSeconds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sound)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.sound.setPositionAsync(positionSeconds * 1000)];
                    case 1:
                        _a.sent();
                        this.position = positionSeconds;
                        return [2 /*return*/];
                }
            });
        });
    };
    AudioEngine.prototype.setVolume = function (volume) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.sound)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.sound.setVolumeAsync(volume)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Queue navigation hooks (to be wired to a queue controller)
    AudioEngine.prototype.next = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AudioEngine.prototype.prev = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AudioEngine.instance = null;
    return AudioEngine;
}());
exports.AudioEngine = AudioEngine;
// Expose a singleton for convenience
exports.audioEngine = AudioEngine.getInstance();
