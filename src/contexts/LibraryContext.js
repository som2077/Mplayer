"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLibrary = exports.LibraryProvider = void 0;
var react_1 = __importStar(require("react"));
var LibraryContext = (0, react_1.createContext)(undefined);
var LibraryProvider = function (_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)([]), library = _b[0], setLibraryState = _b[1];
    var addTracks = function (tracks) { return setLibraryState(function (prev) { return __spreadArray(__spreadArray([], prev, true), tracks, true); }); };
    var setLibrary = function (t) { return setLibraryState(t); };
    var value = (0, react_1.useMemo)(function () { return ({ library: library, addTracks: addTracks, setLibrary: setLibrary }); }, [library]);
    return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};
exports.LibraryProvider = LibraryProvider;
var useLibrary = function () {
    var ctx = (0, react_1.useContext)(LibraryContext);
    if (!ctx)
        throw new Error('useLibrary must be used within LibraryProvider');
    return ctx;
};
exports.useLibrary = useLibrary;
