// Wait for the DOM to be fully loaded before executing code
$(document).ready(function() {
  // Constants
  const cards = $(".card"); // Select all cards
  const centerCardIndex = 4; // Index of the center card (starts from 0)
  let timer;
  let timeLeft = 5; // Initial time left for revealing cards
  let timeLeftCenter = 5; // Initial time left for revealing center card
  let chosenArray = []; // Static array of size 8

  // Function to hide all cards except the center card
  function hideCards() {
      cards.not("#r2c2").addClass("hidden");
  }

  // Function to reveal all cards
  function revealCards() {
    cards.not("#r2c2").removeClass("hidden");
  }

  // Function to shuffle the chosenArray
  function shuffleChosenArray() {
      chosenArray = [];
      for (let i = 0; i < 8; i++) {
          chosenArray.push(Math.floor(Math.random() * 26));
      }
  }

  // Function to set the inner text of cards randomly
  function setCardTexts() {
      let randomIndex = Math.floor(Math.random() * 8);
      let centerCardValue = chosenArray[randomIndex];
      
      cards.each(function(index) {
          if (index < centerCardIndex) {
              $(this).text(chosenArray[index]);
          }
          else if (index > centerCardIndex) {
              $(this).text(chosenArray[index - 1]);
          }
      });
      $("#r2c2").text(centerCardValue);
  }

  // Function to reset the game
  function resetGame() {
    timeLeft = 8; // Reset the time left for revealing cards
    $("#time-left").text(timeLeft);
    const cards = $(".card"); // Select all cards

    // Reset the text of all cards to numbers 1 to 9
    for (let i = 0; i < cards.length; i++) {
        cards.eq(i).text(`CARD-${i + 1}`);
    }

    revealCards(); // Reveal all cards
    $("#r2c2, .selected").css("background-color", "");
    $(".card").removeClass("selected"); // Deselect all cards
}



  // Function to start the game
  $("#start-btn").click(function() {
      shuffleChosenArray();
      $("#r2c2").addClass("hidden");
      setCardTexts();
      revealCards();

      // Start the timer for revealing cards
      timer = setInterval(function() {
          timeLeft--; // Decrease time left
          $("#time-left").text(timeLeft); // Update timer text

          // If time runs out
          if (timeLeft === 0) {
              clearInterval(timer); // Stop the timer
              hideCards(); // Hide all non-center cards
              setTimeout(function() {
                  revealCenterCard(); // Reveal the center card after 2 seconds
              }, 2000);
          }
      }, 1000);

  });

  // Function to reveal the center card
function revealCenterCard() {
  $("#r2c2").removeClass("hidden");
  $(".card").click(handleCardClick); // Attach click event to cards
}


  // Function to handle card click
  function handleCardClick() {
      revealCards(); // Reveal all cards
      $(this).addClass("selected"); // Select the clicked card
      if ($(this).text() === $("#r2c2").text()) {
          // Matched
          $("#r2c2, .selected").css("background-color", "green");
          const highScoreElement = document.getElementById("high-score");
          const currentHighScore = parseInt(highScoreElement.innerText);
          const newHighScore = currentHighScore + 2;
          highScoreElement.innerText = newHighScore.toString();
      } else {
          // Not matched
          $("#r2c2, .selected").css("background-color", "red");
      }

      // After a brief delay, reset the background color and reset the game
      setTimeout(function() {
          $("#r2c2, .selected").css("background-color", "");
          resetGame();
      }, 10000);
  }

  // Function to reset the game
  $("#reset-btn").click(function() {
      resetGame(); // Reset the game
  });
});
