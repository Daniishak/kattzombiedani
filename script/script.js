  const northBtn = document.getElementById("north");
  const southBtn = document.getElementById("south");
  const westBtn = document.getElementById("west");
  const eastBtn = document.getElementById("east");
  const selectedImageDiv = document.querySelector(".selected-image");
  const specialPositions = {};

  let images = [
    "images/årbyip.png",
    "images/arkenzoo.png",
    "images/ärstaskolan.png",
    "images/borsökna.png",
    "images/centrum.png",
    "images/cirkelk.png",
    "images/elite.png",
    "images/gallerian.png",
    "images/klosterkyrkan.png",
    "images/kompetens.png",
    "images/långbergsparken.png",
    "images/maxi.png",
    "images/mdu.png",
    "images/mediamarkt.png",
    "images/parkenzoo.png",
    "images/polisstation.png",
    "images/preem.png",
    "images/rekarneskolan.png",
    "images/rinman.png",
    "images/stadsbibliotek.png",
    "images/Sundbyholm.png",
    "images/torget.png",
    "images/tunapark.png",
    "images/tunavallen.png",
    "images/vårdcentralen.png"
  ];

  let table = [
    ["O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O"],
    ["O", "O", "X", "O", "O"],
    ["O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O"],
  ];

  let posX = 2;
  let posY = 2;

  function updateTable() {
    let tableStr = "<table>";
    for (let i = 0; i < 5; i++) {
      tableStr += "<tr>";
      for (let j = 0; j < 5; j++) {
        tableStr += `<td>${table[i][j]}</td>`;
      }
      tableStr += "</tr>";
    }
    tableStr += "</table>";

    document.querySelector(".image").innerHTML = tableStr;
  }

  function showSelectedImage() {
    let index = posX + posY * 5;
    selectedImageDiv.innerHTML = `<img src="${images[index]}" alt="Selected image" />`;
  
    if (specialPositions[index] === "cat") {
      selectedImageDiv.innerHTML += `<img class="cat-image" src="${catImages[catFound]}" alt="Cat image" />`;
      catFound++;
      document.getElementById("points").textContent = `${catFound}`;
  
      if (catFound === 3) {
        // Player wins, show alert and then reset the game
        setTimeout(() => {
          alert("Congratulations, you found all three cats and won the game!");
          location.reload();
          resetGame();
        }, 1000);
      }
    } else if (specialPositions[index] === "zombie") {
      // Player loses, reset the game
      selectedImageDiv.innerHTML += `<img class="zombie-image" src="${zombieImage}" alt="Zombie image" />`;
      gameOver = true;
      setTimeout(() => {
        alert("You found the zombie! Game over.");
        // Refresh the page
        location.reload();
        resetGame(() => {
          alert("The game has been reset. Try again!");
        });
      }, 1000);
    }
  }
  

  function move(dy, dx) {
    if (gameOver) return;

    const newX = posX + dx;
    const newY = posY + dy;

    if (newX >= 0 && newX < 5 && newY >= 0 && newY < 5) {
      table[posY][posX] = "O";
  posX = newX;
  posY = newY;
  table[posY][posX] = "X";
  updateTable();
  showSelectedImage();
  }
  }

  const catImages = [
  "images/katt.png",
  "images/katt.png",
  "images/katt.png"
  ];

  const zombieImage = "images/zombie.png";

  let catPositions = [];
  let catFound = 0;
  let gameOver = false;

  function resetGame(callback) {
    catFound = 0;
    gameOver = false;
    posX = 2;
    posY = 2;
    catPositions = [];
    images = [...originalImages]; // Reset images array to original state
    specialPositions = {}; // Reset special positions object
    generateRandomCatPositions();
    generateRandomZombiePosition();
    updateTable();
    showSelectedImage();
    document.getElementById("points").textContent = `${catFound}`;
  
    if (callback) {
      callback();
    }
  }

  function generateRandomZombiePosition() {
    let zombiePosition;
    do {
      zombiePosition = Math.floor(Math.random() * 25);
    } while (catPositions.includes(zombiePosition) || zombiePosition === posX + posY * 5);

    // Update the zombie position
    specialPositions[zombiePosition] = "zombie";
  }

  function generateRandomCatPositions() {
    while (catPositions.length < 3) {
      const catPosition = Math.floor(Math.random() * 25);
      if (catPosition !== posX + posY * 5 && !catPositions.includes(catPosition)) {
        catPositions.push(catPosition);
        specialPositions[catPosition] = "cat"; // Assign cat position to the specialPositions object
      }
    }
  }

  northBtn.onclick = () => move(-1, 0);
  southBtn.onclick = () => move(1, 0);
  westBtn.onclick = () => move(0, -1);
  eastBtn.onclick = () => move(0, 1);

  generateRandomCatPositions();
  generateRandomZombiePosition();
  updateTable();
  showSelectedImage(); // Call showSelectedImage to display the first image when the page loads