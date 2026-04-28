import React from 'react';
import { View, Text, Button } from 'react-native';

// Very minimal PlayerBar placeholder for Milestone 1
const PlayerBar: React.FC = () => {
  return (
    <View style={{ height: 60, borderTopWidth: 1, borderColor: '#333', justifyContent: 'center', alignItems: 'center' }}>
      <Text>Player Bar</Text>
      <View style={{ flexDirection: 'row', marginTop: 6 }}>
        <Button title="Prev" onPress={() => {}} disabled />
        <View style={{ width: 16 }} />
        <Button title="Play" onPress={() => {}} disabled />
        <View style={{ width: 16 }} />
        <Button title="Next" onPress={() => {}} disabled />
      </View>
    </View>
  );
};

export default PlayerBar;
