"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
// Very minimal PlayerBar placeholder for Milestone 1
var PlayerBar = function () {
    return (<react_native_1.View style={{ height: 60, borderTopWidth: 1, borderColor: '#333', justifyContent: 'center', alignItems: 'center' }}>
      <react_native_1.Text>Player Bar</react_native_1.Text>
      <react_native_1.View style={{ flexDirection: 'row', marginTop: 6 }}>
        <react_native_1.Button title="Prev" onPress={function () { }} disabled/>
        <react_native_1.View style={{ width: 16 }}/>
        <react_native_1.Button title="Play" onPress={function () { }} disabled/>
        <react_native_1.View style={{ width: 16 }}/>
        <react_native_1.Button title="Next" onPress={function () { }} disabled/>
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = PlayerBar;
