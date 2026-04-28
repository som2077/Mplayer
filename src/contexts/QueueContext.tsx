import React, { createContext, useContext, useMemo, useState } from 'react';

type QueueState = {
  queue: string[]; // array of track IDs
};

type QueueActions = {
  setQueue: (ids: string[]) => void;
  addToQueue: (id: string) => void;
  removeFromQueue: (id: string) => void;
  moveInQueue: (fromIndex: number, toIndex: number) => void;
  clearQueue: () => void;
};

type QueueContextValue = QueueState & QueueActions;

const QueueContext = createContext<QueueContextValue | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [queue, setQueueState] = useState<string[]>([]);

  const setQueue = (ids: string[]) => setQueueState(ids);
  const addToQueue = (id: string) => setQueueState((q) => [...q, id]);
  const removeFromQueue = (id: string) => setQueueState((q) => q.filter((x) => x !== id));
  const moveInQueue = (fromIndex: number, toIndex: number) => {
    setQueueState((q) => {
      const arr = [...q];
      const [item] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, item);
      return arr;
    });
  };
  const clearQueue = () => setQueueState([]);

  const value = useMemo(() => ({ queue, setQueue, addToQueue, removeFromQueue, moveInQueue, clearQueue }), [queue]);
  return <QueueContext.Provider value={value}>{children}</QueueContext.Provider>;
};

export const useQueue = (): QueueContextValue => {
  const ctx = useContext(QueueContext);
  if (!ctx) throw new Error('useQueue must be used within QueueProvider');
  return ctx;
};
