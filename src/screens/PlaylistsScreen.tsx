import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { useLibrary } from '../contexts/LibraryContext';
import { useQueue } from '../contexts/QueueContext';
import { generateId } from '../utils/id';
import { getPlaylists, savePlaylist } from '../services/StorageService';
import { Playlist } from '../models/Playlist';

const PlaylistsScreen: React.FC = () => {
  const { library } = useLibrary();
  const { setQueue } = useQueue();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [name, setName] = useState('');

  const loadPlaylists = async () => {
    const list = await getPlaylists();
    setPlaylists(list);
  };

  useEffect(() => {
    loadPlaylists();
  }, []);

  const createPlaylist = async () => {
    const id = generateId('pl');
    const trackIds = library.map((t) => t.id);
    const pl = { id, name: name || `Playlist ${playlists.length + 1}`, trackIds, createdAt: Date.now() } as Playlist;
    await savePlaylist(pl);
    setName('');
    loadPlaylists();
  };

  const loadPlaylistToQueue = (p: Playlist) => {
    setQueue(p.trackIds);
  };

  const renderItem = ({ item }: { item: Playlist }) => (
    <View style={{ padding: 8, borderBottomWidth: 1, borderColor: '#333' }}>
      <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
      <Text>Tracks: {item.trackIds.length}</Text>
      <Button title="Load into Queue" onPress={() => loadPlaylistToQueue(item)} />
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Playlists</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}>
        <TextInput
          placeholder="New playlist name"
          value={name}
          onChangeText={setName}
          style={{ borderWidth: 1, borderColor: '#555', padding: 8, flex: 1, borderRadius: 4 }}
        />
        <View style={{ width: 8 }} />
        <Button title="Create" onPress={createPlaylist} />
      </View>
      <FlatList data={playlists} keyExtractor={(p) => p.id} renderItem={renderItem} />
    </View>
  );
};

export default PlaylistsScreen;
