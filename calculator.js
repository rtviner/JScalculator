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
	if (/\d/.test(event.key) === true) {
		input(event);
	}
	else if (/[√+/*-]/.test(event.key) === true) {
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
	// test if there is a decimal at all
	if (/\.+/.test(outputValue.innerHTML) === false) {
		input(event);
	}
	// grab the last number of the string and check that number for a decimal
	else {
		let lastNum = outputValue.innerHTML.replace(/\d*\.*\d*\s[-+/*]\s/g, "");
			if (lastNum.indexOf(".") === -1) {
				input(event);
			}
	}
}

operators.forEach((operator) => {
		operator.addEventListener('click', operatorFilter);
}); 

sqrtBtn.addEventListener('click', operatorFilter);

function operatorFilter(event) {
	let sqrtEquationReg = /\d*\.?\d*\√/;
	// if there is a number in the input value and the last input was not an operator allow an operator
	if (/\d/.test(outputValue.innerHTML) === true && /[√+/*-]/.test(outputValue.innerHTML[outputValue.innerHTML.length - 1]) === false) {
		input(event);
	}
	if (sqrtEquationReg.test(outputValue.innerHTML) === true) buildEquation(inputValue);
}

equals.addEventListener('click', equalsFilter);

function equalsFilter(event) {
	if (/[+/*-]\d*\.?\d*/.test(outputValue.innerHTML) === true) buildEquation(inputValue);
}

allClearBtn.addEventListener('click', function(event) {
	inputValue = [];
	outputValue.innerHTML = "";
});

deleteBtn.addEventListener('click', backspace); 

answerBtn.addEventListener('click', answerFilter);

function answerFilter(event) {
	// check if there is an operator present and make sure there is not already a number after the operator
	if (outputValue.innerHTML.length === 0) {
		input(event)
	}
	else {
		let lastNum = outputValue.innerHTML.replace(/\d*\.*\d*\s[-+/*]\s/g, "");

		if (lastNum.length === 0) {
				input(event);
		}
	}
}

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
		if (/[√+/*-]/.test(eventInput) === true) {
			if (inputValue.length >= 1 || inputValue[0] === "number") {
				eventInput = " " + eventInput + " ";
				inputValue.push(eventInput);	
			}
		}			
		else if (/[√+/*-]/.test(eventInput) === false) {
			if (typeof inputValue[0] !== "number" || inputValue.length > 1)  {
				inputValue.push(eventInput);	
			} 
			else if (typeof inputValue[0] === "number" && /\d|\./.test(eventInput) === true) {
				inputValue = [eventInput];
			}
		}
	}   

	output(inputValue);		
}

function output(inputValue) {
		outputValue.innerHTML = inputValue.join("");
}

function buildEquation(inputValue) {
 	
 	if (/\d*\.?\d*\√/.test(outputValue.innerHTML) === true){
 		let sqrtEquationReg = /(\d+\.*\d*)\,*\s*\"*(\√+)\"*/;
;
		let match = sqrtEquationReg.exec(outputValue.innerHTML);
		let num1 = parseFloat(match[1]);
		let operator = match[2];

		operate(operator, num1);
 	}
 	else {
	 	let equationReg = /(\d*\.?\d*)\s([+/*-]{1})\s(\d*\.?\d*)/;
	 	
		let match = equationReg.exec(outputValue.innerHTML);
		let num1 = parseFloat(match[1]);
		let operator = match[2];
		let num2 = parseFloat(match[3]);
		
		operate(operator, num1, num2);
 	}
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



