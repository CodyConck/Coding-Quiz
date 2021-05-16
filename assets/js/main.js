var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');
var saveBtn = document.getElementById('save-score')

var quesDiv = document.getElementById('questions');
var displayQues = document.getElementById('displayQuestions');
var answers = document.getElementById('answers');

var endScreen = document.getElementById('end-screen')
var finalScore = document.getElementById('final-score')

var answerDisplay = document.getElementById('answer-prompt')
//15 seconds / question
var time = 75;
var clock

//Start Screen 
function startGame() {
  //Hide begin game div by adding class "hide-div"
  var startScreen = document.getElementById("begin-game")
  startScreen.setAttribute("class", "hide-div")
  //unhide-displaying questions div by removing class "hide div"
  quesDiv.removeAttribute("class")
  //want to start clock
  clock = setInterval(secondsPassed, 1000)
  timerEl.textContent = time
  getQuestion()
}
function secondsPassed() {
  //update the time
  time--
  timerEl.textContent = time
  //if user runs out of time, end quiz
  if (time <= 0) {
    endGame()
  }
  console.log(time)
}

function endGame() {
  clearInterval(clock)
  //hide questions
  quesDiv.setAttribute("class", "hide-div")
  //display game over screen
  endScreen.removeAttribute("class")
  //display final score
  timerEl.textContent = time
}
currentQuesIndex = 0

function getQuestion() {
  //getting current questions object from questions array
  var currentQues = quiz[currentQuesIndex]
  //display 'displayQuestions' 
  displayQues.textContent = currentQues.question
  //clear old questions
  answers.innerHTML = ''
  //loop over choices
  currentQues.answers.forEach(function (answer, i) {
    var choiceButton = document.createElement('button')
    choiceButton.setAttribute('class', 'choice')
    choiceButton.setAttribute('value', answer)
    choiceButton.textContent = i + 1 + answer
    answers.appendChild(choiceButton)

    choiceButton.onclick = makeChoice

  })
}
function makeChoice() {
  //check if answer is wrong
  if (this.value !== quiz[currentQuesIndex].correctAnswer) {
    //penalize for wrong answer
    time -= 10
    if (time < 0) {
      time = 0
    }

    //display new time and alert wrong answer
    timerEl.textContent = time
    answerDisplay.textContent = "Wrong, you have lost 10 seconds"
  } else {
    answerDisplay.textContent = "Correct!"
  }
  answerDisplay.setAttribute("class", "answer-prompt")
  setTimeout(function () {
    answerDisplay.setAttribute("class", "hide-div answer-prompt")
  }, 1000)

  //move to next question
  currentQuesIndex++

  if (currentQuesIndex === quiz.length) {
    endGame()
  } else {
    getQuestion()
  }
}

// function to save highscores
function saveHighScores() {
  // set up a variable to store value from text input
  var storeText = document.getElementById("score-entry").value

  // make sure value isn't empty THEN
  if (storeText) {
    var scoreHistory = JSON.parse(localStorage.getItem("high-scores-list")) || [];
    scoreHistory.push(storeText)
    localStorage.setItem("high-scores-list", JSON.stringify(scoreHistory));
    // GET SAVED HIGH SCORES FROM LOCALSTORAGE
    console.log(storeText)
    scoreHistory.forEach(function (initials) {
      const li = document.createElement("li")
      li.textContent = initials
      //display high scores
      var highScoreList = document.getElementById("high-score-list")
      highScoreList.append(li)
    })
    document.getElementById("high-score-list-container")
      .removeAttribute("class")
  }
}

saveBtn.onclick = saveHighScores;
startBtn.onclick = startGame;