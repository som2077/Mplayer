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
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var LibraryContext_1 = require("../contexts/LibraryContext");
var QueueContext_1 = require("../contexts/QueueContext");
var id_1 = require("../utils/id");
var StorageService_1 = require("../services/StorageService");
var PlaylistsScreen = function () {
    var library = (0, LibraryContext_1.useLibrary)().library;
    var setQueue = (0, QueueContext_1.useQueue)().setQueue;
    var _a = (0, react_1.useState)([]), playlists = _a[0], setPlaylists = _a[1];
    var _b = (0, react_1.useState)(''), name = _b[0], setName = _b[1];
    var loadPlaylists = function () { return __awaiter(void 0, void 0, void 0, function () {
        var list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, StorageService_1.getPlaylists)()];
                case 1:
                    list = _a.sent();
                    setPlaylists(list);
                    return [2 /*return*/];
            }
        });
    }); };
    (0, react_1.useEffect)(function () {
        loadPlaylists();
    }, []);
    var createPlaylist = function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, trackIds, pl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = (0, id_1.generateId)('pl');
                    trackIds = library.map(function (t) { return t.id; });
                    pl = { id: id, name: name || "Playlist ".concat(playlists.length + 1), trackIds: trackIds, createdAt: Date.now() };
                    return [4 /*yield*/, (0, StorageService_1.savePlaylist)(pl)];
                case 1:
                    _a.sent();
                    setName('');
                    loadPlaylists();
                    return [2 /*return*/];
            }
        });
    }); };
    var loadPlaylistToQueue = function (p) {
        setQueue(p.trackIds);
    };
    var renderItem = function (_a) {
        var item = _a.item;
        return (<react_native_1.View style={{ padding: 8, borderBottomWidth: 1, borderColor: '#333' }}>
      <react_native_1.Text style={{ fontWeight: 'bold' }}>{item.name}</react_native_1.Text>
      <react_native_1.Text>Tracks: {item.trackIds.length}</react_native_1.Text>
      <react_native_1.Button title="Load into Queue" onPress={function () { return loadPlaylistToQueue(item); }}/>
    </react_native_1.View>);
    };
    return (<react_native_1.View style={{ flex: 1, padding: 16 }}>
      <react_native_1.Text style={{ fontSize: 18, fontWeight: 'bold' }}>Playlists</react_native_1.Text>
      <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
        <react_native_1.TextInput placeholder="New playlist name" value={name} onChangeText={setName} style={{ borderWidth: 1, borderColor: '#555', padding: 8, flex: 1, borderRadius: 4 }}/>
        <react_native_1.View style={{ width: 8 }}/>
        <react_native_1.Button title="Create" onPress={createPlaylist}/>
      </react_native_1.View>
      <react_native_1.FlatList data={playlists} keyExtractor={function (p) { return p.id; }} renderItem={renderItem}/>
    </react_native_1.View>);
};
exports.default = PlaylistsScreen;
