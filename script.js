class Calculator {
    constructor(prevOperandTxtEl, curOperandTxtEl) {
        this.prevOperandTxtEl = prevOperandTxtEl;
        this.curOperandTxtEl = curOperandTxtEl;
        this.clear();
    }

    clear() {
        this.curOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete() {

    }

    appendNum(number) {
        if (number === '.' && this.curOperand.includes('.')) return;
        this.curOperand += number.toString();
    }

    chooseOperation() {

    }

    compute() {

    }

    updateDisplay() {
        this.curOperandTxtEl.innerText = this.curOperand;
    }
}

const numBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const clearBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const prevOperandTxtEl = document.querySelector('[data-previous-operand]');
const curOperandTxtEl = document.querySelector('[data-current-operand]');

const calc = new Calculator(prevOperandTxtEl, curOperandTxtEl);

numBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calc.appendNum(btn.innerText);
        calc.updateDisplay();
    })
})

