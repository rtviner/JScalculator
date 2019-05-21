const multiplicationOrDivision = /(\-*\d*\.?\d+)\s{1}([*/]+)\s{1}(\-*\d*\.?\d+)/;
const additionOrSubtraction = /(\-*\d*\.?\d+)\s{1}([+-]+)\s{1}(\-*\d*\.?\d+)/;

var calculator = (function () {

    const outputValue = document.getElementById('display');
    const answerBtn = document.getElementById('answer');

    const lastNum = (string) => { 
        let outputArray = string.split(" ");
        return outputArray[outputArray.length -1];
    }

    window.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
            filter(event.key);
    });

    const buttons = document.querySelectorAll('.btn');

    buttons.forEach((button) => {
        button.addEventListener('click', (event) => filter(event.target.innerHTML));
    });

    function filter(event) { 
        if (event === "AC") {
            newInputValue = [];
            return output(newInputValue);
        }
        if (event === "Backspace" || event === "Del") {
            return backspace();
        }
        if (/\d/.test(event)) {
            return addValue(event);
        }
        if (event === "Ans" && lastNum(outputValue.innerHTML).length === 0) {
            return addValue(event);
        }
        if (event === "." && lastNum(outputValue.innerHTML).indexOf(".") === -1) {
            return addValue(event);
        }
        if (lastNum(outputValue.innerHTML).length === 0 || lastNum(outputValue.innerHTML) === "." || outputValue.innerHTML === "ERROR") {
            if (event === "√" || event === "=" || event === "Enter") {
                return outputValue.innerHTML = "ERROR";
            }
        }
        if (event === "=" || event === "Enter") {
            return reduceEquations(outputValue.innerHTML);
        }
        if (lastNum(outputValue.innerHTML).length !== 0 && lastNum(outputValue.innerHTML) !== "." && /[+/*-]/.test(event)) {
            return addOperator(event); 
        }
        if (lastNum(outputValue.innerHTML).length !== 0 && lastNum(outputValue.innerHTML) !== "." && event === "√") { 
            reduceEquations(outputValue.innerHTML); 
        }
        if (event === "√") {
            return calculateSqRt(outputValue.innerHTML);  
        }
    }

    function backspace(event) {
        const outputArray = [...outputValue.innerHTML];
        const backspacedInput = (lastNum(outputValue.innerHTML).length > 0) ? 
            outputArray.slice(0, outputArray.length - 1) :
            outputArray.slice(0, outputArray.length - 3)	
        output(backspacedInput);
    };

    function addValue(number) {
        const inputArray = (outputValue.classList.contains("answer") || outputValue.innerHTML === "ERROR") ? [number] : [...outputValue.innerHTML, number];
        if (outputValue.classList.contains("answer")) {
            outputValue.classList.remove("answer");
        }
        output(inputArray);		
    }

    function addOperator(operator) {
        let operatorString = " " + operator + " ";
        const inputArray = [...outputValue.innerHTML, operatorString];
        if (outputValue.classList.contains("answer")) {
            outputValue.classList.remove("answer");
        }
        output(inputArray);
    }

    function output(array) {
        outputValue.innerHTML = array.join("");
    }

    const add = (number1, number2) => number1 + number2;

    const subtract = (number1, number2) => number1 - number2;

    const multiply = (number1, number2) => {
        product = number1 * number2;
        return parseFloat(product.toFixed(decimalPlaces(number1)+decimalPlaces(number2)));
    }

    function decimalPlaces (number) {
        var match = (''+number).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        return Math.max(
            0,
            (match[1] ? match[1].length : 0)
            - (match[2] ? +match[2] : 0));
    }

    const divide = (number1, number2) => number1 / number2;

    const sqrt = (number) => Math.sqrt(number);
    
    const calculateSqRt = (number) => answer(sqrt(number));

    const calculations = {
        "/": (num1, num2) => divide(num1, num2),
        "*": (num1, num2) => multiply(num1, num2),
        "+": (num1, num2) => add(num1, num2),
        "-": (num1, num2) => subtract(num1, num2)
    };

    function reduceEquations (equationString) {
        function makeEquation (expression, equationString) {
            const match = expression.exec(equationString);
            const num1 = parseFloat(match[1]);
            const operator = match[2];
            const num2 = parseFloat(match[3]);

            let reducedEquationString = equationString.replace(expression, calculations[operator](num1, num2));
            reduceEquations(reducedEquationString);
        }
        // if there are no operators (with spaces after them) left then return the answer because there are no more equations to solve	
        if (!/[+\/*-]{1}\s/.test(equationString)) {
            return answer(equationString);
        }
        //otherwise keep making and solving equations
        const expression = (/[*/]\s/.test(equationString)) ? 
            multiplicationOrDivision :
            additionOrSubtraction;

        makeEquation(expression, equationString);
    }

    const eNotation = (numberString) => Number.parseFloat(numberString).toExponential(5);

    function answer (numberString) {
        const answer = (numberString.length > 20) ? eNotation(numberString) : numberString;
        finalAnswer = [answer];
        answerBtn.value = finalAnswer;
        outputValue.classList.add("answer");
        output(finalAnswer);
    }
}());



