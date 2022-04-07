import Bill from "./Bill.js";
const bill = new Bill(
    document.getElementById("tip"),
    document.getElementById("total")
);

const card = document.querySelector(".card__body");
const tips = document.querySelector(".card__options");
const resetBtn = document.querySelector(".card__reset");
const people = document.getElementById("people");
const tip = document.getElementById("tip");
const customTip = document.getElementById("percentageTip");
const total = document.getElementById("total");
bill.split();
displayBill();

// add event listeners
card.addEventListener("input", handleUserInput);
card.addEventListener("beforeinput", validateInput);
tips.addEventListener("mousedown", handleUserTip);
people.addEventListener("blur", handleBlur);
resetBtn.addEventListener("click", resetApp);
customTip.addEventListener("beforeinput", setTipLimit);

function handleUserInput(event) {
    setUserData(event.target.id, event.target.value);
    if (event.target.id === "percentageTip") {
        document.querySelector("button.selected")?.classList.remove("selected");
    }
}
// handle userInput input
function setUserData(key, value) {
    bill[key] = value;
    bill.split();
    displayBill();
    document
        .querySelector(".card__reset.disabled")
        ?.classList.remove("disabled");
}

// display bill
function displayBill() {
    let options = {
        style: "currency",
        currency: "USD",
        useGrouping: false,
    };
    options.notation = bill.tip.length > 5 ? "compact" : "standard";
    tip.innerText = new Intl.NumberFormat("en-US", options).format(bill.tip);
    options.notation = bill.total.length > 5 ? "compact" : "standard";
    total.innerText = new Intl.NumberFormat("en-US", options).format(
        bill.total
    );
}
// handle user tip
function handleUserTip(event) {
    if (event.target.dataset.percentage) {
        if (event.target.classList.contains("selected")) {
            setUserData("percentageTip", "0");
        } else {
            document
                .querySelector("button.selected")
                ?.classList.remove("selected");
            setUserData("percentageTip", event.target.dataset.percentage);
        }

        event.target.classList.toggle("selected");
        document.getElementById("percentageTip").value = "";
    }
}

// validate user input
function validateInput(event) {
    const re = event.target.id === "amount" ? /^\d*\.?\d*$/ : /^\d+$/;
    if (!re.test(`${event.target.value}${event.data ? event.data : ""}`)) {
        event.preventDefault();
    }
    if (parseInt(event.target.value.length) > 18 && event.data) {
        event.preventDefault();
    }
}

// limit tip percent

function setTipLimit(event) {
    if (parseInt(event.target.value.length) > 3 && event.data) {
        event.preventDefault();
    }
}
function handleBlur(event) {
    if (!event.target.value.trim()) {
        return event.target.parentElement.classList.add("invalid");
    }
    event.target.parentElement.classList.remove("invalid");
}

function resetApp() {
    bill.reset();
    displayBill();
    document.getElementById("people").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("percentageTip").value = "";
    document.querySelector("button.selected")?.classList.remove("selected");
    document.querySelector(".card__reset").classList.add("disabled");
}
