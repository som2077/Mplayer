import { Audio } from 'expo-av';

export type TimeUpdateListener = (currentTime: number, duration: number) => void;
export type EndListener = () => void;

export class AudioEngine {
  private sound: Audio.Sound | null = null;
  private currentTrackId: string | null = null;
  private isPlaying: boolean = false;
  private duration: number = 0;
  private position: number = 0;
  private onTimeUpdate?: TimeUpdateListener;
  private onEnded?: EndListener;

  private static instance: AudioEngine | null = null;
  static getInstance(): AudioEngine {
    if (!AudioEngine.instance) AudioEngine.instance = new AudioEngine();
    return AudioEngine.instance;
  }

  // Callbacks registration
  setTimeUpdateListener(cb?: TimeUpdateListener) {
    this.onTimeUpdate = cb;
  }
  setEndedListener(cb?: EndListener) {
    this.onEnded = cb;
  }

  async loadTrack(uri: string, trackId: string) {
    // unload previous
    if (this.sound) {
      try {
        await this.sound.unloadAsync();
      } catch {
        // ignore
      }
      this.sound = null;
    }
    this.currentTrackId = trackId;
    const { sound, status } = await Audio.Sound.createAsync(
      { uri },
      { shouldPlay: false },
      (status) => this.handleStatusUpdate(status)
    );
    this.sound = sound;
    // duration/position from status (guarded for some typings)
    const dur = (status as any)?.durationMillis;
    const pos = (status as any)?.positionMillis;
    this.duration = typeof dur === 'number' ? dur / 1000 : 0;
    this.position = typeof pos === 'number' ? pos / 1000 : 0;
    this.onTimeUpdate?.(this.position, this.duration);
  }

  async play() {
    if (!this.sound) return;
    await this.sound.playAsync();
    this.isPlaying = true;
  }

  async pause() {
    if (!this.sound) return;
    await this.sound.pauseAsync();
    this.isPlaying = false;
  }

  async seek(positionSeconds: number) {
    if (!this.sound) return;
    await this.sound.setPositionAsync(positionSeconds * 1000);
    this.position = positionSeconds;
  }

  async setVolume(volume: number) {
    if (!this.sound) return;
    await this.sound.setVolumeAsync(volume);
  }

  // Queue navigation hooks (to be wired to a queue controller)
  async next() {
    // Placeholder; real queue logic will call a provided callback
  }
  async prev() {
    // Placeholder; real queue logic will call a provided callback
  }

  private handleStatusUpdate = (status: any) => {
    if (!status) return;
    if (status.isLoaded) {
      this.duration = status.durationMillis ? status.durationMillis / 1000 : this.duration;
      this.position = status.positionMillis ? status.positionMillis / 1000 : this.position;
      this.onTimeUpdate?.(this.position, this.duration);
      if (status.didJustFinish) {
        this.onEnded?.();
      }
    }
  };
}

// Expose a singleton for convenience
export const audioEngine = AudioEngine.getInstance();
