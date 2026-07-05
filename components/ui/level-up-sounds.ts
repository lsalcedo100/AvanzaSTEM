export const LEVEL_UP_SOUND_PATHS = [
  "/audio/freesound_community-level-up-47165.mp3",
  "/audio/mori_sound-fx-game-winner-497166.mp3",
  "/audio/sunovia-level-up-289723.mp3",
  "/audio/tithuh-level-up-02-528919.mp3",
  "/audio/tithuh-level-up-03-523644.mp3",
  "/audio/tithuh-level-up-523624.mp3",
  "/audio/tunetank-winner-awards-logo-484334.mp3",
  "/audio/universfield-level-passed-142971.mp3",
  "/audio/universfield-level-up-02-199574.mp3",
  "/audio/universfield-level-up-03-199576.mp3",
  "/audio/universfield-level-up-05-326133.mp3",
  "/audio/universfield-level-up-06-370051.mp3",
  "/audio/universfield-level-up-08-402152.mp3",
]

export function createLevelUpSounds(volume = 0.7) {
  return LEVEL_UP_SOUND_PATHS.map((src) => {
    const audio = new Audio(src)
    audio.preload = "auto"
    audio.volume = volume
    return audio
  })
}

export function playRandomLevelUpSound(sounds: HTMLAudioElement[]) {
  if (sounds.length === 0) return

  const sound = sounds[Math.floor(Math.random() * sounds.length)]
  sound.currentTime = 0
  void sound.play().catch(() => {
    // Browsers can block audio if the level was not completed from a user gesture.
  })
}

export function stopLevelUpSounds(sounds: HTMLAudioElement[]) {
  for (const sound of sounds) {
    sound.pause()
    sound.currentTime = 0
  }
}
