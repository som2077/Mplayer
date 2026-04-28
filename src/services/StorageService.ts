import AsyncStorage from "@react-native-async-storage/async-storage";
import { Playlist } from "../models/Playlist";

const PLAYLISTS_KEY = "playlists_v1";
const SETTINGS_KEY = "settings_v1";

export type Settings = Record<string, any>;

export async function getPlaylists(): Promise<Playlist[]> {
  try {
    const raw = await AsyncStorage.getItem(PLAYLISTS_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as Playlist[];
    return data;
  } catch {
    return [];
  }
}

export async function savePlaylist(p: Playlist): Promise<void> {
  const list = await getPlaylists();
  const idx = list.findIndex((x) => x.id === p.id);
  if (idx >= 0) list[idx] = p;
  else list.push(p);
  await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(list));
}

export async function deletePlaylist(id: string): Promise<void> {
  const list = await getPlaylists();
  const next = list.filter((p) => p.id !== id);
  await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(next));
}

export async function upsertPlaylist(p: Playlist): Promise<void> {
  await savePlaylist(p);
}

export async function getSettings(): Promise<Settings> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function setSetting(key: string, value: any): Promise<void> {
  const s = await getSettings();
  s[key] = value;
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}
