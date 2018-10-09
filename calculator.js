let numbers = document.querySelectorAll('.num-btn');
let decimal = document.getElementById('dec-btn')
let operators = document.querySelectorAll('.op-btn');
let sqrtBtn = document.getElementById('sqrt');
let outputValue = document.getElementById('output');
let equals = document.getElementById('equal-btn');
let answerBtn = document.getElementById('ans');
let allClearBtn = document.getElementById('allClear');
let deleteBtn = document.getElementById('delete');

let inputValue = [];

window.addEventListener('keydown', keyFilter) 

function keyFilter(event) {
	let equationReg = /(\d+\.?\d*)([+/*-]{1})(\d+\.?\d*)/;

	if (/\d/.test(event.key) === true) {
		input(event);
	}
	else if (/[\+\/\*\-\√]/.test(event.key) === true) {
		operatorFilter(event);
	}
	else if (event.key === "Backspace") {
		backspace();
	}
	else if (event.key === "=" || event.key === "Enter") {
		equalsFilter(event);	
	}
	else if (event.key === ".") {
		decimalFilter(event);
	}
}

numbers.forEach((number) => {
	number.addEventListener('click', input);
});

decimal.addEventListener('click', decimalFilter);

function decimalFilter(event) {
	if (/\.+/.test(inputValue) === false || (/[+/*-]{1}\"*\,*\s*\"*\d*/.test(inputValue) === true && /[\+\-\/\*]\"*\,*\s*\"*\d*\"*\,*\s*\"*\.+/.test(inputValue) === false) || (typeof inputValue[0] === "number" && inputValue.length === 1)) 
		input(event);
}

operators.forEach((operator) => {
		operator.addEventListener('click', operatorFilter);
}); 

sqrtBtn.addEventListener('click', operatorFilter);

function operatorFilter(event) {
	let sqrtEquationReg = /\d*\.?\d*\√/;

	if (/\d/.test(inputValue) === true && /[\+\/\*\-\√]/.test(inputValue) === false) {
		input(event);
	}
	if (sqrtEquationReg.test(inputValue) === true) build1NumEquation(inputValue);
}

equals.addEventListener('click', equalsFilter);

function equalsFilter(event) {
	if (/[\+\/\*\-]\d*\.?\d*/.test(inputValue) === true) buildEquation(inputValue);
}

allClearBtn.addEventListener('click', function(event) {
	inputValue = [];
	outputValue.innerHTML = "";
});

deleteBtn.addEventListener('click', backspace); 

answerBtn.addEventListener('click', input);

function backspace(event) {
	inputValue.pop();
	output(inputValue);
}

function input(event) {
	let eventInput;

	if (event.type === "keydown") {
		eventInput = event.key;	
	} 
	else if (event.type === "click" && event.target.innerHTML === "Ans") {
		eventInput = answerBtn.value;	
	} 
	else {
		eventInput = event.target.innerHTML;
	}

	pushOrClear(eventInput);

	function pushOrClear(eventInput) {
		if (typeof inputValue[0] !== "number" || inputValue.length > 1 || (typeof inputValue[0] === "number" && /[\+\/\*\-\√]/.test(eventInput) === true)) {
			inputValue.push(eventInput);	
		} 
		else if (typeof inputValue[0] === "number" && /\d|\./.test(eventInput) === true) {
			inputValue = [eventInput];
		}
	}   

	output(inputValue);		
}

function output(inputValue) {
	let outputReg = /(\d*\.?\d*)([+/*-]?)(\d*\.?\d*)/;
	let inputString = inputValue.join("");
	let match = outputReg.exec(inputString);
	let num1 = match[1];
	let operator = match[2];
	let num2 = match[3];

	outputValue.innerHTML = num1 + ' ' + operator + ' ' + num2;
}

 function buildEquation(inputValue) {
 	let equationReg = /(\d*\.?\d*)([+/*-]{1})(\d*\.?\d*)/;
	let inputString = inputValue.join("");
	let match = equationReg.exec(inputString);
	let num1 = parseFloat(match[1]);
	let operator = match[2];
	let num2 = parseFloat(match[3]);
	
	operate(operator, num1, num2);
}

function build1NumEquation(inputValue) {
	let sqrtEquationReg = /(\d+\.*\d*)\,*\s*\"*(\√+)\"*/;
	let inputString = inputValue.join("");
	let match = sqrtEquationReg.exec(inputString);
	let num1 = parseFloat(match[1]);
	let operator = match[2];

	operate(operator, num1);
}

function operate(operator, num1, num2) {
	let answer;

	switch (operator) {
		case "+":
			answer = add(num1, num2);
			break;
		case "-":
			answer = subtract(num1, num2);
			break;
		case "*":
			answer = multiply(num1, num2);
			break;
		case "/":
			answer = divide(num1, num2);
			break;
		case "√":
			answer = sqrt(num1);
			break;
	}

	if (answer.toString().length > 20) {
		inputValue = [answer.toExponential()];
		answerBtn.value = answer.toExponential();
	}
	else {
		inputValue = [answer];
		answerBtn.value = answer;
	}
   
	output(inputValue);
}

function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	product = num1 * num2;
	return parseFloat(product.toFixed(decimalPlaces(num1)+decimalPlaces(num2)));
}

function decimalPlaces(num) {
    var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) { return 0; }
    return Math.max(
        0,
        (match[1] ? match[1].length : 0)
        - (match[2] ? +match[2] : 0));
}

function divide(num1, num2) {
	return num1 / num2;
}

function sqrt(num1) {
	return Math.sqrt(num1);
}



