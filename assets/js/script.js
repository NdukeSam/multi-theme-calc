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

const calculator = document.querySelector('.calculator');

const keys = document.querySelector('.calc-keys')

const display = document.querySelector('#calc_display');

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        // console.log('button');
   
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType

    if (!action) {
        if (displayedNum === '' || previousKeyType === 'operator'){
        display.textContent = keyContent
        } else{
            display.textContent = displayedNum + keyContent
        }
        calculator.dataset.previousKey = 'number' 
    };

    

    if (action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide' ) {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            
            if (firstValue && operator && previousKeyType !== 'operator') {
                display.textContent = calculate(firstValue, operator, secondValue)
            }

            // key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
            // console.log(calculator.dataset.secondValue);
        
    }
    if (action === 'clear') {
        calculator.dataset.previousKey = 'clear';
    }

    if (action === 'decimal') {
        if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'
        } else if (previousKeyType === 'operator') {
            display.textContent = '0.'
        }


    calculator.dataset.previousKey = 'decimal';        
    }

    const calculate = (n1, operator, n2) => {
        let result = '';
        
        switch (operator) {
            case 'add':
                result = parseFloat(n1) + parseFloat(n2);
                console.log('result');
                break;
            case 'subtract':
                result = parseFloat(n1) - parseFloat(n2);
                break;
            case 'multiply':
                result = parseFloat(n1) * parseFloat(n2);
                break;
            case 'divide':
                result = parseFloat(n1) / parseFloat(n2);
                break;
            default:
                break;
        }
        console.log(operator);
        return result
    }

    if (action === 'calculate') {
        if (displayedNum === '') {
            return false;
        } else{
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNum;

        display.textContent = calculate(firstValue, operator, secondValue);

        calculator.dataset.previousKey = 'calculate';
        }

    }

    if (action === 'delete') {
        // console.log(`delete key!`);
    }

    

    // Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'))
};  
})
