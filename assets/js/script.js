////// theme switch ////////

let switches = document.getElementsByClassName('switch');

let getStyle = localStorage.getItem('style');

let style;
if(getStyle !== 'undefined') {
    style = JSON.parse(getStyle);
}

if (style == null) {
    setTheme('default');
} else {
    setTheme(style);
}

for (let i of switches) {

    if(i.dataset.theme == style) {
        
        i.setAttribute('checked', true)
    }

    i.addEventListener('click', function () {
        let theme = this.dataset.theme;
        setTheme(theme);
    });
}

function setTheme(theme) {
    
    if (theme == 'light') {
        document.getElementById('switcher-id').href = 'assets/css/themes/light.css';
    } else if(theme == 'purple'){
        document.getElementById('switcher-id').href = 'assets/css/themes/purple.css';
    }else if (theme == 'default') {
        document.getElementById('switcher-id').href = 'assets/css/style.css';
    }
    addToStorage(theme);

    
};

function addToStorage(item) {

    if(item === undefined) {
        return false;
    }

    localStorage.setItem('style', JSON.stringify(item));
}


////calculator functionality

// const calculator = document.querySelector('.calculator');

const digits = document.getElementsByClassName('digits');
const display = document.querySelector('#calc_display');
const operators = document.getElementsByClassName('operators');
let firstValue, operator, secondValue, 
resetFirstValue;


for (let digit of digits) {
       digit.addEventListener('click', e => {
       const value = e.target.value;
      if (resetFirstValue) {
        firstValue = display.innerText;
        updateDisplay('');
        resetFirstValue = false;
      }
    writeDigit(value);

  
    });
   }

for (const optor of operators) {
    optor.addEventListener('click', e => {
        calculate();
        operator = e.target.value;
        console.log(operator);
        resetFirstValue = true;
    });
}

function writeDigit(value) {
    console.log(value);
    if (value === '.') {
        if (display.innerText === '.') {
            return false;
        }
    }else{
        value = Number(value);
    }
    console.log(value);
    let newValue = 0;
    let previousValue = Number(display.innerText); 
    newValue = previousValue === 0 && value !='0.' && value < 1 ? value : display.innerText += value;
    console.log(firstValue, operator, secondValue);

    updateDisplay(newValue);
}

function updateDisplay(value) {
    display.innerText = value;
}

function resetScreen() {
   updateDisplay('');
   firstValue = secondValue = result = null;
}

function del() {
    const newDisplay = display.innerText.slice(0, -1);
    updateDisplay(newDisplay);
}

function calculate() {
    let secondValue = display.innerText;
    console.log(firstValue, operator, secondValue)
    if (firstValue && operator && secondValue) {
        const result = eval(`${firstValue} ${operator} ${secondValue}`);
        updateDisplay(result);
        firstValue = '';
        console.log(result);
    }
}