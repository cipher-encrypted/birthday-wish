/* ───
   Project: Secret Birthday Gift
   Author: @saklin_01
─── */

/* ─── CLOCK DIAL TICKS & NUMERALS ─── */
(function initClockFace() {
  const tg = document.getElementById('clock-ticks');
  for (let i = 0; i < 60; i++) {
    const ang = (i * 6) * Math.PI / 180;
    const isMajor = (i % 5 === 0);
    const r1 = 126, r2 = isMajor ? 116 : 121;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 140 + r1 * Math.sin(ang));
    line.setAttribute('y1', 140 - r1 * Math.cos(ang));
    line.setAttribute('x2', 140 + r2 * Math.sin(ang));
    line.setAttribute('y2', 140 - r2 * Math.cos(ang));
    line.setAttribute('stroke-width', isMajor ? '1.8' : '0.8');
    line.setAttribute('opacity', isMajor ? '0.9' : '0.45');
    tg.appendChild(line);
  }

  const ng = document.getElementById('clock-numerals');
  const nums = ['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
  nums.forEach((num, idx) => {
    const ang = (idx * 30) * Math.PI / 180;
    const r = 100;
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', 140 + r * Math.sin(ang));
    t.setAttribute('y', 140 - r * Math.cos(ang));
    t.textContent = num;
    ng.appendChild(t);
  });
})();

/* ─── AUDIO MUTED (PER USER REQUEST) ─── */
function playTick() {}
function playKeyClick() {}
function playMidnightChime() {}

/* ─── INTIMATE CANDLELIGHT MOTES & ROSE PETALS ─── */
(function createBackground() {
  const bg = document.getElementById('bg-ambient');
  if (!bg) return;
  for (let i = 0; i < 16; i++) {
    const m = document.createElement('div');
    m.className = 'candle-mote';
    const msz = Math.random() * 5 + 3;
    m.style.cssText = `width:${msz}px;height:${msz}px;left:${Math.random()*100}%;bottom:${Math.random()*25}%;--md:${Math.random()*5+6}s;--mdelay:-${Math.random()*6}s;`;
    bg.appendChild(m);
  }
  const colors = ['#8a1528','#6b0f1d','#a82035','#4f0b15'];
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.cssText = `left:${Math.random()*105}%;width:${Math.random()*12+10}px;height:${Math.random()*14+12}px;background:${colors[Math.floor(Math.random()*colors.length)]};--pd:${Math.random()*4+5}s;--pdelay:-${Math.random()*7}s;`;
    bg.appendChild(p);
  }
})();

/* ─── SHINCHAN PASSCODE VERIFICATION (4 DIGITS) ─── */
const TARGET_PASSCODE = "2010"; // 4-digit passcode for Vaishu (Sona)

const SHINCHAN_GIFS = {
  ask: "assets/shinchan-birthday.png",
  wrong: "assets/shinchan-wrong.png"
};

let enteredDigits = "";

function updateDateBoxes() {
  for (let i = 0; i < 4; i++) {
    const box = document.getElementById(`b${i}`);
    if (!box) continue;
    box.textContent = enteredDigits[i] || "";
    if (i === enteredDigits.length && enteredDigits.length < 4) {
      box.classList.add('active');
    } else {
      box.classList.remove('active');
    }
  }
}
updateDateBoxes();

function pressKey(num) {
  if (enteredDigits.length < 4) {
    enteredDigits += num;
    updateDateBoxes();
    if (enteredDigits.length === 4) {
      setTimeout(submitBirthdayDate, 220);
    }
  }
}

function deleteDigit() {
  if (enteredDigits.length > 0) {
    enteredDigits = enteredDigits.slice(0, -1);
    updateDateBoxes();
  }
}

function submitBirthdayDate() {
  const img = document.getElementById('shinchan-img');
  const txt = document.getElementById('quiz-text');
  const card = document.getElementById('quiz-card');
  const keypad = document.getElementById('keypad');
  const retryBtn = document.getElementById('retry-btn');

  if (enteredDigits.length < 4) {
    txt.textContent = "Please enter all 4 digits! ✨";
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
    return;
  }

  if (enteredDigits === TARGET_PASSCODE) {
    // Correct Passcode (2005) - Directly transition to the Surprise Question Screen
    const danceGif = document.getElementById('dance-gif');
    if (danceGif) {
      danceGif.src = DANCE_GIF_URL;
    }
    const archText = document.getElementById('arch-text-path');
    if (archText) {
      archText.textContent = "I have made something for you";
    }
    const textEl = document.querySelector('.arched-text');
    if (textEl) {
      textEl.classList.remove('excited-mode');
    }
    // Animate curved title with Distinct Page 1 Wave In
    triggerTitleAnim('anim-wave-drop');

    const promptEl = document.getElementById('surprise-prompt');
    if (promptEl) {
      promptEl.style.display = 'block';
      promptEl.innerHTML = "Do you wanna see it, Sona? ✨";
      triggerElementAnim(promptEl, 'prompt-entrance-pop');
    }
    const danceWrap = document.querySelector('.dance-gif-wrap');
    if (danceWrap) {
      triggerElementAnim(danceWrap, 'gif-entrance-pop');
    }
    const btnGroup = document.querySelector('.surprise-btn-group');
    if (btnGroup) {
      btnGroup.innerHTML = `
        <button id="btn-yes" class="pill-btn yes-btn" onclick="handleChoice('yes')">
          <span class="btn-shine-tr"></span>
          <span class="btn-label">YES</span>
          <span class="btn-shine-bl"></span>
        </button>
        <button id="btn-no" class="pill-btn no-btn" onclick="handleChoice('no')">
          <span class="btn-shine-tr"></span>
          <span class="btn-label">NO</span>
          <span class="btn-shine-bl"></span>
        </button>
      `;
      triggerElementAnim(btnGroup, 'btn-entrance-bounce');
    }
    document.getElementById('quiz-screen').classList.remove('show');
    document.getElementById('quiz-screen').classList.add('hidden');
    const surpriseEl = document.getElementById('surprise-screen');
    if (surpriseEl) {
      surpriseEl.classList.remove('hidden-screen');
      surpriseEl.classList.add('show-screen');
    }
    launchConfetti();
    startBackgroundMusic();
  } else {
    // Wrong Passcode
    img.src = SHINCHAN_GIFS.wrong;
    txt.textContent = "Oops! Wrong Passcode! Try again, Sona! 🥺🌸";
    card.classList.remove('shake');
    void card.offsetWidth;
    card.classList.add('shake');
    keypad.classList.add('hidden-btn');
    retryBtn.classList.remove('hidden-btn');
  }
}

function resetQuiz() {
  enteredDigits = "";
  updateDateBoxes();
  const img = document.getElementById('shinchan-img');
  const txt = document.getElementById('quiz-text');
  const keypad = document.getElementById('keypad');
  const retryBtn = document.getElementById('retry-btn');

  img.src = SHINCHAN_GIFS.ask;
  txt.textContent = "Enter the 4-digit secret passcode 💖";
  keypad.classList.remove('hidden-btn');
  retryBtn.classList.add('hidden-btn');
}

function triggerTitleAnim(animClass) {
  const svg = document.querySelector('.curved-title-svg');
  if (!svg) return;
  svg.classList.remove('anim-wave-drop', 'anim-excited-bounce');
  svg.style.animation = 'none';
  void svg.offsetWidth;
  svg.style.animation = '';
  svg.classList.add(animClass);
}

function triggerElementAnim(el, animClass) {
  if (!el) return;
  el.classList.remove(animClass);
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = '';
  el.classList.add(animClass);
}

/* ─── SURPRISE CHOICE INTERACTION (YES / NO) ─── */
const DANCE_GIF_URL = "assets/shinchan-dance.gif";
const PLEADING_GIF_URL = "assets/shinchan-pleading.gif";
const EXCITED_GIF_URL = "assets/shinchan-excited.gif";

function handleChoice(choice) {
  const danceGif = document.getElementById('dance-gif');

  if (choice === 'no') {
    if (danceGif) {
      danceGif.src = PLEADING_GIF_URL;
    }
    const promptEl = document.getElementById('surprise-prompt');
    if (promptEl) {
      promptEl.innerHTML = "Are you sure, Sona? 🥺 Please say YES! 💖";
      triggerElementAnim(promptEl, 'prompt-entrance-pop');
    }
    const noBtn = document.getElementById('btn-no');
    if (noBtn) {
      noBtn.style.animation = 'none';
      void noBtn.offsetWidth;
      noBtn.style.animation = 'cardShake 0.4s ease';
    }
    return;
  }

  // When choice === 'yes' -> Show "Are you really excited, Vaishu? 🌸" screen
  const archText = document.getElementById('arch-text-path');
  if (archText) {
    archText.textContent = "Are you really excited, Vaishu? 🌸";
  }
  const textEl = document.querySelector('.arched-text');
  if (textEl) {
    textEl.classList.add('excited-mode');
  }
  // Trigger Distinct Energetic Pop & Spring Bounce for "Are you really excited?"
  triggerTitleAnim('anim-excited-bounce');

  if (danceGif) {
    danceGif.src = EXCITED_GIF_URL;
  }
  const danceWrap = document.querySelector('.dance-gif-wrap');
  if (danceWrap) {
    triggerElementAnim(danceWrap, 'gif-entrance-pop');
  }
  const promptEl = document.getElementById('surprise-prompt');
  if (promptEl) {
    promptEl.style.display = 'none';
  }
  const btnGroup = document.querySelector('.surprise-btn-group');
  if (btnGroup) {
    btnGroup.innerHTML = `
      <button class="pill-btn yes-btn" onclick="handleExcitedChoice()">
        <span class="btn-shine-tr"></span>
        <span class="btn-label">YES</span>
        <span class="btn-shine-bl"></span>
      </button>
      <button class="pill-btn yes-btn" onclick="handleExcitedChoice()">
        <span class="btn-shine-tr"></span>
        <span class="btn-label">YES</span>
        <span class="btn-shine-bl"></span>
      </button>
    `;
    triggerElementAnim(btnGroup, 'btn-entrance-bounce');
  }
}

function handleExcitedChoice() {
  launchConfetti();
  const surpriseEl = document.getElementById('surprise-screen');
  const giftEl = document.getElementById('gift-screen');

  setTimeout(() => {
    if (surpriseEl) {
      surpriseEl.classList.remove('show-screen');
      surpriseEl.classList.add('hidden-screen');
    }
    if (giftEl) {
      giftEl.classList.remove('hidden-screen');
      giftEl.classList.add('show-screen');
      launchConfetti();
    }
  }, 400);
}

/* ─── CLOTHESLINE HANGING MEMORIES GALLERY (MATCHING REFERENCE IMAGE 2) ─── */
function openMemoriesModal() {
  launchConfetti();
  const modal = document.getElementById('memories-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const container = document.getElementById('memories-board-container');
    if (container) {
      container.style.animation = 'none';
      void container.offsetWidth;
      container.style.animation = 'clotheslineDropIn 0.55s cubic-bezier(0.34, 1.35, 0.64, 1)';
    }
    const track = document.getElementById('clothesline-photos-track');
    if (track) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }
}

function closeMemoriesModal() {
  const modal = document.getElementById('memories-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function scrollClothesline(direction) {
  const track = document.getElementById('clothesline-photos-track');
  if (track) {
    const scrollAmount = 260 * direction;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

function focusHangingPhoto(el) {
  if (!el) return;
  launchConfetti();
  el.classList.add('active-sway');
  setTimeout(() => {
    el.classList.remove('active-sway');
  }, 1200);
}

/* ─── MAKE A WISH: BIRTHDAY CAKE (BOX 2) ─── */
let isWishMade = false;
let blownCandlesCount = 0;

function openCakeModal() {
  launchConfetti();
  resetCake();
  const modal = document.getElementById('cake-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeCakeModal() {
  const modal = document.getElementById('cake-modal');
  if (modal) modal.classList.add('hidden');
}

function blowCandle(num, e) {
  if (e) e.stopPropagation();
  const flame = document.getElementById(`flame-${num}`);
  if (flame && !flame.classList.contains('extinguished')) {
    flame.classList.add('extinguished');
    blownCandlesCount++;
    if (blownCandlesCount >= 7) setTimeout(makeCakeWish, 300);
  }
}

function makeCakeWish(e) {
  if (isWishMade) return;
  isWishMade = true;

  // Extinguish all 7 candles
  for (let i = 1; i <= 7; i++) {
    const flame = document.getElementById(`flame-${i}`);
    if (flame) flame.classList.add('extinguished');
  }

  // Celebratory confetti burst
  launchConfetti();
  setTimeout(launchConfetti, 350);

  // Update top arched text to celebration
  const archText = document.getElementById('cake-arch-text');
  if (archText) archText.textContent = "HAPPY BIRTHDAY VAISHU! 🎉";

  // Hide hint and show celebration ribbon
  const hint = document.getElementById('cake-footer-hint');
  if (hint) hint.style.display = 'none';

  setTimeout(() => {
    const banner = document.getElementById('cake-wish-banner');
    if (banner) banner.classList.remove('hidden');
  }, 300);
}

function resetCake() {
  isWishMade = false;
  blownCandlesCount = 0;

  for (let i = 1; i <= 7; i++) {
    const flame = document.getElementById(`flame-${i}`);
    if (flame) flame.classList.remove('extinguished');
  }

  const archText = document.getElementById('cake-arch-text');
  if (archText) archText.textContent = "MAKE A WISH";

  const hint = document.getElementById('cake-footer-hint');
  if (hint) hint.style.display = 'block';

  const banner = document.getElementById('cake-wish-banner');
  if (banner) banner.classList.add('hidden');
}

const MYSTERY_GIFTS = {
  1: {
    isMemories: true
  },
  2: {
    isCake: true
  },
  3: {
    icon: "👑",
    title: "Gift #3: Lifetime Happiness Pass",
    desc: "Unlimited hugs, endless laughter, and all your deepest birthday wishes coming true! 🎁💫💖"
  }
};

function openMysteryBox(boxNum) {
  if (boxNum === 1) {
    openMemoriesModal();
    return;
  }
  if (boxNum === 2) {
    openCakeModal();
    return;
  }
  if (boxNum === 3) {
    openLetterModal();
    return;
  }

  launchConfetti();
  const gift = MYSTERY_GIFTS[boxNum] || MYSTERY_GIFTS[3];
  
  const modal = document.getElementById('gift-modal');
  const iconEl = document.getElementById('gift-modal-icon');
  const titleEl = document.getElementById('gift-modal-title');
  const descEl = document.getElementById('gift-modal-desc');

  if (iconEl) iconEl.textContent = gift.icon;
  if (titleEl) titleEl.textContent = gift.title;
  if (descEl) descEl.textContent = gift.desc;

  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeGiftModal() {
  const modal = document.getElementById('gift-modal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

/* ─── SPECIAL BOX 3: LOVE & BIRTHDAY LETTER (TYPEWRITER ANIMATION) ─── */
const LETTER_SECTIONS = [
  {
    id: 'letter-headline-el',
    text: "Happy Birthday to my favourite\nperson, Vaishu! 🌸✨"
  },
  {
    id: 'letter-p1-el',
    text: "I hope this year brings you everything you've been wishing for and so much more. Thank you for making my days happier, my bad days easier, and life so much more fun just by being in it. 🥺💖"
  },
  {
    id: 'letter-p2-el',
    text: "I'm so lucky to have a bestie like you, Sona, and I can't wait to make a million more crazy memories together. Here's to you, your biggest dreams, and all the happiness you truly deserve."
  },
  {
    id: 'letter-closing-el',
    text: "Happy Birthday once again, Sona! Always in your corner, forever & ever. 🫶🏻🎂🌸"
  }
];

let letterTypewriterTimer = null;
let isLetterTyping = false;

function renderLetterInstant() {
  if (letterTypewriterTimer) {
    clearTimeout(letterTypewriterTimer);
    letterTypewriterTimer = null;
  }
  isLetterTyping = false;
  LETTER_SECTIONS.forEach(sec => {
    const el = document.getElementById(sec.id);
    if (!el) return;
    el.innerHTML = sec.text.replace(/\n/g, '<br>');
  });
  const existingCursor = document.getElementById('letter-typing-cursor');
  if (existingCursor) existingCursor.remove();
}

function skipLetterTypewriter() {
  if (isLetterTyping) {
    renderLetterInstant();
  }
}

function startLetterTypewriter() {
  if (letterTypewriterTimer) {
    clearTimeout(letterTypewriterTimer);
    letterTypewriterTimer = null;
  }
  isLetterTyping = true;

  // Clear target containers
  LETTER_SECTIONS.forEach(sec => {
    const el = document.getElementById(sec.id);
    if (el) el.innerHTML = '';
  });

  // Create or reuse blinking neon cursor
  let cursorEl = document.getElementById('letter-typing-cursor');
  if (!cursorEl) {
    cursorEl = document.createElement('span');
    cursorEl.id = 'letter-typing-cursor';
    cursorEl.className = 'typewriter-cursor';
  }

  let secIndex = 0;
  let charIndex = 0;

  function typeNextChar() {
    if (!isLetterTyping) return;

    if (secIndex >= LETTER_SECTIONS.length) {
      isLetterTyping = false;
      setTimeout(() => {
        if (cursorEl && cursorEl.parentNode) {
          cursorEl.style.transition = 'opacity 0.6s ease';
          cursorEl.style.opacity = '0';
          setTimeout(() => cursorEl.remove(), 600);
        }
      }, 1600);
      return;
    }

    const currentSection = LETTER_SECTIONS[secIndex];
    const el = document.getElementById(currentSection.id);
    const chars = Array.from(currentSection.text);

    if (charIndex < chars.length) {
      const ch = chars[charIndex];
      charIndex++;

      if (el) {
        if (ch === '\n') {
          el.appendChild(document.createElement('br'));
        } else {
          el.appendChild(document.createTextNode(ch));
        }
        el.appendChild(cursorEl);
      }

      // Natural emotional cadence (pause at punctuation/emojis)
      const delay = (ch === '.' || ch === '!' || ch === '?' || ch === '💖') ? 110 : (ch === ',' ? 50 : 16);
      letterTypewriterTimer = setTimeout(typeNextChar, delay);
    } else {
      secIndex++;
      charIndex = 0;
      letterTypewriterTimer = setTimeout(typeNextChar, 140);
    }
  }

  // Brief pause after polaroid drop before typing begins
  letterTypewriterTimer = setTimeout(typeNextChar, 380);
}

function openLetterModal() {
  launchConfetti();
  const modal = document.getElementById('letter-modal');
  if (modal) {
    modal.classList.remove('hidden');
    const card = modal.querySelector('.letter-card-container');
    if (card) {
      card.classList.remove('animate-letter');
      void card.offsetWidth;
      card.classList.add('animate-letter');
    }
    // Launch dynamic live typewriter typing
    startLetterTypewriter();
  }
}

function closeLetterModal() {
  if (letterTypewriterTimer) {
    clearTimeout(letterTypewriterTimer);
    letterTypewriterTimer = null;
  }
  isLetterTyping = false;
  const modal = document.getElementById('letter-modal');
  if (modal) modal.classList.add('hidden');
}

function handleLetterOverlayClick(e) {
  if (e.target.id === 'letter-modal' || e.target.classList.contains('letter-bg-backdrop')) {
    closeLetterModal();
  }
}

// Physical Keyboard Listener
window.addEventListener('keydown', (e) => {
  const letterModal = document.getElementById('letter-modal');
  if (letterModal && !letterModal.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeLetterModal();
      return;
    }
  }

  const cakeModal = document.getElementById('cake-modal');
  if (cakeModal && !cakeModal.classList.contains('hidden')) {
    if (e.key === 'Escape') {
      closeCakeModal();
      return;
    } else if (e.key === ' ' || e.key === 'Enter') {
      makeCakeWish();
      return;
    }
  }

  const memModal = document.getElementById('memories-modal');
  if (memModal && !memModal.classList.contains('hidden')) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      scrollClothesline(1);
      return;
    } else if (e.key === 'ArrowLeft') {
      scrollClothesline(-1);
      return;
    } else if (e.key === 'Escape') {
      closeMemoriesModal();
      return;
    }
  }

  if (!document.getElementById('quiz-screen').classList.contains('show')) return;
  if (e.key >= '0' && e.key <= '9') {
    pressKey(e.key);
  } else if (e.key === 'Backspace') {
    deleteDigit();
  } else if (e.key === 'Enter') {
    submitBirthdayDate();
  }
});

/* ─── STAGE COUNTDOWN CLOCK (5 SECONDS) ─── */
const hhEl = document.getElementById('hh');
const mmEl = document.getElementById('mm');
const ssEl = document.getElementById('ss');
const secHand = document.getElementById('second-hand');
const minHand = document.getElementById('minute-hand');
const hrHand = document.getElementById('hour-hand');

const pad = n => String(n).padStart(2, '0');
let countLeft = 5;
let countdownTimer = null;

function updateClock(h, m, s) {
  hhEl.textContent = pad(h);
  mmEl.textContent = pad(m);
  ssEl.textContent = pad(s);

  secHand.style.transform = `rotate(${s === 0 ? 360 : s * 6}deg)`;
  minHand.style.transform = `rotate(${(m + s / 60) * 6}deg)`;
  hrHand.style.transform  = `rotate(${((h % 12) + m / 60) * 30}deg)`;
}

function startCountdown() {
  countLeft = 5;
  updateClock(11, 59, 55);

  countdownTimer = setInterval(() => {
    countLeft--;
    if (countLeft > 0) {
      updateClock(11, 59, 60 - countLeft);
      playTick();
    } else {
      clearInterval(countdownTimer);
      updateClock(12, 0, 0);
      playMidnightChime();
      setTimeout(triggerMidnight, 700);
    }
  }, 1000);
}

/* ─── MIDNIGHT REVEAL ─── */
function triggerMidnight() {
  document.getElementById('midnight-burst').classList.add('flash');
  setTimeout(() => {
    document.getElementById('curtain-left').classList.add('open');
    document.getElementById('curtain-right').classList.add('open');
    document.getElementById('countdown-wrap').classList.add('hidden');
  }, 400);
  setTimeout(() => {
    document.getElementById('quiz-screen').classList.add('show');
  }, 1000);
}

/* ─── CONFETTI SYSTEM ─── */
function launchConfetti() {
  const colors = ['#ff6b9d','#ffd700','#ff4db8','#00bcd4','#69f0ae','#ff5722'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    const sz = Math.random() * 10 + 7;
    c.style.cssText = `left:${Math.random()*100}%;top:-20px;width:${sz}px;height:${sz}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'3px'};--cf-d:${Math.random()*3+2}s;--cf-delay:${Math.random()*2}s;`;
    document.body.appendChild(c);
  }
}

/* ─── MOUSE TRAIL HEARTS ─── */
let lastTrail = 0;
document.addEventListener('mousemove', e => {
  const now = Date.now();
  if (now - lastTrail < 120 || !document.getElementById('curtain-left').classList.contains('open')) return;
  lastTrail = now;
  const em = ['💖','💗','💕','✨','🌸'];
  const h = document.createElement('div');
  h.className = 'trail-heart';
  h.textContent = em[Math.floor(Math.random() * em.length)];
  h.style.left = (e.clientX - 10) + 'px';
  h.style.top = (e.clientY - 10) + 'px';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 800);
});

/* ─── DREAMY FALLING SAKURA (CHERRY BLOSSOM) PETALS ─── */
(function initSakuraCanvas() {
  const canvas = document.getElementById('sakura-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalsCount = 38;
  const petals = [];

  const petalColors = [
    'rgba(255, 183, 197, 0.85)',
    'rgba(248, 187, 208, 0.85)',
    'rgba(244, 143, 177, 0.8)',
    'rgba(252, 228, 236, 0.9)',
    'rgba(255, 209, 220, 0.85)',
  ];

  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 7 + 8,
      speedY: Math.random() * 0.9 + 0.7,
      speedX: Math.random() * 0.7 - 0.2,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.02 + 0.015,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.03 + 0.02,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    });
  }

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.scale(Math.cos(p.flip), 1);

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-p.size * 0.5, -p.size * 0.4, -p.size * 0.5, -p.size, 0, -p.size * 1.3);
    ctx.bezierCurveTo(p.size * 0.5, -p.size, p.size * 0.5, -p.size * 0.4, 0, 0);
    ctx.fill();

    ctx.restore();
  }

  function update() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.speedY;
      p.x += Math.sin(p.swayOffset) * 0.75 + p.speedX;
      p.swayOffset += p.swaySpeed;
      p.rotation += p.rotationSpeed;
      p.flip += p.flipSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      drawPetal(p);
    }

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
})();

/* ─── DREAMY MUSIC-BOX SYNTHESIZER & TOGGLE ─── */
let musicCtx = null;
let isMusicPlaying = false;
let musicTimer = null;
let melodyStep = 0;

const M_NOTES = [
  523.25, // C5
  587.33, // D5
  659.25, // E5
  698.46, // F5
  783.99, // G5
  880.00, // A5
  987.77, // B5
  1046.50 // C6
];

const MUSIC_BOX_MELODY = [
  { note: 2, dur: 380 }, // E5
  { note: 4, dur: 380 }, // G5
  { note: 5, dur: 500 }, // A5
  { note: 7, dur: 600 }, // C6
  { note: 6, dur: 400 }, // B5
  { note: 4, dur: 400 }, // G5
  { note: 2, dur: 500 }, // E5
  { note: 1, dur: 400 }, // D5

  { note: 2, dur: 380 }, // E5
  { note: 4, dur: 380 }, // G5
  { note: 5, dur: 500 }, // A5
  { note: 7, dur: 600 }, // C6
  { note: 6, dur: 400 }, // B5
  { note: 7, dur: 700 }, // C6
  { note: 0, dur: 450 }, // pause

  { note: 4, dur: 380 }, // G5
  { note: 7, dur: 400 }, // C6
  { note: 6, dur: 380 }, // B5
  { note: 5, dur: 500 }, // A5
  { note: 4, dur: 400 }, // G5
  { note: 2, dur: 450 }, // E5
  { note: 1, dur: 400 }, // D5
  { note: 2, dur: 650 }, // E5
  { note: 0, dur: 500 }, // pause
];

function playMusicBoxPluck(freq) {
  if (!musicCtx || !isMusicPlaying) return;
  try {
    const t = musicCtx.currentTime;

    const osc1 = musicCtx.createOscillator();
    const gain1 = musicCtx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, t);

    const osc2 = musicCtx.createOscillator();
    const gain2 = musicCtx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.756, t);

    const masterGain = musicCtx.createGain();
    masterGain.gain.setValueAtTime(0.0001, t);
    masterGain.gain.exponentialRampToValueAtTime(0.16, t + 0.015);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.35);

    gain1.gain.setValueAtTime(0.7, t);
    gain2.gain.setValueAtTime(0.12, t);

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(masterGain);
    gain2.connect(masterGain);
    masterGain.connect(musicCtx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 1.4);
    osc2.stop(t + 0.9);
  } catch (err) {
    // Graceful fallback
  }
}

function playNextMelodyStep() {
  if (!isMusicPlaying) return;
  const item = MUSIC_BOX_MELODY[melodyStep];
  melodyStep = (melodyStep + 1) % MUSIC_BOX_MELODY.length;

  if (item && item.note > 0) {
    const freq = M_NOTES[item.note];
    playMusicBoxPluck(freq);
  }

  musicTimer = setTimeout(playNextMelodyStep, item ? item.dur : 400);
}

function startBackgroundMusic() {
  if (isMusicPlaying) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!musicCtx) {
      musicCtx = new AudioCtx();
    }
    if (musicCtx.state === 'suspended') {
      musicCtx.resume();
    }
    isMusicPlaying = true;
    melodyStep = 0;
    updateMusicButtonState(true);
    playNextMelodyStep();
  } catch (e) {
    console.warn('Music init:', e);
  }
}

function stopBackgroundMusic() {
  isMusicPlaying = false;
  if (musicTimer) {
    clearTimeout(musicTimer);
    musicTimer = null;
  }
  updateMusicButtonState(false);
}

function toggleBackgroundMusic() {
  if (isMusicPlaying) {
    stopBackgroundMusic();
  } else {
    startBackgroundMusic();
  }
}

function updateMusicButtonState(isPlaying) {
  const btn = document.getElementById('music-toggle-btn');
  if (!btn) return;
  if (isPlaying) {
    btn.classList.add('playing');
    btn.classList.remove('muted');
    btn.setAttribute('title', 'Mute Music 🌸');
  } else {
    btn.classList.remove('playing');
    btn.classList.add('muted');
    btn.setAttribute('title', 'Play Dreamy Music 🌸');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('music-toggle-btn');
  if (btn) {
    btn.addEventListener('click', toggleBackgroundMusic);
    updateMusicButtonState(false);
  }
});

(function bindMusicBtnImmediate() {
  const btn = document.getElementById('music-toggle-btn');
  if (btn) {
    btn.addEventListener('click', toggleBackgroundMusic);
    updateMusicButtonState(false);
  }
})();

/* ─── START ON LOAD ─── */
startCountdown();


