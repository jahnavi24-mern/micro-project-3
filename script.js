const input = document.querySelector(".input");
const select = document.querySelectorAll(".num");
const del = document.querySelector(".del")
const reset = document.querySelector(".reset");
const equal = document.querySelector(".equal");

let curr = '';
let result = '';

const display = (value) => {
    input.value = value;
    input.scrollLeft = input.scrollWidth;
};

const isOperator = (value) => {
    if (!value){
        return false;
    }
    return '+-x/'.includes(value);
};

const selectedClick = (value) => {
    console.log("You clicked", value);

    // Not allow starting the expression with an operator other than '-'
    if (curr === '' && isOperator(value) && value !== '-') return;

    // Check if the last non-space character is an operator
    const lastChar = curr.trim().slice(-1);
    if (isOperator(value) && isOperator(lastChar)) {
        console.log("Multiple operators together not allowed");
        return;
    }

    // Disallow multiple decimal points in a number

    const lastNumber = curr.split(/[\+\-\x\/]/).pop(); // Get the last number segment
    if (value === '.' && lastNumber.includes('.')) return;

    const format = value.replace(/([+\-x\/])/g, ' $1 ')
    // Append value to the current expression
    curr += format;

    display(curr);

};

const equalClick = () => {
    if (curr === '' || isOperator(curr.slice(-1))) return;

    try {
        const expression = curr.replace(/x/g, "*");
        result = eval(expression);
        result = parseFloat(result.toFixed(3));

        display(result);

        curr = result.toString();

    } catch(e){
        console.log(e);
        display('Error');
    }
}

const deleteClick = () => {
    if (curr.length > 0) {
        // Remove the last character and any trailing spaces
        if (curr.slice(-1) === ' ') {
            curr = curr.slice(0, -3); // Remove operator with spaces
        } else {
            curr = curr.slice(0, -1); // Remove last character
        }
        display(curr);
    }
};

const resetClick = () => {
    curr = '';
    result = '';

    display('');
}


select.forEach((key) => key.addEventListener("click", function(){
    const value = this.textContent;
    selectedClick(value);
}));
del.addEventListener("click", deleteClick);
reset.addEventListener("click", resetClick);
equal.addEventListener("click", equalClick);



// Improvisation: Taking input using keyboard as well

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        selectedClick(key); 
    } else if (key === '.') {
        selectedClick(key); 
    } else if (key === '+') {
        selectedClick(key); 
    } else if (key === '-') {
        selectedClick(key);
    } else if (key === '*') {
        selectedClick('x'); 
    } else if (key === '/') {
        selectedClick('/'); 
    } else if (key === 'Enter') {
        equalClick(); // Handle equal sign
    } else if (key === 'Backspace') {
        deleteClick(); // Handle delete
    } else if (key === 'Escape') {
        resetClick(); // Handle reset (Escape key)
    }
});
