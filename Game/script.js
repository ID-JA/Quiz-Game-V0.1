$.ajax({
  method: 'Get',
  url: 'data.json',
  dataType: 'JSON',
  success: function (data, status) {
    // ! Call all the element from the Document
    // => This is for the Container
    const gameContainer = $('.container');

    // => This for Quetions Counter
    const currentQuestion = $('#currentQ');
    const allQuestions = $('#totalQs');

    // => This for Score Counter
    const score = $('#score');

    // => This for The Content
    const theQuestion = $('.question');
    const ThechoicesContainer = $('.propos-container');
    const theMsg = $('.message');
    const btnCheck = $('#check');
    const btnNew = $('#new');

    // => Some variabls
    let cmptReponse;
    let posQ;
    let posC;
    let totalScore;
    const totalQuestions = data.questions.length;

    // ! Genreat some Good Words
    let indexOfWord;
    let getWord;
    const genreatGoodWord = function (indexOfWord, getWord) {
      indexOfWord = Math.floor(Math.random() * 4);
      getWord = data.goodWords[indexOfWord];

      theMsg.text(getWord);
    };
    genreatGoodWord();
    // ! Check if I Finished Function
    const checkFinish = function (checkWith) {
      if (cmptReponse >= checkWith) {
        currentQuestion.text(totalQuestions);
        btnCheck.attr('disabled', true);
        theQuestion.text('You Finish The Game Press "New" To Play Again');
        theQuestion.css('textAlign', 'center');
        ThechoicesContainer.empty();
        resttUi(`Total Score: ${totalScore}`, 'End');
        score.text('0');
      }
    };

    // ! Rest UI Functtion
    const resttUi = function (messageOutput, valBtn) {
      theMsg.text(messageOutput);
      btnCheck.val(valBtn);
    };

    // ! Start Game Function
    const satrtGame = function (indexOfQuestion, indexOfChoises) {
      // Enabled Check button
      btnCheck.attr('disabled', false);

      // remove old child of choices container
      ThechoicesContainer.empty();

      // Set The Current Questions and fill ChoicesContainer
      currentQuestion.text(indexOfQuestion + 1);
      theQuestion.text(data.questions[indexOfQuestion]);
      if (!(cmptReponse >= totalQuestions)) {
        ThechoicesContainer.append(`<div class="choix"><input type="radio" name="choix" class="choi" value="${data.choises[indexOfChoises].choix1}" /><span>${data.choises[indexOfChoises].choix1}</span></div>
      <div class="choix"><input type="radio" name="choix"  class="choi" value="${data.choises[indexOfChoises].choix2}" /><span>${data.choises[indexOfChoises].choix2}</span></div>
      <div class="choix"><input type="radio" name="choix"  class="choi" value="${data.choises[indexOfChoises].choix3}" /><span>${data.choises[indexOfChoises].choix3}</span></div>
      `);
      }
    };

    // Set Number Of Total Questions
    allQuestions.text(totalQuestions);

    // Click in Button "New"
    btnNew.on('click', function () {
      posQ = 0;
      posC = 0;
      cmptReponse = 0;
      totalScore = 0;
      satrtGame(posQ, posC);
      resttUi('', 'Check');
    });

    btnCheck.on('click', function () {
      if ($(this).val() == 'Check') {
        // if the answer is Correct
        if ($(':checked').val() === data.answers[cmptReponse]) {
          totalScore += 1;
          resttUi('', 'Next');
          genreatGoodWord();
          gameContainer.addClass('correct');
          checkFinish(totalQuestions);
          score.text(totalScore);

          //  if user doesn't choise any answer
        } else if ($(':checked').length == 0) {
          resttUi('lost', 'Next');
          gameContainer.addClass('fail');
          checkFinish(totalQuestions);
        } else {
          resttUi('Bad Choise', 'Next');
          gameContainer.addClass('fail');
        }
      } else {
        gameContainer.removeClass('correct');
        gameContainer.removeClass('fail');
        btnCheck.val('Check');
        theMsg.text('');
        cmptReponse += 1;
        posQ += 1;
        posC += 1;
        satrtGame(posQ, posC);
        checkFinish(totalQuestions);
      }
    });
  },
});
