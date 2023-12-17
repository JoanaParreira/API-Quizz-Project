define(function () {
  const internals = {};
  const externals = {};

  let indexRandom = 0;
  let questionNumber = 1;
  
  internals.createQuestion = function (question) {
    let questionAsked = question.results[indexRandom].question;
    let questiontoAnswer = `<p>${questionAsked}</p>`
    return questiontoAnswer;
  };

  internals.shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  internals.createAnswers = function (answer) {
    var answers = [answer.results[indexRandom].correct_answer,
                   answer.results[indexRandom].incorrect_answers[0],
                   answer.results[indexRandom].incorrect_answers[1],
                   answer.results[indexRandom].incorrect_answers[2]];
    console.log(answers);
    internals.shuffleArray(answers);
    console.log(answers);
    return answers;
  }

  internals.checkAnswer = function (selectedAnswer, correctAnswer) {
    return selectedAnswer === correctAnswer;
  };


  internals.renderQuizz = function (question) {
      //var quizzCard = $("#app");
      //if (quizzCard) {
      //quizzCard.empty();
    //}
    internals.createCategory();
    
    let questionCreated = internals.createQuestion(question);
    $("#question").append(questionCreated);
    $("#questionNumber").append(`Question: ` + questionNumber + `/10`);

    internals.renderAnswers(question);

    internals.incrementIndex();
    internals.incrementQuestion();
    console.log("A PRÓXIMA PERGUNTA SERIA: " + question.results[indexRandom].question);
  };

  internals.incrementIndex = function(){
     if (indexRandom === 9) {
      indexRandom = 0;
    }
    indexRandom++;
    console.log(indexRandom);
  }

  internals.incrementQuestion = function(){
    if(questionNumber === 10){
      questionNumber = 1;
    }
    questionNumber++;
    console.log(questionNumber);
  }

  internals.renderAnswers = function (answers){
    const shuffledAnswers = internals.createAnswers(answers);
    const correctAnswer = answers.results[indexRandom].correct_answer;
    

     $(".choice-text").each(function (index){
      $(this).text(shuffledAnswers[index]);
      $(this).off("click");

      $(this).on("click", function(){
        const selectedAnswer = $(this).text();

        const isCorrect = internals.checkAnswer(selectedAnswer, correctAnswer);
        const correct = `<p>${correctAnswer} is the correct answer!</p>`
       
        var emptyResponse = $("#response");

        if(isCorrect){
          console.log(correctAnswer + " is Correct");
          $(emptyResponse).empty();
          $("#response").append(correct);
          $(this).css("background-color", "#97E67C");
          $(this).css("color", "white")
          $(this).css("border", "1px solid #97E67C")
          internals.createNexButton();
        } else {
          console.log("Wrong");
          $(emptyResponse).empty();
          $("#nextbutton").empty();
          $("#response").append("Wrong answer. Try another!")
          $(this).css("background-color", "#D85846");
          $(this).css("color", "white")
          $(this).css("border", "1px solid #D85846")
        }
      })
    });
  };

  internals.createNexButton= function(){
    var button = `<button id ="button1"> Next Question </button>`;
    $("#nextbutton").append(button);;
    internals.nextQuestionButton();
  }

  internals.nextQuestionButton = function(){
    console.log("HELOOOOOO")
    let button1 = $("#button1");
    $(button1).on("click", function(){
      internals.renderQuizz(question);  
    });
  };
  
  internals.createCategory= function(){
    var insert = "Category is: Animals";
    $("#category").empty().append(insert);
  }

  externals.render = function (question) {
    internals.renderQuizz(question);
  };
  return externals;
});
