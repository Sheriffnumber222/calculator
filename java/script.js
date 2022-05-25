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
    return func(a, b);
}

const numberDisplay = document.querySelector(`#number-display`);
let currentNumber = numberDisplay.innerHTML;

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

