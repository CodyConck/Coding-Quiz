// The array of questions for the game.
var questions = [
    { q: 'You can add JS directly to an HTML file.', a: 't' },
    { q: 'There are other ways to style your page besides CSS stylesheets.', a: 't' },
    { q: 'Bootstrap makes coding more diffcult', a: 'f' },
    { q: 'There is only one correct way to build a webpage', a: 'f' },
    { q: 'Coding bootcamp is a breeze', a: 'f' }
  ];
  
  // We start the game with a score of 0.
  var score = 0;
  
  // Loop over every question object
  for (var i = 0; i < questions.length; i++) {
    // Display current question to user and ask OK/Cancel
    var answer = confirm(questions[i].q);
  
    // Compare answers
    if (
      (answer === true && questions[i].a === 't') ||
      (answer === false && questions[i].a === 'f')
    ) {
      // Increase score
      score++;
      // Alert the user
      alert('Correct!');
    } else {
      alert('Wrong!');
    }
  }
  
  // Show total at end
  alert('You got ' + score + '/' + questions.length);