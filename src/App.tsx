import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import LibraryScreen from "./screens/LibraryScreen";
import QueueScreen from "./screens/QueueScreen";
import PlaylistsScreen from "./screens/PlaylistsScreen";
import PlayerBar from "./components/PlayerBar";
import { LibraryProvider } from "./contexts/LibraryContext";
import { QueueProvider } from "./contexts/QueueContext";
import { ThemeProvider } from "./themes/ThemeContext";

type TabKey = "Library" | "Queue" | "Playlists";

const App: React.FC = () => {
  const [tab, setTab] = useState<TabKey>("Library");

  const renderScreen = () => {
    switch (tab) {
      case "Library":
        return <LibraryScreen />;
      case "Queue":
        return <QueueScreen />;
      case "Playlists":
        return <PlaylistsScreen />;
    }
  };

  return (
    <ThemeProvider>
      <LibraryProvider>
        <QueueProvider>
          <View style={{ flex: 1, backgroundColor: "#000" }}>
            <View style={styles.tabBar}>
              {["Library", "Queue", "Playlists"].map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setTab(t as TabKey)}
                  style={styles.tabButton}
                >
                  <Text
                    style={{ color: tab === (t as TabKey) ? "#fff" : "#888" }}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ flex: 1 }}>{renderScreen()}</View>
            <View
              style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
            >
              <PlayerBar />
            </View>
          </View>
        </QueueProvider>
      </LibraryProvider>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 48,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#111",
  },
  tabButton: {
    paddingHorizontal: 16,
  },
});

export default App;
