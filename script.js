import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
const guessedLetters = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);

function initBoard(){
    let board = document.getElementById("game-board");

    for(let i = 0; i < NUMBER_OF_GUESSES; i++){
        let row = document.createElement("div");
        row.className = "letter-row";

        for (let j = 0; j < 5; j++){
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box);
        }
        board.appendChild(row);
    }
}

function shadeKeyBoard(letter, color){
   const keyboardButtons = document.getElementsByClassName("keyboard-button");
    for (const elem of keyboardButtons){
         if (elem.textContent === letter){
            elem.style.backgroundColor = color;
         }
        }
    }
            // elem.classList.remove("guessed-letter-green", "guessed-letter-yellow", "guessed-letter-red");
    //       if(color === "green"){
    //        elem.classList.add("guessed-letter-green"); 
    //       }  
    //     else if(color === "yellow"){
    //         elem.classList.add("guessed-letter-yellow"); 
    //        }  
    //      else if(color === "red"){
    //         elem.classList.add("guessed-letter-red"); 
    //        }  
    // }
   // for (const elem of document.getElementsByClassName("keyboard-button")){
        // if (elem.textContent === letter){
        //     if (!elem.classList.contains("guessed-letters")){
        //         elem.classList.add("guessed-letters");
        //         elem.classList.add("guessed-letter");
        //     }
        //     if (letterColor){
        //         elem.style.backgroundColor = letterColor;
        //     }
//             if (elem.textContent === letter){
//                 if (color === 'green' || color === 'yellow' || color === 'red'){
//                     return;
//                 }
// elem.style.backgroundColor = color;
// break;
            //     let oldColor = elem.style.backgroundColor;
            //     if(oldColor === 'green'){
            //         return;
            //     }
            //     if(oldColor === 'yellow' && color !== 'green'){
            //         return;
            //     }
            //     elem.style.backgroundColor = color;
            
            // break;
       // }
        // if (elem.textContent === letter) {
        //     if (!guessedLetters.includes(letter)){
        //         elem.style.backgroundColor = color;
        //         elem.style.color = "white";
        //         elem.classList.add("guessed-letters");
        //         guessedLetters.push(letter);
        //     }
            // break;
            // let oldColor = elem.style.backgroundColor;
            // if (oldColor === "green" || oldColor === "yellow" || oldColor === "red" ) {
            //     return;
            // }

            // if (oldColor === "yellow" && color !== "green"){
            //     return;
            // }

            // elem.style.backgroundColor = color;
            // elem.style.color = "white";
            // elem.classList.add("guessed-letter");
            // break;
        
//     }
// }

function deleteLetter (){
    let row = document.getElementsByClassName("letter-row")[6- guessesRemaining];
    let box = row.children[nextLetter - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentGuess.pop();
    nextLetter -= 1;
}

function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
    let guessString = "";
    let rightGuess = Array.from(rightGuessString);

    for (const val of currentGuess){
        guessString += val;
    }

    if (guessString.length != 5){
        alert("Not enough letters!");
        return;
    }

    if (!WORDS.includes(guessString)){
        alert("Invalid word");
        return;
    }

    var letterColor = ["gray", "gray", "gray", "gray", "gray"];

    for (let i = 0; i < 5; i++){
 
    if(rightGuess[i] === currentGuess[i]){
            letterColor[i] = "green";
            rightGuess[i] = "#";
            // shadeKeyBoard(currentGuess[i], "teal");
        }
    }

    for (let i = 0; i < 5; i++){
 
    if(letterColor[i] === "green") continue;

        for (let j = 0; j < 5; j++){

            if (rightGuess[j] === currentGuess[i]) {
                letterColor[i] = "yellow";
                rightGuess[j] = "#";
                // shadeKeyBoard(currentGuess[i], "teal");
            }
        }
        if (letterColor[i] === "gray") {
            letterColor[i] = "red";
        }
        shadeKeyBoard(currentGuess[i], letterColor[i]);
    }

    for (let i = 0; i < 5; i++){
        // let letterColor = ''
        let box = row.children[i];
        let delay = 250 * i;
        setTimeout(() => { 
            animateCSS(box, "flipInX");
            box.style.backgroundColor = letterColor[i];
            shadeKeyBoard(currentGuess[i], letterColor[i]);
            // shadeKeyBoard(guessString.charAt(i) + "", letterColor[i]);
        }, delay);
    }

    if (guessString === rightGuessString) {
        alert("Congratulations! You win!")
        // toastr.success("Congratulations! You win!");
        guessesRemaining = 0;
        // return;
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            alert(`No guesses left. The word was: "${rightGuessString}"`);
            // toastr.error(`No guesses left. The word was: "${rightGuessString}"`);
        }
        }
    }

    function insertLetter(pressedKey) {
        if (nextLetter === 5) {
            return;
        }
    
        pressedKey = pressedKey.toLowerCase();
    
        let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
        let box = row.children[nextLetter];
        animateCSS(box, "pulse");
        box.textContent = pressedKey;
        box.classList.add("filled-box");
        currentGuess.push(pressedKey);
        nextLetter += 1;
    }

    const animateCSS = (element, animation, prefix = "animate__") =>
new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;
    node.style.setProperty("--animate-duration", "0.3s");

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event){
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
});

document.addEventListener("keyup", (e) => {
    if (guessesRemaining === 0){
        return;
    }

    let pressedKey = String(e.key);
    if (pressedKey === "DELETE" && nextLetter !== 0){
        deleteLetter();
        return;
    }

    if (pressedKey === "ENTER"){
        checkGuess();
        return;
    }

    let found = pressedKey.match(/[a-z]/gi);
    if (!found || found.length > 1) {
        return;
    } else {
        insertLetter(pressedKey);
    }
});

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
    const target = e.target;
    if (!target.classList.contains("keyboard-button")){
    return;
}
let key = target.textContent;

if (key === "Del") {
    key = "Backspace";
}
document.dispatchEvent(new KeyboardEvent("keyup", { key: key}));
});

initBoard();




        // let letter = currentGuess[i]

    //     let letterPosition = rightGuess.indexOf(currentGuess[i])

    //     if(letterPosition === -1){
    //         letterColor = 'grey'
    //     }else{
    //         if (currentGuess[i] === rightGuess[i]){
    //             letterColor = 'green'
    //         } else {
    //             letterColor = 'yellow'
    //         }

    //         rightGuess[letterPosition] = "#"
    //         }

    //         let delay = 250 * i
    //         setTimeout(() => {                animateCSS(box, 'flipInX')
    //         box.style.backgroundColor = letterColor
    //         shadeKeyBoard(letter, letterColor)
    //         }, delay)
    //     }
    // }










    



