// Import package

import PromptSync from "prompt-sync";
const prompt = PromptSync();
import chalk from "chalk";
import * as cowsay from "cowsay";
import * as oneLinerJoke from "one-liner-joke";

const user = prompt("What is your name? ");
const generateNumber = () => {
  const arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const numbersArr = [];
  for (let i = 0; i < 4; i++) {
    // generate random number between 0-10 minus index
    const arrIndex = Math.floor(Math.random() * (10 - i));
    // draw a digit from arr with arrIndex
    numbersArr.push(arr[arrIndex]);
    // delete this number from arr (no duplicate digits)
    arr.splice(arrIndex, 1);
  }
  // return digits array, digit as string because prompt return string too
  return numbersArr;
};
let randomComputerNumber = generateNumber();
let numberOfAttempts = 0;
const game = () => {
  numberOfAttempts = numberOfAttempts + 1;
  let number = prompt("What is your number? ");
  // check or user input have 4 characters
  if (number.length !== 4) {
    console.log("Please chose " + chalk.red(`4`) + " digits number");
    game();
    return;
  }
  // check or user choose a number
  if (!+number) {
    console.log("Please choose a " + chalk.green(`number`));
    game();
    return;
  }
  // check or user number is unique
  if (!(new Set(number).size == number.length)) {
    console.log(
      cowsay.say({
        text: "Please type unique digits number",
        e: "oO",
        T: "U ",
      })
    );
    game();
    return;
  }
  if (randomComputerNumber.join("") === number) {
    if (user === ``) {
      console.log(
        chalk.blue(
          "Congratulations!You win! Number of attempts: ",
          numberOfAttempts
        )
      );
    } else {
      console.log(
        chalk.blue(
          "Congratulations " + user + "! You win! Number of attempts: ",
          numberOfAttempts
        )
      );
    }
    const newGame = prompt("Wanna play again?Y/N ");
    if (newGame.toUpperCase() === `Y`) {
      randomComputerNumber = generateNumber();
      numberOfAttempts = 0;
      game();
    } else {
      console.log(
        cowsay.say({
          text: "srsly dude, why? ",
          e: "oO",
          T: "U ",
        })
      );
    }
  } else {
    const userNumberArray = number.split("");
    let bulls = 0;
    let cows = 0;

    for (let i = 0; i < userNumberArray.length; i++) {
      if (userNumberArray[i] === randomComputerNumber[i]) {
        bulls = bulls + 1;
      } else if (randomComputerNumber.includes(userNumberArray[i])) {
        cows = cows + 1;
      }
    }
    if (bulls === 0 && cows === 0) {
      console.log(
        "There is " +
          chalk.red("0 ") +
          "cows and " +
          chalk.red("0 ") +
          "bulls, but don't worry, here is a joke 4 u!"
      );
      console.log(oneLinerJoke.getRandomJoke().body);
    } else if (bulls === 1 && cows === 0) {
      console.log(
        "There is " +
          chalk.yellow("1 ") +
          "bull and" +
          chalk.red(" 0") +
          " cows"
      );
    } else if (bulls === 0 && cows === 1) {
      console.log(
        "There are" +
          chalk.red(" 0") +
          " bulls and " +
          chalk.yellow("1 ") +
          "cow"
      );
    } else if (bulls === 1 && cows === 1) {
      console.log(
        "There is " +
          chalk.yellow("1 ") +
          "bull and " +
          chalk.yellow("1 ") +
          "cow"
      );
    } else {
      console.log(
        `There are ` +
          chalk.blue(`${bulls}`) +
          ` bulls and ` +
          chalk.red(`${cows}`) +
          ` cows`
      );
    }
    game();
  }
};
game();
