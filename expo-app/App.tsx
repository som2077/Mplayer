import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { TailwindProvider } from 'nativewind';

export default function App() {
  return (
    <TailwindProvider>
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-2xl font-semibold text-blue-600">Expo + NativeWind</Text>
      </SafeAreaView>
    </TailwindProvider>
  );
}
