// script.js
const morseCode = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', '\'': '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '@': '.--.-', ' ': '/'
};

function textToMorse(text) {
  return text.toUpperCase().split('').map(char => morseCode[char] || '').join(' ');
}

function playSound(frequency, duration) {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = context.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  oscillator.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration / 1000);
}

function readMorse(morseCode) {
  const unitDuration = 100; // Duration of a single dot in milliseconds
  const dotDuration = unitDuration;
  const dashDuration = unitDuration * 3;
  const gapDuration = unitDuration;
  
  const playSequence = () => {
    let timeOffset = 0;

    morseCode.split('').forEach(char => {
      switch (char) {
        case '.':
          setTimeout(() => playSound(1000, dotDuration), timeOffset);
          timeOffset += dotDuration + gapDuration;
          break;
        case '-':
          setTimeout(() => playSound(1000, dashDuration), timeOffset);
          timeOffset += dashDuration + gapDuration;
          break;
        case ' ':
          timeOffset += gapDuration * 3; // Space between letters or words
          break;
        default:
          break;
      }
    });
  };

  playSequence();
}

document.getElementById('translateButton').addEventListener('click', () => {
  const textInput = document.getElementById('textInput').value;
  const morseOutput = textToMorse(textInput);
  document.getElementById('morseOutput').textContent = 'شيفرة مورس: ' + morseOutput;
});

document.getElementById('readMorseButton').addEventListener('click', () => {
  const morseCodeText = document.getElementById('morseOutput').textContent.replace('شيفرة مورس: ', '');
  readMorse(morseCodeText);
});
