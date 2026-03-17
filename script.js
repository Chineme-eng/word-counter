const textInput = document.getElementById("textInput");
const clearBtn = document.getElementById("clearBtn");
const sampleBtn = document.getElementById("sampleBtn");

const wordCountEl = document.getElementById("wordCount");
const charCountEl = document.getElementById("charCount");
const charNoSpacesEl = document.getElementById("charNoSpaces");
const sentenceCountEl = document.getElementById("sentenceCount");
const paragraphCountEl = document.getElementById("paragraphCount");
const readingTimeEl = document.getElementById("readingTime");
const speakingTimeEl = document.getElementById("speakingTime");
const avgWordLengthEl = document.getElementById("avgWordLength");
const longestWordEl = document.getElementById("longestWord");

function formatTime(minutesDecimal) {
  const totalSeconds = Math.ceil(minutesDecimal * 60);

  if (totalSeconds < 60) {
    return `${totalSeconds} sec`;
  }

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (seconds === 0) {
    return `${minutes} min`;
  }

  return `${minutes} min ${seconds} sec`;
}

function updateStats() {
  const text = textInput.value;
  const trimmedText = text.trim();

  const words = trimmedText ? trimmedText.match(/\b[\w'-]+\b/g) || [] : [];
  const sentences = trimmedText
    ? trimmedText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0)
    : [];
  const paragraphs = trimmedText
    ? trimmedText.split(/\n\s*\n/).filter(paragraph => paragraph.trim().length > 0)
    : [];

  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, "").length;

  let longestWord = "—";
  let totalWordLength = 0;

  for (const word of words) {
    totalWordLength += word.length;
    if (longestWord === "—" || word.length > longestWord.length) {
      longestWord = word;
    }
  }

  const avgWordLength = words.length ? (totalWordLength / words.length).toFixed(1) : "0";

  const readingMinutes = words.length / 200;
  const speakingMinutes = words.length / 130;

  wordCountEl.textContent = words.length;
  charCountEl.textContent = charCount;
  charNoSpacesEl.textContent = charNoSpaces;
  sentenceCountEl.textContent = sentences.length;
  paragraphCountEl.textContent = paragraphs.length || (trimmedText ? 1 : 0);
  readingTimeEl.textContent = formatTime(readingMinutes);
  speakingTimeEl.textContent = formatTime(speakingMinutes);
  avgWordLengthEl.textContent = avgWordLength;
  longestWordEl.textContent = longestWord;
}

clearBtn.addEventListener("click", () => {
  textInput.value = "";
  updateStats();
  textInput.focus();
});

sampleBtn.addEventListener("click", () => {
  textInput.value = `Building small tools is one of the fastest ways to learn by doing. A useful word counter can help writers, students, and creators understand their text instantly. The best tools are simple, clean, and easy to use.`;
  updateStats();
});

textInput.addEventListener("input", updateStats);

updateStats();
