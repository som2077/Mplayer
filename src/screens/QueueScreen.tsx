import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useQueue } from '../contexts/QueueContext';
import { useLibrary } from '../contexts/LibraryContext';

const QueueScreen: React.FC = () => {
  const { queue, moveInQueue, removeFromQueue, clearQueue, setQueue } = useQueue();
  const { library } = useLibrary();

  const getTrack = (id: string) => library.find((t) => t.id === id);

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    const t = getTrack(item);
    const title = t?.title ?? item;
    return (
      <View style={{ padding: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ flex: 1 }}>{title}</Text>
        <Button title="Up" onPress={() => index > 0 && moveInQueue(index, index - 1)} disabled={index === 0} />
        <View style={{ width: 8 }} />
        <Button title="Down" onPress={() => index < (queue.length - 1) && moveInQueue(index, index + 1)} disabled={index === queue.length - 1} />
        <View style={{ width: 8 }} />
        <Button title="Remove" onPress={() => removeFromQueue(item)} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Queue</Text>
      {queue.length === 0 ? (
        <Text>Your queue is empty. Import tracks from Library.</Text>
      ) : (
        <FlatList data={queue} keyExtractor={(id) => id} renderItem={renderItem} />
      )}
      <View style={{ marginTop: 12 }}>
        <Button title="Clear Queue" onPress={clearQueue} />
      </View>
    </View>
  );
};

// End of Milestone 1 Queue screen

export default QueueScreen;
