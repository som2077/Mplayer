"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var QueueContext_1 = require("../contexts/QueueContext");
var LibraryContext_1 = require("../contexts/LibraryContext");
var QueueScreen = function () {
    var _a = (0, QueueContext_1.useQueue)(), queue = _a.queue, moveInQueue = _a.moveInQueue, removeFromQueue = _a.removeFromQueue, clearQueue = _a.clearQueue, setQueue = _a.setQueue;
    var library = (0, LibraryContext_1.useLibrary)().library;
    var getTrack = function (id) { return library.find(function (t) { return t.id === id; }); };
    var renderItem = function (_a) {
        var _b;
        var item = _a.item, index = _a.index;
        var t = getTrack(item);
        var title = (_b = t === null || t === void 0 ? void 0 : t.title) !== null && _b !== void 0 ? _b : item;
        return (<react_native_1.View style={{ padding: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <react_native_1.Text style={{ flex: 1 }}>{title}</react_native_1.Text>
        <react_native_1.Button title="Up" onPress={function () { return index > 0 && moveInQueue(index, index - 1); }} disabled={index === 0}/>
        <react_native_1.View style={{ width: 8 }}/>
        <react_native_1.Button title="Down" onPress={function () { return index < (queue.length - 1) && moveInQueue(index, index + 1); }} disabled={index === queue.length - 1}/>
        <react_native_1.View style={{ width: 8 }}/>
        <react_native_1.Button title="Remove" onPress={function () { return removeFromQueue(item); }}/>
      </react_native_1.View>);
    };
    return (<react_native_1.View style={{ flex: 1, padding: 16 }}>
      <react_native_1.Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Queue</react_native_1.Text>
      {queue.length === 0 ? (<react_native_1.Text>Your queue is empty. Import tracks from Library.</react_native_1.Text>) : (<react_native_1.FlatList data={queue} keyExtractor={function (id) { return id; }} renderItem={renderItem}/>)}
      <react_native_1.View style={{ marginTop: 12 }}>
        <react_native_1.Button title="Clear Queue" onPress={clearQueue}/>
      </react_native_1.View>
    </react_native_1.View>);
};
// End of Milestone 1 Queue screen
exports.default = QueueScreen;
