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
	let sqrtEquationReg = /\d*\.?\d+\s{1}\√+/;
	// if there is a number in the output html and the last input was not an operator allow an operator in the output
	if (/\d/.test(outputValue.innerHTML) === true && /[√+/*-]/.test(outputValue.innerHTML[outputValue.innerHTML.length - 1]) === false) {
		input(event);
	}
	if (sqrtEquationReg.test(outputValue.innerHTML) === true) {
		let inputString = outputValue.innerHTML;
		calculate(inputString);
	}
}

equals.addEventListener('click', equalsFilter);

function equalsFilter(event) {
	// if there is an operator with 0 or 1 decimals and 1 or more digits call the calculate formula
	if (/[+/*-]{1}\s\d*\.?\d+/g.test(outputValue.innerHTML) === true) {
		let inputString = outputValue.innerHTML;
		calculate(inputString);
	}
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

function calculate(inputString) {
  let sqrtEquationReg = /(\d*\.?\d+)\s{1}\√{1}/;
  
  if (sqrtEquationReg.test(inputString) === true) {
    let match = sqrtEquationReg.exec(inputString);
    let num1 = parseFloat(match[1]);
    inputString = sqrt(num1);
    answer(inputString);
  }
	// if there are no operators (with spaces after them) left then return the answer
  if (/[+\/*-]{1}\s/.test(inputString) === false) {
  	answer(inputString);
  }
  //otherwise keep solvin equations
  else {
  	let regMD = /[\/\*]+/g;
  	let regAS = /[+-]+/g; 
  	let outputRegMD = /(\-*\d*\.?\d+)\s{1}([*/]+)\s{1}(\-*\d*\.?\d+)/;
  	let outputRegAS = /(\-*\d*\.?\d+)\s{1}([+-]+)\s{1}(\-*\d*\.?\d+)/;
    //if there is a multiplication or division equation do those first
    if (/[\/\*]+/.test(inputString) === true) {
        //assign the left and right sides of the equation and operator to variables;
      let match = outputRegMD.exec(inputString);
      let num1 = parseFloat(match[1]);
      let operator = match[2];
      let num2 = parseFloat(match[3]);
      
      if (operator === "/") {
        // replace entire equation match with divide(num1, num2)
        inputString = inputString.replace(outputRegMD, divide(num1, num2));
        calculate(inputString);
      }
      else {
      //replace entire equation match with multiply(num1, num2)
        inputString = inputString.replace(outputRegMD, multiply(num1, num2));
        calculate(inputString);
      }
    }
    //if there is a multiplication or division equation do that next
    else if (/[+-]+/.test(inputString) === true) {
        //assign the left and right sides of the equation and operator to variables;
      let match = outputRegAS.exec(inputString);
      let num1 = parseFloat(match[1]);
      let operator = match[2];
      let num2 = parseFloat(match[3]);
  
      if (operator === "+") {
        //replace entire equation match with add(num1, num2)
        inputString = inputString.replace(outputRegAS, add(num1, num2));
        calculate(inputString);
      }
      else {
         //replace entire equation match with subtract(num1, num2)
        inputString = inputString.replace(outputRegAS, subtract(num1, num2));
        calculate(inputString);
      }
    }
  } 
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

function answer(inputString) {
	let answer = inputString;

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



