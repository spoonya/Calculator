class Calculator {
    constructor(prevOperandTxtEl, curOperandTxtEl) {
        this.prevOperandTxtEl = prevOperandTxtEl;
        this.curOperandTxtEl = curOperandTxtEl;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.curOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
        this.readyToReset = false;
    }

    delete() {
        this.curOperand = this.curOperand.toString().slice(0, this.curOperand.toString().length-1);
    }

    appendNum(number) {
        if (number === '.' && this.curOperand.includes('.')) {
            return;
        } else {
            this.curOperand = this.curOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.curOperand === '' || this.curOperand === '-' || this.curOperand === '.') {
            return;
        } else if (this.prevOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.prevOperand = this.curOperand;
        this.curOperand = '';
    }

    fructionFix(num) {
        num = num.toFixed(10).replace(/0*$/, '');
        if (num[num.length - 1] === '.') num = num.slice(0, -1);
        return num;
    }

    compute() {
        let res = 0;
        let prevNum = parseFloat(this.prevOperand);
        let curNum = parseFloat(this.curOperand);

        switch (this.operation) {
            case '+': res = (prevNum + curNum); break;
            case '-': res = prevNum - curNum; break;
            case '*': res = prevNum * curNum; break;
            case '/': res = prevNum / curNum; break;
            case '∧': res = Math.pow(prevNum, curNum); break;
        }

        this.curOperand = this.fructionFix(res);
        this.operation = undefined;
        this.prevOperand = '';
        this.readyToReset = true;
    }

    numSeparator(num) {
        let strNum = num.toString();
        let intDigits = parseFloat(strNum.split('.')[0]);
        let decDigits = strNum.split('.')[1];
        let intDisplay;

        if (isNaN(intDigits)) {
            intDisplay = '';
        } else {
            intDisplay = intDigits.toLocaleString('ru', {maximumFractionDigits: 0});
        }

        if (decDigits != null) {
            return `${intDisplay}.${decDigits}`;
        } else {
            return intDisplay;
        }
    }

    updateDisplay() {
        if (this.curOperand === '-') {
            this.curOperandTxtEl.innerText = this.curOperand;
        } else {
            this.curOperandTxtEl.innerText = this.numSeparator(this.curOperand);
        }

        if (this.operation != null) {
            this.prevOperandTxtEl.innerText = `${this.numSeparator(this.prevOperand)} ${this.operation}`;
        } else {
            this.prevOperandTxtEl.innerText = '';
        }
    }
}

const numBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const operationBtnSqrt = document.querySelector('[data-operation-sqrt]');
const equalsBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const prevOperandTxtEl = document.querySelector('[data-previous-operand]');
const curOperandTxtEl = document.querySelector('[data-current-operand]');

const calc = new Calculator(prevOperandTxtEl, curOperandTxtEl);

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        if(calc.prevOperand === '' && calc.curOperand !== '' && calc.readyToReset) {
            calc.curOperand = '';
            calc.readyToReset = false;
        }

        calc.appendNum(btn.innerText);
        calc.updateDisplay();
    })
})

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.innerText === '-' && calc.curOperand === '') {
            calc.curOperandTxtEl.innerText = '-';
            calc.curOperand = '-';
        } else {
            calc.chooseOperation(btn.innerText);
            calc.updateDisplay();
        }
    })
})

operationBtnSqrt.addEventListener('click', () => {
    if (calc.curOperand < 0) {
        calc.curOperandTxtEl.innerText = 'Неверный агрумент!';
        calc.curOperand = '';
        // calc.readyToReset = true;
    } else {
        calc.curOperand = calc.fructionFix(Math.sqrt(calc.curOperand));
        calc.curOperandTxtEl.innerText = calc.numSeparator(calc.curOperand);
        calc.readyToReset = true;
    }
})

allClearBtn.addEventListener('click', () => {
    calc.clear();
    calc.updateDisplay();
})

clearBtn.addEventListener('click', () => {
    calc.delete();
    calc.updateDisplay();
})

equalsBtn.addEventListener('click', () => {
    if (calc.curOperand == 0 && calc.operation === '/') {
        calc.curOperandTxtEl.innerText = 'Деление на ноль!';
        calc.curOperand = '';
        calc.readyToReset = true;
    } else {
        calc.compute();
        calc.updateDisplay();
    }
})

