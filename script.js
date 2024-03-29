// Wait for the DOM to be fully loaded before executing code
$(document).ready(function() {
  // Constants
  const cards = $(".mycard"); // Select all cards
  const centerCardIndex = 4; // Index of the center mycard (starts from 0)
  let timer;
  let timeLeft = 5; // Initial time left for revealing cards
  let timeLeftCenter = 5; // Initial time left for revealing center mycard
  let chosenArray = []; // Static array of size 8
  let processingGuess = false;
  let playable = true;

  // Function to hide all cards except the center mycard
  function hideCards() {
      cards.not("#r2c2").addClass("hidden");
  }

  // Function to reveal all cards
  function revealCards() {
    cards.not("#r2c2").removeClass("hidden");
  }

  // Function to shuffle the chosenArray
  function shuffleChosenArray() {
    chosenArray = new Set(); // Create a set to store unique numbers

    // Generate eight unique random numbers
    while (chosenArray.size < 8) {
        let randomNumber = Math.floor(Math.random() * 26); // Generate random number between 0 and 26
        chosenArray.add(randomNumber); // Add the random number to the set
    }

    chosenArray = Array.from(chosenArray); // Convert the set back to an array
  }

  // Function to set the inner text of cards randomly
  // Function to set the inner text of cards randomly
function setCardTexts() {
    let randomIndex = Math.floor(Math.random() * 8);
    let centerCardValue = chosenArray[randomIndex];
    
    cards.each(function(index) {
        if (index < centerCardIndex) {
            $(this).text(String.fromCharCode(chosenArray[index] + 65)); // Convert number to ASCII and then to corresponding letter
        } else if (index > centerCardIndex) {
            $(this).text(String.fromCharCode(chosenArray[index - 1] + 65)); // Convert number to ASCII and then to corresponding letter
        }
    });

    // Set the center mycard text based on the chosen value
    $("#r2c2").text(String.fromCharCode(centerCardValue + 65)); // Convert number to ASCII and then to corresponding letter
}


  // Function to reset the game
  function resetGame() {
    timeLeft = 5; // Reset the time left for revealing cards
    clearInterval(timer);
    processingGuess = false;
    playable = false;
    
    $("#time-left").text(timeLeft);
    const cards = $(".mycard"); // Select all cards

    // Reset the text of all cards to numbers 1 to 9
    for (let i = 0; i < cards.length; i++) {
        cards.eq(i).text(`CARD-${i + 1}`);
    }

    revealCards(); // Reveal all cards
    $("#r2c2, .selected").css("background-color", "");
    $('#r2c2').removeClass("hidden");
    $(".mycard").removeClass("selected"); // Deselect all cards
}



  // Function to start the game
  $("#start-btn").click(function() {
      $('#curr-status').text("Playing Game, memorize the cards in 5sec.");
      shuffleChosenArray();
      $("#r2c2").addClass("hidden");
      setCardTexts();
      revealCards();
      playable = true;

      // Start the timer for revealing cards
      timer = setInterval(function() {
          timeLeft--; // Decrease time left
          $("#time-left").text(timeLeft); // Update timer text

          // If time runs out
          if (timeLeft === 0) {
                $('#curr-status').text("Playing Game, Wait for 2sec");
              clearInterval(timer); // Stop the timer
              hideCards(); // Hide all non-center cards
              setTimeout(function() {
                  revealCenterCard(); // Reveal the center mycard after 2 seconds
                  $('#curr-status').text("Playing Game,\n Guess the matching pair of center Card");
              }, 2000);
          }
      }, 1000);

  });

  // Function to reveal the center mycard
function revealCenterCard() {
  $("#r2c2").removeClass("hidden");
  $(".mycard").click(handleCardClick); // Attach click event to cards
}


  // Function to handle mycard click
  function handleCardClick() {
    if (processingGuess || !playable) {
        return; // Ignore further clicks
    }
    else {
        processingGuess = true;
      revealCards(); // Reveal all cards
      $(this).addClass("selected"); // Select the clicked mycard
      if ($(this).text() === $("#r2c2").text()) {
          // Matched
          $("#r2c2, .selected").css("background-color", "green");
          $('#curr-status').text("Game Ended,Guesed Correctly.\nCongrats 🥳, Score +2");
          const highScoreElement = document.getElementById("high-score");
          const currentHighScore = parseInt(highScoreElement.innerText);
          const newHighScore = currentHighScore + 2;
          highScoreElement.innerText = newHighScore.toString();
      } else {
          // Not matched
          $('#curr-status').text("Game Ended, Guesed Incorrect,\nBetter Luck Next Time😓")
          $("#r2c2, .selected").css("background-color", "red");
      }

      // After a brief delay, reset the background color and reset the game
      setTimeout(function() {
          $("#r2c2, .selected").css("background-color", "");
          resetGame();
      }, 2000);
    }
  }

  // Function to reset the game
  $("#reset-btn").click(function() {
      resetGame(); // Reset the game
  });
});


// Function to display the rules as a prompt
function displayRules() {
    // Define the rules message
    const rulesMessage = "Welcome to the Memory Game!\n\n" +
                         "Rules:\n" +
                         "- Click 'Start Game' to begin.\n" +
                         "- Remember the Non Center cards value after it is briefly shown.\n" +
                         "- After few seconds all cards are hidden and center card is diplayed."+
                         "- Click on the card you think matches the center card.\n" +
                         "- Each correct match earns you points.\n" +
                         "- Click 'Reset Game' to start over.\n\n" +
                         "Good luck and have fun!";

    // Display the rules message as a prompt
    alert(rulesMessage);
}

// Attach click event to the rules button
$("#rules-btn").click(function() {
    // Call the function to display the rules as a prompt
    displayRules();
});