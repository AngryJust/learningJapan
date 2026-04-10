let japaneseVoice: SpeechSynthesisVoice | null = null;
let voiceLoaded = false;

function loadVoice() {
  if (voiceLoaded) return;
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  const voices = window.speechSynthesis.getVoices();
  japaneseVoice =
    voices.find((v) => v.lang === "ja-JP") ||
    voices.find((v) => v.lang.startsWith("ja")) ||
    null;
  voiceLoaded = voices.length > 0;
}

export function speak(text: string, rate: number = 0.85) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel();
    loadVoice();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = rate;
    utterance.pitch = 1;
    if (japaneseVoice) utterance.voice = japaneseVoice;

    window.speechSynthesis.speak(utterance);
  } catch {
    // Speech synthesis unavailable on this device
  }
}

export function isSpeechAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

// Ensure voices are loaded (they load async in some browsers)
if (typeof window !== "undefined" && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = loadVoice;
  loadVoice();
}
