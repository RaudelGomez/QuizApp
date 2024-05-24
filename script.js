let questions = [
	{
		question: "Wer hat HTML erfunden?",
		answer1: "Robbie Williams",
		answer2: "Lady Gaga",
		answer3: "Tim Berners-Lee",
		answer4: "Justin Bieber",
		right_answer: 3,
	},
	{
		question: "Was beutet das HTML tag &lt;a&gt;?",
		answer1: "Text Fett",
		answer2: "Container",
		answer3: "Ein Link",
		answer4: "Kursiv",
		right_answer: 3,
	},
	{
		question: "Was beutet das HTML Tag a?",
		answer1: "anchor",
		answer2: "amigo",
		answer3: "another",
		answer4: "allow",
		right_answer: 1,
	},
	{
		question: "Welches attribute kan man NICHT füt textarea verwenden?",
		answer1: "readonly",
		answer2: "max",
		answer3: "from",
		answer4: "spellcheck",
		right_answer: 1,
	},
	{
		question: "Was macht das HTML tag strong?",
		answer1: "Grope Buchstabe",
		answer2: "Text Fett",
		answer3: "Kleine Buchstabe",
		answer4: "Nichts",
		right_answer: 2,
	},
	{
		question: "Welches Element ist ein block Element?",
		answer1: "a",
		answer2: "span",
		answer3: "b",
		answer4: "p",
		right_answer: 4,
	},
	{
		question: "Welches Tag gehört nicht zu HTML?",
		answer1: "main",
		answer2: "side",
		answer3: "div",
		answer4: "article",
		right_answer: 2,
	},
];

let currentQuestion = 0;
let numberRightAnswer = 0;
let audio_success = new Audio("./audio/success.wav");
let audio_fail = new Audio("./audio/wrong.mp3");
let audio_end = new Audio("./audio/goodbye-honey.wav");

function init() {
	audio_end.pause();
	audio_end.currentTime = 0;
	document.getElementById("total-questions").innerHTML = questions.length;
	showQuestion();
}

function showQuestion() {
	if (gameisOver()) {
		//End Screen
		showEndScreen();
	} else {
		// Show question
		updateProgressBar();
		updateNextQuestion();
	}
}

function gameisOver() {
	return currentQuestion >= questions.length;
}

function showEndScreen() {
	document.getElementById("endScreen").style = "";
	document.getElementById("questionsBody").style = "display: none";
	document.getElementById("total-questions-result").innerHTML =
		questions.length;
	document.getElementById("right-answers-number").innerHTML = numberRightAnswer;
	document.getElementById("header-img").src = "./img/trophy.png";
	audio_end.play();
}

function updateProgressBar() {
	let porcent = (currentQuestion + 1) / questions.length;
	porcent = Math.round(porcent * 100);
	document.getElementById("progress-bar").innerHTML = `${porcent}%`;
	document.getElementById("progress-bar").style = `width: ${porcent}%`;
}

function updateNextQuestion() {
	let question = questions[currentQuestion];
	document.getElementById("number-current-question").innerHTML =
		currentQuestion + 1;
	document.getElementById("questionText").innerHTML = question.question;
	document.getElementById("answer_1").innerHTML = question.answer1;
	document.getElementById("answer_2").innerHTML = question.answer2;
	document.getElementById("answer_3").innerHTML = question.answer3;
	document.getElementById("answer_4").innerHTML = question.answer4;
}

function answer(currentAnswer) {
	let question = questions[currentQuestion];
	let selectQuestionNumber = +currentAnswer.slice(-1); //con esto me quedo con el ultimo valor osea seria 1, 2, 3 o 4)
	let idRightAnswer = `answer_${question.right_answer}`;
	if (rightAnswerSelected(question, selectQuestionNumber)) {
		wellDone(selectQuestionNumber);
		optionDisabled();
	} else {
		failSorry(selectQuestionNumber, idRightAnswer);
		optionDisabled();
	}
	document.getElementById("nextButton").disabled = false;
}

function rightAnswerSelected(question, selectQuestionNumber) {
	return question.right_answer === selectQuestionNumber;
}

function nextQuestion() {
	currentQuestion++;
	document.getElementById("nextButton").disabled = true;
	resetAnswer();
	showQuestion();
	optionEnable();
}

function wellDone(selectQuestionNumber) {
	document
		.getElementById(`answer_${selectQuestionNumber}`)
		.parentNode.classList.add("bg-success");
	numberRightAnswer++;
	audio_success.play();
}

function failSorry(selectQuestionNumber, idRightAnswer) {
	document
		.getElementById(`answer_${selectQuestionNumber}`)
		.parentNode.classList.add("bg-danger");
	document.getElementById(idRightAnswer).parentNode.classList.add("bg-success");
	audio_fail.play();
}

function resetAnswer() {
	document
		.getElementById("answer_1")
		.parentNode.classList.remove("bg-danger", "bg-success");
	document
		.getElementById("answer_2")
		.parentNode.classList.remove("bg-danger", "bg-success");
	document
		.getElementById("answer_3")
		.parentNode.classList.remove("bg-danger", "bg-success");
	document
		.getElementById("answer_4")
		.parentNode.classList.remove("bg-danger", "bg-success");
}

function restartGame() {
	document.getElementById("header-img").src = "./img/quiz.jpg";
	currentQuestion = 0;
	numberRightAnswer = 0;
	document.getElementById("endScreen").style = "display: none";
	document.getElementById("questionsBody").style = "";
	init();
}

function optionDisabled() {
	document
		.getElementById("answer_1")
		.parentNode.classList.add("cursor-disabled");
	document
		.getElementById("answer_2")
		.parentNode.classList.add("cursor-disabled");
	document
		.getElementById("answer_3")
		.parentNode.classList.add("cursor-disabled");
	document
		.getElementById("answer_4")
		.parentNode.classList.add("cursor-disabled");
}

function optionEnable() {
	document
		.getElementById("answer_1")
		.parentNode.classList.remove("cursor-disabled");
	document
		.getElementById("answer_2")
		.parentNode.classList.remove("cursor-disabled");
	document
		.getElementById("answer_3")
		.parentNode.classList.remove("cursor-disabled");
	document
		.getElementById("answer_4")
		.parentNode.classList.remove("cursor-disabled");
}
