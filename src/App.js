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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var LibraryScreen_1 = __importDefault(require("./screens/LibraryScreen"));
var QueueScreen_1 = __importDefault(require("./screens/QueueScreen"));
var PlaylistsScreen_1 = __importDefault(require("./screens/PlaylistsScreen"));
var PlayerBar_1 = __importDefault(require("./components/PlayerBar"));
var LibraryContext_1 = require("./contexts/LibraryContext");
var QueueContext_1 = require("./contexts/QueueContext");
var ThemeContext_1 = require("./themes/ThemeContext");
var App = function () {
    var _a = (0, react_1.useState)('Library'), tab = _a[0], setTab = _a[1];
    var renderScreen = function () {
        switch (tab) {
            case 'Library': return <LibraryScreen_1.default />;
            case 'Queue': return <QueueScreen_1.default />;
            case 'Playlists': return <PlaylistsScreen_1.default />;
        }
    };
    return (<ThemeContext_1.ThemeProvider>
      <LibraryContext_1.LibraryProvider>
        <QueueContext_1.QueueProvider>
          <react_native_1.View style={{ flex: 1, backgroundColor: '#000' }}>
            <react_native_1.View style={styles.tabBar}>
              {['Library', 'Queue', 'Playlists'].map(function (t) { return (<react_native_1.TouchableOpacity key={t} onPress={function () { return setTab(t); }} style={styles.tabButton}>
                  <react_native_1.Text style={{ color: tab === t ? '#fff' : '#888' }}>{t}</react_native_1.Text>
                </react_native_1.TouchableOpacity>); })}
            </react_native_1.View>
            <react_native_1.View style={{ flex: 1 }}>
              {renderScreen()}
            </react_native_1.View>
            <react_native_1.View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
              <PlayerBar_1.default />
            </react_native_1.View>
          </react_native_1.View>
        </QueueContext_1.QueueProvider>
      </LibraryContext_1.LibraryProvider>
    </ThemeContext_1.ThemeProvider>);
};
var styles = react_native_1.StyleSheet.create({
    tabBar: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#111',
    },
    tabButton: {
        paddingHorizontal: 16,
    },
});
exports.default = App;
