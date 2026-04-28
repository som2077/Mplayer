import React from 'react';
import { View, Text } from 'react-native';
import { Track } from '../models/Track';

export const TrackItem: React.FC<{ track: Track }> = ({ track }) => {
  return (
    <View style={{ padding: 8 }}>
      <Text>{track.title}</Text>
    </View>
  );
};
