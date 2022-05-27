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
    if (a == undefined) {
        return b;
    } 
    return func(a, b);
}

const numberDisplay = document.querySelector(`#number-display`);
let currentNumber = numberDisplay.innerHTML;
let hiddenNumber = undefined;
let currentFunc = undefined;

//This function populates the display when user clicks the number buttons
const numberButtonsContainer = document.querySelector(`#number-btns`);
numberButtonsContainer.addEventListener(`click`, (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) { //rejects if user hits the container div instead of a button
        return;
    }
    if (currentNumber == 0) { //prevents displaying numbers like 04 or 073. No 0 bullcrap
        currentNumber = event.target.innerText;
    } else if (currentNumber.length > 9 || currentNumber.includes(`.`) && event.target.innerText == `.`) {  //prevents extra long number + number like 34.24.24
        currentNumber = currentNumber; //fix this
    } else {
    currentNumber += event.target.innerText;
    }
    numberDisplay.innerHTML = currentNumber;
});

const functionButtonsContainer = document.querySelector(`#function-btns`);
functionButtonsContainer.addEventListener(`click`, (event) => {
    const isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    const currentFuncString = event.target.id.substring(4);
    currentFunc = window[currentFuncString]; // Window makes string a working function
    
    hiddenNumber = operate(currentFunc, hiddenNumber, Number(currentNumber));
    currentNumber = 0;
    console.log(hiddenNumber);
});

const equalsButton = document.querySelector(`#btn-equals`);
equalsButton.addEventListener(`click`, (event) => {
    currentNumber = operate(currentFunc, hiddenNumber, Number(currentNumber));
    hiddenNumber = undefined;
    numberDisplay.innerHTML = currentNumber;
    console.log(currentNumber);
});
