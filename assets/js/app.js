const digits = document.getElementsByClassName('digits');
let display = document.getElementById('calc_display');
const operators = document.getElementsByClassName('operators');
let operator, firstValue, secondValue;
let resetFirstValue = false
let calculated = false
let operatorPressed = false

for (const digit of digits) {
    digit.addEventListener('click', e => {
        const value = e.target.value;
        writeToDisplay(value);
        calculated = false
        operatorPressed = false
    })
}

for (const opt of operators) {
    opt.addEventListener('click', e => {
        !operatorPressed && calculate()
        operator = e.target.value;
        operatorPressed = true
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
    resetFirstValue = calculated = false
}

function backspace() {
    const newDisplay = display.innerText.slice(0, -1);
    updateDisplay(newDisplay);
}

function calculate() {
    let secondValue = display.innerText
    secondValue = Number(secondValue)
    let result = firstValue && operator && secondValue ? eval(`${firstValue} ${operator} ${secondValue}`) : secondValue
    resetFirstValue = false
    if (result !== secondValue && !calculated) {
        firstValue = result
        updateDisplay(result)
    }else {
        firstValue = secondValue
    }
    calculated = result !== secondValue
}

