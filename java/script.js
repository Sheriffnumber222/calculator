function add (a, b) {
    return a + b;
}
function subtract (a, b) {
    return a - b;
}
function multiply (a, b) {
    return a * b;
}
function divide (a, b) {
    if (b == 0) {
        alert(`Can't divide by zero!`);
        return a;
    }
    return a / b;
}
function operate (func, a, b) {
    if (a == undefined) { //prevents operating with an empty value
        return b;
    } 
    return func(a, b);
}
function round (number, places) {
    placesCalc = 10 ** places;
    return Math.round(number * placesCalc) / placesCalc;
}

const numberDisplay = document.querySelector(`#number-display`);
let numberNew = numberDisplay.innerHTML;
let numberOld = undefined;
let currentFunc = undefined;

//This function populates the display when user clicks the number buttons
const numberButtonsContainer = document.querySelector(`#number-btns`);
numberButtonsContainer.addEventListener(`click`, (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) { //rejects if user hits the container div instead of a button
        return;
    }
    if (numberNew == 0) { //prevents displaying numbers like 04 or 073. No 0 bullcrap
        numberNew = event.target.innerText;
    } else if (numberNew.length > 9 || numberNew.includes(`.`) && event.target.innerText == `.`) {  
        numberNew = numberNew; //prevents extra long numbers + number like 34.24.24
    } else {
    numberNew += event.target.innerText;
    }
    numberDisplay.innerHTML = numberNew;
});

/* Using a hidden number, we'll calculate user inputs in the background whenever they
hit an operation symbol*/
const functionButtonsContainer = document.querySelector(`#function-btns`);
functionButtonsContainer.addEventListener(`click`, (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    numberOld = round(operate(currentFunc, numberOld, Number(numberNew)), 5);
    const currentFuncString = event.target.id.substring(4);
    currentFunc = window[currentFuncString]; // This sets up the NEXT operation
    numberNew = 0;
    numberDisplay.innerHTML = numberOld;
});

/* This calculates the current hidden values and puts it on display and resets the hidden number*/
const equalsButton = document.querySelector(`#btn-equals`);
equalsButton.addEventListener(`click`, (event) => {
    numberNew = round(operate(currentFunc, numberOld, Number(numberNew)), 5);
    numberOld = undefined;
    numberDisplay.innerHTML = numberNew;
});

const clearButton = document.querySelector(`#clear-btn`);
clearButton.addEventListener(`click`, (event) => {
    numberNew = 0;
    numberOld = undefined;
    numberDisplay.innerHTML = numberNew;
});