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
    return a / b;
}
function operate (func, a, b) {
    if (a == undefined) { //prevents operating with an empty value
        return b;
    } 
    return func(a, b);
}

const numberDisplay = document.querySelector(`#number-display`);
let numberDisplayed = numberDisplay.innerHTML;
let numberHidden = undefined;
let currentFunc = undefined;

//This function populates the display when user clicks the number buttons
const numberButtonsContainer = document.querySelector(`#number-btns`);
numberButtonsContainer.addEventListener(`click`, (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) { //rejects if user hits the container div instead of a button
        return;
    }
    if (numberDisplayed == 0) { //prevents displaying numbers like 04 or 073. No 0 bullcrap
        numberDisplayed = event.target.innerText;
    } else if (numberDisplayed.length > 9 || numberDisplayed.includes(`.`) && event.target.innerText == `.`) {  
        numberDisplayed = numberDisplayed; //prevents extra long numbers + number like 34.24.24
    } else {
    numberDisplayed += event.target.innerText;
    }
    numberDisplay.innerHTML = numberDisplayed;
});

/* Using a hidden number, we'll calculate user inputs in the background whenever they
hit an operation symbol*/
const functionButtonsContainer = document.querySelector(`#function-btns`);
functionButtonsContainer.addEventListener(`click`, (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    numberHidden = operate(currentFunc, numberHidden, Number(numberDisplayed));
    const currentFuncString = event.target.id.substring(4);
    currentFunc = window[currentFuncString]; // This sets up the NEXT operation
    numberDisplayed = 0;
});

/* This calculates the current hidden values and puts it on display and resets the hidden number*/
const equalsButton = document.querySelector(`#btn-equals`);
equalsButton.addEventListener(`click`, (event) => {
    numberDisplayed = operate(currentFunc, numberHidden, Number(numberDisplayed));
    numberHidden = undefined;
    numberDisplay.innerHTML = numberDisplayed;
});
