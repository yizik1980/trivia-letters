// ═══════════════════════════════════════════════════════════════════
// ISL Hand Signs – rendered from image files (signes.jpg crops)
// ═══════════════════════════════════════════════════════════════════

// ── א Alef ── from signes.jpg cropped image
const ALEF = `<img src="./letters/alef.png" alt="א" />`;

// ── ב Bet ── from signes.jpg cropped image
const BET = `<img src="./letters/bet.png" alt="ב" />`;

// ── ג Gimel ── from signes.jpg cropped image
const GIMEL = `<img src="./letters/gimel.png" alt="ג" />`;

// ── ד Dalet ── from signes.jpg cropped image
const DALET = `<img src="./letters/dalet.png" alt="ד" />`;

// ── ה He ── from signes.jpg cropped image
const HE = `<img src="./letters/he.png" alt="ה" />`;

// ── ו Vav ── from signes.jpg cropped image
const VAV = `<img src="./letters/vav.png" alt="ו" />`;

// ── ז Zayin ── from signes.jpg cropped image
const ZAYIN = `<img src="./letters/zain.png" alt="ז" />`;

// ── ח Chet ── from signes.jpg cropped image
const CHET = `<img src="./letters/chet.png" alt="ח" />`;

// ── ט Tet ── from signes.jpg cropped image
const TET = `<img src="./letters/tet.png" alt="ט" />`;

// ── י Yod ── from signes.jpg cropped image
const YOD = `<img src="./letters/yod.png" alt="י" />`;

// ── כ Kaf ── from signes.jpg cropped image
const KAF = `<img src="./letters/kaf.png" alt="כ" />`;

// ── ל Lamed ── from signes.jpg cropped image
const LAMED = `<img src="./letters/lamed.png" alt="ל" />`;

// ── מ Mem ── from signes.jpg cropped image
const MEM = `<img src="./letters/meim.png" alt="מ" />`;

// ── נ Nun ── from signes.jpg cropped image
const NUN = `<img src="./letters/nun.png" alt="נ" />`;

// ── ס Samech ── from signes.jpg cropped image
const SAMECH = `<img src="./letters/samech.png" alt="ס" />`;

// ── ע Ayin ── from signes.jpg cropped image
const AYIN = `<img src="./letters/hain.png" alt="ע" />`;

// ── פ Pe (motionless) ── from signes.jpg cropped image
const PE = `<img src="./letters/pai.png" alt="פ" />`;

// ── צ Tsadi ── from signes.jpg cropped image
const TSADI = `<img src="./letters/zadik.png" alt="צ" />`;

// ── ק Qof ── from signes.jpg cropped image
const QOF = `<img src="./letters/koff.png" alt="ק" />`;

// ── ר Resh ── from signes.jpg cropped image
const RESH = `<img src="./letters/riesh.png" alt="ר" />`;

// ── ש Shin ── from signes.jpg cropped image
const SHIN1 = `<img src="./letters/shin.png" alt="ש" />`;

// ── ת Tav ── from signes.jpg cropped image
const TAV = `<img src="./letters/taff.png" alt="ת" />`;

// ════════════════════════════════════════
// Sign map – using SHIN1 as the canonical ש
const signs = {
  א: ALEF,
  ב: BET,
  ג: GIMEL,
  ד: DALET,
  ה: HE,
  ו: VAV,
  ז: ZAYIN,
  ח: CHET,
  ט: TET,
  י: YOD,
  כ: KAF,
  ל: LAMED,
  מ: MEM,
  נ: NUN,
  ס: SAMECH,
  ע: AYIN,
  פ: PE,
  צ: TSADI,
  ק: QOF,
  ר: RESH,
  ש: SHIN1,
  ת: TAV,
};

const letters = [
  "א",
  "ב",
  "ג",
  "ד",
  "ה",
  "ו",
  "ז",
  "ח",
  "ט",
  "י",
  "כ",
  "ל",
  "מ",
  "נ",
  "ס",
  "ע",
  "פ",
  "צ",
  "ק",
  "ר",
  "ש",
  "ת",
];

let queue = [],
  current = null,
  qIndex = 0,
  scoreCorrect = 0,
  scoreWrong = 0,
  answered = false;
const total = letters.length;

function shuffle(arr) {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startGame() {
  queue = shuffle(letters);
  qIndex = 0;
  scoreCorrect = 0;
  scoreWrong = 0;
  document.getElementById("scoreCorrect").textContent = 0;
  document.getElementById("scoreWrong").textContent = 0;
  document.getElementById("endScreen").classList.remove("visible");
  ["questionCard", "optionsGrid"].forEach(
    (id) => (document.getElementById(id).style.display = ""),
  );
  document.querySelector(".progress-bar-wrap").style.display = "";
  document.getElementById("progressLabel").style.display = "";
  document.querySelector(".score-strip").style.display = "";
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  document.getElementById("nextBtn").classList.remove("visible");
  const fb = document.getElementById("feedback");
  fb.className = "feedback hidden";
  fb.textContent = "";
  current = queue[qIndex];
  document.getElementById("hebrewLetter").textContent = current;
  document.getElementById("letterName").textContent = current;
  const pct = Math.round((qIndex / total) * 100);
  document.getElementById("progressBar").style.width = pct + "%";
  document.getElementById("progressLabel").textContent =
    `שאלה ${qIndex + 1} מתוך ${total}`;
  const others = shuffle(
    letters.filter((l) => l !== current),
  ).slice(0, 3);
  const options = shuffle([current, ...others]);
  const grid = document.getElementById("optionsGrid");
  grid.innerHTML = "";
  ["A", "B", "C", "D"].forEach((lbl, i) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `<div class="opt-label">${lbl}</div>${signs[options[i]]}`;
    btn.onclick = () =>
      handleAnswer(options[i] === current, btn, options);
    grid.appendChild(btn);
  });
  const card = document.getElementById("questionCard");
  card.style.animation = "none";
  setTimeout(() => {
    card.style.animation = "";
  }, 10);
}

function handleAnswer(isCorrect, btn, options) {
  if (answered) return;
  answered = true;
  const btns = document.querySelectorAll(".option-btn");
  btns.forEach((b) => (b.disabled = true));
  const fb = document.getElementById("feedback");
  if (isCorrect) {
    btn.classList.add("correct");
    scoreCorrect++;
    document.getElementById("scoreCorrect").textContent = scoreCorrect;
    fb.className = "feedback correct";
    fb.textContent = "✅ נכון! כל הכבוד!";
  } else {
    btn.classList.add("wrong");
    scoreWrong++;
    document.getElementById("scoreWrong").textContent = scoreWrong;
    fb.className = "feedback wrong";
    fb.textContent = `❌ לא נכון. הסימן הנכון של "${current}" מסומן בירוק`;
    btns.forEach((b, i) => {
      if (options[i] === current) b.classList.add("correct");
    });
  }
  document.getElementById("nextBtn").classList.add("visible");
}

function nextQuestion() {
  qIndex++;
  if (qIndex >= total) showEnd();
  else loadQuestion();
}

function showEnd() {
  ["questionCard", "optionsGrid"].forEach(
    (id) => (document.getElementById(id).style.display = "none"),
  );
  document.querySelector(".progress-bar-wrap").style.display = "none";
  document.getElementById("progressLabel").style.display = "none";
  document.querySelector(".score-strip").style.display = "none";
  document.getElementById("nextBtn").classList.remove("visible");
  document.getElementById("feedback").className = "feedback hidden";
  const pct = Math.round((scoreCorrect / total) * 100);
  document.getElementById("endScore").textContent = `${scoreCorrect}/${total}`;
  let msg = "";
  if (pct === 100) msg = "🏆 מושלם! שלטת בכל האותיות!";
  else if (pct >= 80) msg = "🌟 מצוין! כמעט מושלם!";
  else if (pct >= 60) msg = "👍 יפה מאוד! תוכל לשפר עוד יותר";
  else if (pct >= 40) msg = "💪 טוב! כדאי לתרגל עוד קצת";
  else msg = "📚 המשך לתרגל – תשתפר!";
  document.getElementById("endMsg").textContent = msg;
  document.getElementById("endScreen").classList.add("visible");
}

startGame();
