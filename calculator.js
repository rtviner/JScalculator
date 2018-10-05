let outputValue = document.getElementById('output');
let numbers = document.querySelectorAll('.num-btn');
let decimal = document.getElementById('dec-btn')
let operators = document.querySelectorAll('.op-btn');
let equals = document.getElementById('equal-btn');
let allClearBtn = document.getElementById('allClear');
let deleteBtn = document.getElementById('delete');
let answerBtn = document.getElementById('ans');
let sqrtBtn = document.getElementById('sqrt');
let inputValue = [];
let outputReg = /(\d*\.?\d*)([+/*-]?)(\d*\.?\d*)/;
let equationReg = /(\d*\.?\d*)([+/*-]{1})(\d*\.?\d*)/;
let sqrtEquationReg = /(\d*\.?\d*)(\√)/;
let operatorReg = /[+/*-]/;

window.addEventListener('keydown', event => {
	if (/\d/.test(event.key) === true) {
		output(event);
	}
	else if (operatorReg.test(event.key) === true && /\d/.test(inputValue) === true && operatorReg.test(inputValue) === false) {
		output(event);
	}
	else if (event.key === "Backspace") {
		backspace();
	}
	else if ((event.key === "=" || event.key === "Enter") && equationReg.test(inputValue) === true) {
		output(event);
	}
	else if (event.key === ".") {
		if (inputValue.indexOf('.') === -1) {
			output(event);
		} else if (operatorReg.test(inputValue) === true && inputValue.join("").match(/\./g).length < 2) {
			output(event);
		}
	}
});

numbers.forEach((number) => {
	number.addEventListener('click', output);
});

decimal.addEventListener('click', output);
 
allClearBtn.addEventListener('click', function(event) {
	inputValue = [];
	outputValue.innerHTML = "";
	decimal.addEventListener('click', output);
});

deleteBtn.addEventListener('click', backspace); 

answerBtn.addEventListener('click', output);

function backspace(event) {
	inputValue.pop();

	let inputString = inputValue.join("");
	let match = outputReg.exec(inputString);

	let num1 = match[1];
	let operator = match[2];
	let num2 = match[3];

	outputValue.innerHTML = num1 + ' ' + operator + ' ' + num2;
	decimal.addEventListener('click', output);
}

function output(event) {
	console.log(event);

	let eventInput;

	if (event.type === "keydown") {
		eventInput = event.key;
	} 
	else if (event.type === "click") {
		if (event.target.innerHTML === "Ans") {
			eventInput = answerBtn.value;
		} else {
			eventInput = event.target.innerHTML;
		}
	}


	console.log(eventInput);

	
	console.log(inputValue);
	console.log(inputValue.length);

	if (inputValue.length === 1 && typeof inputValue[0] == "number" && (operatorReg.test(eventInput) === true || sqrtEquationReg.test(eventInput) === true)) {
		inputValue.push(eventInput);
	}
	else if (inputValue.length === 1 && typeof inputValue[0] == "number" && operatorReg.test(eventInput) === false) {
		inputValue.pop();
		inputValue.push(eventInput);
	}
	else {
		inputValue.push(eventInput);
	}

	if (/\d*\.?\d*/.test(inputValue) === true) {
		operators.forEach((operator) => {
			operator.addEventListener('click', output);
		});
	} 
	if (operatorReg.test(inputValue) === true) {
		operators.forEach((operator) => {
			operator.removeEventListener('click', output);
		});
	}

	let inputString = inputValue.join("");
	let match = outputReg.exec(inputString);
	let num1 = match[1];
	let operator = match[2];
	let num2 = match[3];

	if (inputValue.indexOf('.') > -1) decimal.removeEventListener('click', output);
	if (operatorReg.test(inputValue) === true) decimal.addEventListener('click', output);
	if (num2.indexOf('.') > -1) decimal.removeEventListener('click', output);

	outputValue.innerHTML = num1 + ' ' + operator + ' ' + num2;

	if (sqrtEquationReg.test(inputString) === true) build1NumEquation(inputValue);

	if (equationReg.test(inputString) === true) {
		if (eventInput === "=" || event.key === "Enter") {
			buildEquation(event);
		}
		else {
			equals.addEventListener('click', buildEquation);
		}
	}
}

 function buildEquation() {
	let inputString = inputValue.join("");
	let match = equationReg.exec(inputString);
	let num1 = parseFloat(match[1]);
	let operator = match[2];
	let num2 = parseFloat(match[3]);
	
	operate(operator, num1, num2);
	equals.removeEventListener('click', buildEquation);
}

function build1NumEquation(inputValue) {

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
   
	outputValue.innerHTML = inputValue.toString();	
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




