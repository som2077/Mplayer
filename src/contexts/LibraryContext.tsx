import React, { createContext, useContext, useMemo, useState } from 'react';
import { Track } from '../models/Track';

type LibraryContextValue = {
  library: Track[];
  addTracks: (tracks: Track[]) => void;
  setLibrary: (t: Track[]) => void;
};

const LibraryContext = createContext<LibraryContextValue | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [library, setLibraryState] = useState<Track[]>([]);
  const addTracks = (tracks: Track[]) => setLibraryState((prev) => [...prev, ...tracks]);
  const setLibrary = (t: Track[]) => setLibraryState(t);
  const value = useMemo(() => ({ library, addTracks, setLibrary }), [library]);
  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibrary = (): LibraryContextValue => {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider');
  return ctx;
};
