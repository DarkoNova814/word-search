const playBtn = document.getElementById("playBtn");
const settingsBtn = document.getElementById("settingsBtn");

if (playBtn) playBtn.addEventListener("click", () => window.location.href = "Categories.html");
if (settingsBtn) settingsBtn.addEventListener("click", () => window.location.href = "Settings.html");

const backBtnSettings = document.getElementById("backBtnSettings");
const backBtnCategories = document.getElementById("backBtnCategories");
const backBtnGame = document.getElementById("backBtnGame");

if (backBtnSettings) backBtnSettings.addEventListener("click", () => window.location.href = "Menu.html");
if (backBtnCategories) backBtnCategories.addEventListener("click", () => window.location.href = "Menu.html");
if (backBtnGame) backBtnGame.addEventListener("click", () => window.location.href = "Menu.html");

const categoryButtons = document.querySelectorAll(".category-btn");
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    if (!category) return;
    localStorage.setItem("selectedCategory", category);
    window.location.href = "Game.html";
  });
});

const musicToggle = document.getElementById("musicToggle");
const volumeSlider = document.getElementById("volumeSlider");
const fullscreenBtn = document.getElementById("fullscreenBtn");

if (musicToggle) musicToggle.addEventListener("change", () => localStorage.setItem("music", musicToggle.checked));
if (volumeSlider) volumeSlider.addEventListener("input", () => localStorage.setItem("volume", volumeSlider.value));
if (fullscreenBtn) fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    fullscreenBtn.textContent = "ON";
  } else {
    document.exitFullscreen();
    fullscreenBtn.textContent = "OFF";
  }
});

const wordGrid = document.getElementById("wordGrid");
const wordListElement = document.getElementById("wordList");
const categoryTitleWS = document.getElementById("categoryTitle");
const scoreText = document.getElementById("scoreText");

if (wordGrid && wordListElement && categoryTitleWS && scoreText) {
  const categories = {
    foods: ["PIZZA", "APPLE", "BREAD", "RICE", "CAKE"],
    songs: ["HELLO", "SHAKE", "BLANK", "HERO", "LOVE"],
    knowledge: ["EARTH", "OCEAN", "ASIA", "SPACE", "LIGHT"],
    programming: ["HTML", "CODE", "JAVA", "ARRAY", "DEBUG"]
  };

  const selectedCategory = localStorage.getItem("selectedCategory");
  if (!selectedCategory || !categories[selectedCategory]) {
    categoryTitleWS.textContent = "NO CATEGORY";
  } else {
    const words = categories[selectedCategory];
    categoryTitleWS.textContent = selectedCategory.toUpperCase();

    let foundWords = 0;
    const gridSize = 10;  
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let grid = Array.from({length: gridSize}, () => Array(gridSize).fill(""));

    words.forEach((word, index) => {
      let row = index * 2;
      if (row >= gridSize) row = gridSize - 1; 
      for (let i = 0; i < word.length; i++) {
        if (i + 1 < gridSize) grid[row][i + 1] = word[i];
      }
    });

    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (grid[r][c] === "") grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
      }
    }

    wordGrid.innerHTML = ""; 
    grid.forEach((row, r) => {
      row.forEach((letter, c) => {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.textContent = letter;
        cell.dataset.row = r;
        cell.dataset.col = c;

        cell.addEventListener("click", () => {
          cell.classList.toggle("selected");
          checkSelection();
        });

        wordGrid.appendChild(cell);
      });
    });

    wordListElement.innerHTML = "";
    words.forEach(word => {
      const li = document.createElement("li");
      li.textContent = word;
      li.id = "word-" + word;
      wordListElement.appendChild(li);
    });

    function checkSelection() {
      const selected = Array.from(document.querySelectorAll(".grid-cell.selected"))
        .map(cell => cell.textContent)
        .join("");

      words.forEach(word => {
        const wordLi = document.getElementById("word-" + word);
        if (selected === word && !wordLi.classList.contains("word-found")) {
          wordLi.classList.add("word-found");
          foundWords++;
          scoreText.textContent = "Found: " + foundWords;

          document.querySelectorAll(".grid-cell.selected").forEach(c => c.classList.remove("selected"));
        }
      });
    }
  }
}