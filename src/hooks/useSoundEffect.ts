import { useCallback } from 'react';

// Cute "Onii-chan" anime sound effect
const SOUND_URL = 'https://www.myinstants.com/media/sounds/onii-chan_1.mp3';

export const useSoundEffect = () => {
  const playSound = useCallback(() => {
    try {
      const audio = new Audio(SOUND_URL);
      audio.volume = 0.4;
      audio.play().catch(() => {
        // Silently fail if autoplay is blocked
      });
    } catch {
      // Silently fail
    }
  }, []);

  return { playSound };
};
