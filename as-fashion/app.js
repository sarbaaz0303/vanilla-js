// Data
let [quantity, rate, amountBefore, amountAfter, finalAmount] = [0, 0, 0, 0, 0];
const [sgst, cgst, tds] = [0.025, 0.025, 0.01];

// Selectors

const inputDate = document.querySelector("#date"),
    inputLotNo = document.querySelector("#lot-no"),
    inputQuantity = document.querySelector("#quantity"),
    inputRate = document.querySelector("#rate"),
    btnCalculate = document.querySelector("#calculate"),
    inputBeforeAmount = document.querySelector("#before-amount"),
    divCalculation = document.querySelector(".calculation");

// Event Handler

inputQuantity.addEventListener("keyup", () => {
    if (
        (inputQuantity.value === "" && inputRate.value !== "") ||
        (inputQuantity.value === "" && inputRate.value === "")
    ) {
        inputBeforeAmount.value = amountBefore;
    } else if (inputQuantity.value !== "" && inputRate.value !== "") {
        amountBefore =
            parseInt(inputQuantity.value) * parseInt(inputRate.value);
        inputBeforeAmount.value = amountBefore;
    }
});

inputRate.addEventListener("keyup", () => {
    if (
        (inputRate.value === "" && inputQuantity.value === "") ||
        (inputRate.value === "" && inputQuantity.value !== "")
    ) {
        inputBeforeAmount.value = amountBefore;
    } else if (inputRate.value !== "" && inputQuantity.value !== "") {
        amountBefore =
            parseInt(inputQuantity.value) * parseInt(inputRate.value);
        inputBeforeAmount.value = amountBefore;
    }
});

btnCalculate.addEventListener("click", calculate);

function calculate() {
    if (amountBefore === 0) {
        return alert("fill all field");
    }

    calculationField();

    // Data writing Selectors

    const inputAfterAmount = document.querySelector("#amount-after"),
        inputFinalAmount = document.querySelector("#final-amount"),
        inputSGST = document.querySelector("#sgst"),
        inputCGST = document.querySelector("#cgst"),
        inputTDS = document.querySelector("#tds");

    //SGST & CGST
    inputSGST.value = (sgst * amountBefore).toFixed(2);
    inputCGST.value = (cgst * amountBefore).toFixed(2);

    // Amount After Tax
    amountAfter = (amountBefore + sgst * amountBefore * 2).toFixed(2);
    inputAfterAmount.value = amountAfter;

    // TDS
    inputTDS.value = (tds * amountBefore).toFixed(2);

    // Final Amount
    finalAmount = (amountAfter - tds * amountBefore).toFixed(2);
    inputFinalAmount.value = finalAmount;
}

function calculationField() {
    divCalculation.innerHTML = `
<div class="row">
    <div class="col">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">SGST</span>
            </div>
            <input type="number" id="sgst" class="form-control" disabled>
            <div class="input-group-append">
                <span class="input-group-text">+2.5%</span>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">CGST</span>
            </div>
            <input type="number" id="cgst" class="form-control" disabled>
            <div class="input-group-append">
                <span class="input-group-text">+2.5%</span>
            </div>
        </div>
    </div>
</div>
<br>
<div class="input-group">
    <div class="input-group-prepend">
        <span class="input-group-text">Amount After GST </span>
    </div>
    <input type="number" id="amount-after" class="form-control" disabled>
</div>
<br>
<div class="row">
    <div class="col-6">
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text">TDS</span>
            </div>
            <input type="number" id="tds" class="form-control" disabled>
            <div class="input-group-append">
                <span class="input-group-text">-1%</span>
            </div>
        </div>
    </div>
</div>
<br>
<div class="input-group">
    <div class="input-group-prepend">
        <span class="input-group-text">Total Amount</span>
    </div>
    <input type="number" id="final-amount" class="form-control" disabled>
</div>
    `;
}

// DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
    inputBeforeAmount.value = 0;
    inputDate.value = todayDate();
});

function todayDate() {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
