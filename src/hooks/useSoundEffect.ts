import { useCallback } from 'react';

// Marin Kitagawa "Gojo-kun!" style cute sound effect
const SOUND_URL = 'https://www.myinstants.com/media/sounds/anime-wow.mp3';

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
