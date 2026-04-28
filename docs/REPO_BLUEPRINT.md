Repo Blueprint: Milestone 1 Foundation

- root/
  - package.json: project dependencies and scripts
  - app.json: Expo config
  - tsconfig.json: TypeScript config
  - README.md: project overview and onboarding notes
  - docs/MILESTONE1_SPRINT.md: sprint board (Milestone 1)
  - docs/REPO_BLUEPRINT.md: this document
  - src/: application source
    - audio/AudioEngine.ts: playback wrapper around expo-av
    - models/: Track.ts, Playlist.ts
    - services/: StorageService.ts (AsyncStorage for playlists/settings)
    - contexts/: LibraryContext.tsx, QueueContext.tsx
    - screens/: LibraryScreen.tsx, QueueScreen.tsx, PlaylistsScreen.tsx
    - components/: PlayerBar.tsx, TrackItem.tsx
    - themes/: ThemeContext.tsx, theme-dark.tsx, theme-light.tsx
    - utils/: time.ts, id.ts
    - App.tsx: simple in-app navigation shell and tab-like bar

- This blueprint is designed to be copied into a team’s repository with owners assigned to Milestone 1 tasks.
