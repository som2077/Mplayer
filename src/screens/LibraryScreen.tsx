import React, { useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Track } from '../models/Track';
import { generateId } from '../utils/id';
import { useLibrary } from '../contexts/LibraryContext';
import { useQueue } from '../contexts/QueueContext';

// Simple placeholder Library screen for Milestone 1
const LibraryScreen: React.FC = () => {
  const { library, addTracks } = useLibrary();
  const { addToQueue } = useQueue();

  const importFiles = async () => {
    const res: any = await DocumentPicker.getDocumentAsync({ type: 'audio/*', multiple: true } as any);
    const items: any[] = Array.isArray(res?.assets) ? res.assets : (res?.uri ? [res] : []);
    const tracks: Track[] = items
      .filter((i) => i?.uri)
      .map((f) => ({ id: generateId('trk'), uri: f.uri, title: f.name ?? f.uri.split('/').pop() ?? 'Untitled' }));
    addTracks(tracks);
  };

  const renderItem = ({ item }: { item: Track }) => (
    <View style={{ padding: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ flex: 1 }}>{item.title}</Text>
      <Button title="Add to Queue" onPress={() => addToQueue(item.id)} />
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Import Audio Files" onPress={importFiles} />
      <FlatList data={library} keyExtractor={(i) => i.id} renderItem={renderItem} />
    </View>
  );
};

export default LibraryScreen;
