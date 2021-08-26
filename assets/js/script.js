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


for (let digit of digits) {
       digit.addEventListener('click', e => {
       const value = e.target.value;
    writeDigit(value);
    });
   }

function writeDigit(value) {
    value = Number(value);
    let newValue = display.innerText += value;
    previousValue = 0;
    console.log(newValue);
    previousValue === 0 
    
    updateDisplay(newValue);
}

function updateDisplay(value) {
    display.innerText = value;
}

function resetScreen() {
   updateDisplay('');
}
