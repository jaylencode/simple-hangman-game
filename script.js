const hangmanImage = document.querySelector(".hangman_box img");
const wordDisplay = document.querySelector(".word_display");
const guessText = document.querySelector(".guesses_text b");
const keyboard = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game_modal");
const playAgainBtn = document.querySelector(".play_again")


let currentWord;
let wrongGuessCount;
let correctLetters;
const maxGuessCount = 6;


const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    guessText.innerHTML = `${wrongGuessCount} / ${maxGuessCount}`
    keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show")
}

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint_text b").innerHTML = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory': 'lost'}.gif`;
        gameModal.querySelector("h4").innerHTML = `${isVictory ? 'Congrats' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show")
    }, 300)
}


const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerHTML = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`
    }

    button.disabled = true
    guessText.innerHTML = `${wrongGuessCount} / ${maxGuessCount}`

    if (wrongGuessCount === maxGuessCount) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}


for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerHTML = String.fromCharCode(i)
    keyboard.appendChild(button);
    button.addEventListener("click", (event) => initGame(event.target, String.fromCharCode(i)))
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord)