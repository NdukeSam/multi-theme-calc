const digits = document.getElementsByClassName('digits');
let display = document.getElementById('calc_display');
const operators = document.getElementsByClassName('operators');
let operator, firstValue, secondValue;
let resetFirstValue = false

for (const digit of digits) {
    digit.addEventListener('click', e => {
        const value = e.target.value;
        writeToDisplay(value);
    })
}

for (const opt of operators) {
    opt.addEventListener('click', e => {
        const value = e.target.value;
        operator = value
        const displayValue = Number(display.innerText);
        firstValue = displayValue && displayValue
    })
}

function writeToDisplay(value) {
    value = Number(value)
    let newDisplay = 0;
    let previousValue = Number(display.innerText)
    if (firstValue && !resetFirstValue) {
        updateDisplay('');
        resetFirstValue = true
    }
    newDisplay = previousValue === 0 || value === 0 && value > 0 ? value : display.innerText += value
    updateDisplay(newDisplay);
}

function updateDisplay(value) {
    display.innerText = value;
}

function reset() {
    updateDisplay('')
    operator = firstValue = secondValue = null
    resetFirstValue = false
}

function backspace() {
    const newDisplay = display.innerText.slice(0, -1);
    updateDisplay(newDisplay);
}

