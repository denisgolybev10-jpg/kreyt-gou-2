const TELEGRAM_URL = "https://t.me/+iXEe9Nt8a8w5Y2Zi";
const NICK_RE = /^[A-Za-z0-9_]{3,16}$/;

const questions = [
  {
    text: "Сколько граней у куба (блока в Minecraft)?",
    answers: ["4", "6", "8"],
    correct: 1,
  },
]

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const iqErrorEl = document.getElementById("iq-error");
const stepIq = document.getElementById("step-iq");
const stepNick = document.getElementById("step-nick");
const stepJoin = document.getElementById("step-join");
const nickForm = document.getElementById("nick-form");
const nickInput = document.getElementById("nick");
const nickError = document.getElementById("nick-error");
const savedNick = document.getElementById("saved-nick");
const tgLink = document.getElementById("tg-link");

tgLink.href = TELEGRAM_URL;

let current = 0;

function renderQuestion() {
  const q = questions[current];
  questionEl.textContent = q.text;
  answersEl.innerHTML = "";
  iqErrorEl.hidden = true;

  q.answers.forEach((label, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = label;
    btn.addEventListener("click", () => choose(index, btn));
    answersEl.appendChild(btn);
  });
}

function choose(index, btn) {
  const q = questions[current];
  if (index !== q.correct) {
    btn.classList.add("wrong");
    iqErrorEl.hidden = false;
    iqErrorEl.textContent = "Неа, попробуй ещё раз — задача лёгкая.";
    return;
  }

  current += 1;
  if (current < questions.length) {
    renderQuestion();
    return;
  }

  stepIq.hidden = true;
  stepNick.hidden = false;
  nickInput.focus();
}

nickForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nick = nickInput.value.trim();

  if (!NICK_RE.test(nick)) {
    nickError.hidden = false;
    nickError.textContent = "Ник Minecraft: 3–16 символов, латиница, цифры и _";
    return;
  }

  nickError.hidden = true;
  savedNick.textContent = nick;
  stepNick.hidden = true;
  stepJoin.hidden = false;
});

renderQuestion();
