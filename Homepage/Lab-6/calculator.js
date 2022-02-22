$(document).ready(function() {
    $("#sum").click(sum);
    $("#subtract").click(subtract);
    $("#multiply").click(multiply);
    $("#divide").click(divide);
})

function sum() {
        const firstOperandElement = $("#first-operand");
        const secondOperandElement = $("#second-operand");

        const firstOperandNumber = parseInt(firstOperandElement.val());
        const secondOperandNumber = parseInt(secondOperandElement.val());

        const listItem = `<li><span style="background-color: green;">${firstOperandNumber} + ${secondOperandNumber}
        = ${firstOperandNumber + secondOperandNumber}</span></li>`

        $("#history-items").append(listItem);
}

function subtract() {
        const firstOperandElement = $("#first-operand");
        const secondOperandElement = $("#second-operand");

        const firstOperandNumber = parseInt(firstOperandElement.val());
        const secondOperandNumber = parseInt(secondOperandElement.val());

        const listItem = `<li><span style="background-color: red;">${firstOperandNumber} - ${secondOperandNumber}
        = ${firstOperandNumber - secondOperandNumber}</span></li>`

        $("#history-items").append(listItem);
}

function multiply() {
    const firstOperandElement = $("#first-operand");
    const secondOperandElement = $("#second-operand");

    const firstOperandNumber = parseInt(firstOperandElement.val());
    const secondOperandNumber = parseInt(secondOperandElement.val());

    const listItem = `<li><span style="background-color: lightblue;">${firstOperandNumber} * ${secondOperandNumber}
    = ${firstOperandNumber * secondOperandNumber}</span></li>`

    $("#history-items").append(listItem);

}

function divide() {
    const firstOperandElement = $("#first-operand");
    const secondOperandElement = $("#second-operand");

    const firstOperandNumber = parseInt(firstOperandElement.val());
    const secondOperandNumber = parseInt(secondOperandElement.val());

    const listItem = `<li><span style="background-color: orange;">${firstOperandNumber} / ${secondOperandNumber}
    = ${firstOperandNumber / secondOperandNumber}</span></li>`

    $("#history-items").append(listItem);
}