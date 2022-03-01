// Abstract all the calculations into a single function
function calculate(operation) {
    const firstOperandElement = $("#first-operand");
    const secondOperandElement = $("#second-operand");

    const firstOperandNumber = parseInt(firstOperandElement.val());
    const secondOperandNumber = parseInt(secondOperandElement.val());

    let listItem;

    switch(operation) {
        case "sum":
            listItem = `
            <li>
                <span style="background-color: green;">
                    ${firstOperandNumber} + ${secondOperandNumber} = ${firstOperandNumber + secondOperandNumber}
                    <button class="hide-button">Hide</button>
                </span>
            </li>
            `;
            break;
        case "subtract":
            listItem = `
            <li>
                <span style="background-color: red;">
                    ${firstOperandNumber} - ${secondOperandNumber} = ${firstOperandNumber - secondOperandNumber}
                    <button class="hide-button">Hide</button>
                </span>
            </li>
            `;
            break;
        case "multiply":
            listItem = `
            <li>
                <span style="background-color: lightblue;">
                    ${firstOperandNumber} * ${secondOperandNumber} = ${firstOperandNumber * secondOperandNumber}
                    <button class="hide-button">Hide</button>
                </span>
            </li>
            `;
            break;
        case "divide":
            listItem = `
            <li>
                <span style="background-color: orange;">
                    ${firstOperandNumber} / ${secondOperandNumber} = ${firstOperandNumber / secondOperandNumber}
                    <button class="hide-button">Hide</button>
                </span>
            </li>
            `;
            break;
        default:
            listItem = "";
            break;
    }
    $("#history-items").append(listItem);
}

function hide() {
    // The button is contained inside the span, which is contained in a list item. Therefore I use parent() twice in order to select the list item.
    // This is called OBJECT CHAINING
    $(this).parent().parent().remove();
}

setup = function() {
    $('.operator').click(function (){
      calculate(this.id);
    });

    // The on fuction can take two or three parameters (type of event, child HTML element, callback function)
    // We have to select an element that already exists when the page loads, and then we attach the listener to the child elements (.hide-button)
    $("body").on("click", ".hide-button", hide);
}

$(document).ready(setup);