# JS Calculator

Description
-----------
This is a simple calculator created with JavaScript, HTML, and CSS.  

Equations for calculation can be entered with keypresses or button clicks, clicking "=" or the Enter key will initiate the calculation.

Every button click or keyboard press goes through a filter function to prevent things such as multiple decimals in a row e.g .... or multiple operators in a row e.g ***** from outputting onto the screen.  The filter function also prevents the equals button from initiating calculations until there are enough numbers and operators present and will trigger an error message if the equation present is not valid.  If the keypresses/clicks are valid than the appropriate function will be called. i.e addValue, addOperator, reduceEquation etc.

The RegExp exec method is used in the makeEquation function to parse the input values into the paramaters for the actual math functions (2 number variables and an operator variable).  This function is called inside of the reduceEquations function until the equation is reduced down to one number, the final answer.

There is a decimalPlaces function to account for the inaccuracy of doing multiplication with floats.  This function uses the RegExp match method to count the number of digits after the decimal point for each number in a multiplication equation, the multiplication answer is then rounded to the sum of the number of digits after the decimal in num1 and the number of digits after the decimal in num2.  Otherwise 0.2 * 0.2 = 0.040000000000012 rather than 0.04.

How to Use
----------
Navigate to the calculator in the browser here: https://rtviner.github.io/JScalculator/

Use the keyboard or mouse to input numbers, decimals, and operators for simple math problems (multiplication, division, subtraction, and square roots). 

AC:  All clear, click this button to clear everything from the screen

DEL:  Backspace, click this button or press the "delete" key to erase the last number, decimal, or operator on the screen

Ans: Stores the answer to the last operation. Click this button if you would like to perform another operation with the answer from the last problem.

√:  Square root.  Click or type a number or equation then press the square root button to calculate the square root of the number or equation answer.

Use Notes
---------------
The "Enter" key works as an equals button only, if a button is highlighted and Enter is clicked nothing will happen.

If the equation or answer is longer than the screen you can scroll to the right to see the overflow.



