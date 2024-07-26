let quizData = [
  {
    question: "What is the capital of Italy?",
    options: ["Rome", "Berlin", "Madrid", "Paris"],
    answer: "Rome",
  },
  {
    question: "What is the capital of France?",
    options: ["Rome", "Berlin", "Madrid", "Paris"],
    answer: "Paris",
  },
  {
    question: "What is the capital of Germany?",
    options: ["Rome", "Berlin", "Madrid", "Paris"],
    answer: "Berlin",
  },
  {
    question: "What is the capital of Spain?",
    options: ["Rome", "Berlin", "Madrid", "Paris"],
    answer: "Madrid",
  },
  {
    question: "In which year did Christopher Columbus reach the Americas?",
    options: ["1492", "1493", "1494", "1495"],
    answer: "1492",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Edgar Allan Poe",
      "Charles Dickens",
      "Jane Austin",
    ],
    answer: "William Shakespeare",
  },
  {
    question: " Which ocean is only ocean on the name of a any country?",
    options: [
      "Pacific Ocean",
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
    ],
    answer: "Indian Ocean",
  },
];
let currentQuestionIndex = 0;
let userAnswer = [];
let timeLeft = 59;
let timer;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("option-container");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const timerDisplay = document.getElementById("timer");

nextButton.addEventListener("click", loadNextQuestion);
submitButton.addEventListener("click", showQuizResults);

displayQuestion();
startTimer();
function updateTimer() {
  if (timeLeft > 0) {
    const seconds = timeLeft;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    timerDisplay.textContent = displaySeconds;
    timeLeft--;
  } else {
    clearInterval(timer);
    timerDisplay.textContent = "0";
    showQuizResults();
  }
}

function startTimer() {
  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function selectAnswer(answer) {
  const optionButtons = document.querySelectorAll(".quiz-option");
  optionButtons.forEach((button) => button.classList.remove("selected"));
  const selectedOption = optionsContainer.querySelector(
    `.quiz-option[data-option="${answer}"]`
  );
  selectedOption.classList.add("selected");
  userAnswer[currentQuestionIndex] = answer;
}
function evaluateUserAnswers() {
  let score = 0;
  quizData.forEach((question, index) => {
    if (userAnswer[index] === question.answer) {
      score += 10;
    }
  });
  return score;
}
function showQuizResults() {
  clearInterval(timer);
  const userScore = evaluateUserAnswers();
  timerDisplay.textContent = "!!!";
  scoreContainer.textContent = `Your Score:${userScore} out of ${
    quizData.length * 10
  }`;
}

function loadNextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    clearInterval(timer);
    timerDisplay.textContent = "!!!";
    showQuizResults();
  }
}

function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;

  optionsContainer.innerHTML = "";
  const optionLetters = ["A", "B", "C", "D"];

  currentQuestion.options.forEach((option, index) => {
    const optionContainer = document.createElement("div");
    optionContainer.classList.add("quiz-card");

    const optionLabel = document.createElement("span");
    optionLabel.textContent = optionLetters[index];
    optionLabel.classList.add("option-label");
    optionContainer.appendChild(optionLabel);

    const optionButton = document.createElement("button");
    optionButton.textContent = option;
    optionButton.classList.add("quiz-option");
    optionContainer.appendChild(optionButton);

    optionButton.setAttribute("data-option", option);
    optionContainer.addEventListener("click", () => selectAnswer(option));

    optionsContainer.appendChild(optionContainer);
  });
}
