define(function () {
  const internals = {};
  const externals = {};

  let indexRandom = 0;
  let questionNumber = 1;

  internals.createQuestion = function (question) {
    if (
      question.results &&
      question.results[indexRandom] &&
      question.results[indexRandom].question
    ) {
      let questionAsked = question.results[indexRandom].question;
      let questiontoAnswer = `<p>${questionAsked}</p>`;
      return questiontoAnswer;
    }
  };

  internals.shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  internals.renderQuizz = function (question) {
    var quizzCard = $("#app");

    let questionCreated = internals.createQuestion(question);
    $("#question").empty().append(questionCreated);
    $("#questionNumber")
      .empty()
      .append(`Question: ` + questionNumber + `/10`);

    internals.renderAnswers(question);
    //internals.incrementIndex();
    internals.incrementQuestion();
    internals.createCategory(question);

    console.log(question);
  };



  internals.createAnswers = function (answer) {

    var arrayIncorrect = answer.results[indexRandom].incorrect_answers
    
    var correctAnswers = [answer.results[indexRandom].correct_answer];

    var answers = correctAnswers.concat(arrayIncorrect);

    console.log(answers);

    
    internals.shuffleArray(answers);
    console.log(answers);
    return answers;
  };

  internals.checkAnswer = function (selectedAnswer, correctAnswer) {
    return selectedAnswer === correctAnswer;
  };

  internals.renderAnswers = function (answers) {
    console.log(answers);
    var shuffledAnswers = internals.createAnswers(answers);
    var correctAnswer = answers.results[indexRandom].correct_answer;
  
    var choicesContainer = $(".choice-container");
    choicesContainer.empty();
  
    shuffledAnswers.forEach(function (choice, index) {
      var button = $("<button>")
        .text(choice)
        .addClass("choice-text")
        .on("click", function () {
          const selectedAnswer = $(this).text();
          const isCorrect = internals.checkAnswer(selectedAnswer, correctAnswer);
          const correct = `<p>${correctAnswer} is the correct answer!</p>`;
  
          var emptyResponse = $("#response");
  
          if (isCorrect) {
            console.log(correctAnswer + " is Correct");
            internals.createNextButton(answers);
            $(emptyResponse).empty().append(correct);
            $(this).css("background-color", "#97E67C");
            $(this).css("color", "white");
            $(this).css("border", "1px solid #97E67C");

          } else {

            console.log("Wrong");
            $(emptyResponse).empty();
            $("#nextbutton").empty();
            $("#response").empty().append("Wrong answer. Try another!");
            $(this).css("background-color", "#D85846");
            $(this).css("color", "white");
            $(this).css("border", "1px solid #D85846");
          }
        });
  
      choicesContainer.append(button);
    });
  };

  internals.resetButtonStyles = function () {
    $(".choice-text").each(function () {
      $(this).css({
        "background-color": "",  
        "color": "",             
        "border": ""             
      });
    });
  };

  internals.incrementIndex = function () {
    if (indexRandom === 9) {
      indexRandom = 0;
    } else {
      indexRandom++;
    }
    console.log(indexRandom);
  };

  internals.incrementQuestion = function () {
    if (questionNumber === 10) {
      questionNumber = 1;
    } else {
      questionNumber++;
    }
    console.log(questionNumber);
  };

  internals.createNextButton = function (question) {
    $("#nextbutton").empty();
    var button = `<button id ="button1"> Next Question </button>`;
    $("#nextbutton").append(button);
    internals.incrementIndex();
    internals.nextQuestionButton(question);
  };

  internals.nextQuestionButton = function (question) {
    var button1 = $("#button1");
    var emptyResponse = $("#response");

    $(button1).off("click");
    $(button1).on("click", function () {

      internals.renderQuizz(question);
      $(button1).remove();
      emptyResponse.empty();
      internals.resetButtonStyles();

    });

  };

  internals.createCategory = function (question) {
    var insert = "Category is: " + question.results[indexRandom].category;
    $("#category").empty().append(insert);
  };


  internals.createStartMenu = function(){

    var menu = `<div id="trivia"> <span>T</span>rivia <span>Q</span>uizz </div>`;
    var startButton = `<div id=startButton><button id ="button2" style="--clr:#df6694"> Start the Quizz <i></i></button></div>`
    $("#game").append(menu);
    $("#game").append(startButton); 
  }

  internals.renderStartButton = function (question) {
    internals.createStartMenu();
    var button2 = $("#button2");
    var emptyTrivia = $("#game");

    $(button2).off("click");
    $(button2).on("click", function () {
      $(button2).remove();
      emptyTrivia.empty();
      internals.renderQuizz(question);
    });

  };

  externals.render = function (question) {
    //internals.renderQuizz(question);
    //internals.createStartMenu(question);
    internals.renderStartButton(question);
  };
  return externals;
});
