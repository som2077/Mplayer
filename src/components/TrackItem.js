"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackItem = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var TrackItem = function (_a) {
    var track = _a.track;
    return (<react_native_1.View style={{ padding: 8 }}>
      <react_native_1.Text>{track.title}</react_native_1.Text>
    </react_native_1.View>);
};
exports.TrackItem = TrackItem;
