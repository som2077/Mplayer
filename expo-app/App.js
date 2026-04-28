"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var nativewind_1 = require("nativewind");
function App() {
    return (<nativewind_1.TailwindProvider>
      <react_native_1.SafeAreaView className="flex-1 items-center justify-center bg-white">
        <react_native_1.Text className="text-2xl font-semibold text-blue-600">Expo + NativeWind</react_native_1.Text>
      </react_native_1.SafeAreaView>
    </nativewind_1.TailwindProvider>);
}
exports.default = App;
