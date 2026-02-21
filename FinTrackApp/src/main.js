import { income_btn, expense_btn } from "./LogicUI/form.js";
import { addEventClick } from "./LogicUI/clickEvent.js";

// ================= SELECTORS =================
const transactionBtn = document.querySelector('#addTransactionBtn');
const closeDialogBtn = document.querySelector('#closeBtn');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const submitBtn = document.querySelector("#submitBtn");

const label = document.querySelector("#Category");
const date = document.querySelector("#Date");
const amount = document.querySelector("#amount");
const description = document.querySelector("#Description");

const emptyState = document.querySelector("#empty-state");
const transactionList = document.querySelector("#transaction-list");

const incomeAmountDisplay = document.querySelector(".Income_amount");
const expenseAmountDisplay = document.querySelector(".Expenses_amount");
const totalDisplay = document.querySelector(".amount_total");

const incomeBtnDOM = document.querySelector("#Income");
const expenseBtnDOM = document.querySelector("#Expense");

// ================= STATE =================
let selectedType = "Income";
let editMode = false;
let editId = null;

// ================= EVENT HANDLERS =================
transactionBtn.onclick = () => openForm();
closeDialogBtn.onclick = () => resetForm();

incomeBtnDOM.onclick = () => selectType("Income");
expenseBtnDOM.onclick = () => selectType("Expense");

// ================= FUNCTIONS =================
function selectType(type) {
    selectedType = type;
    if (type === "Income") {
        incomeBtnDOM.classList.add("clicked", "bg-green-500", "text-white");
        expenseBtnDOM.classList.remove("clicked", "bg-red-500", "text-white");
    } else {
        expenseBtnDOM.classList.add("clicked", "bg-red-500", "text-white");
        incomeBtnDOM.classList.remove("clicked", "bg-green-500", "text-white");
    }
}

function openForm() {
    dialog.showModal(); // garde le layout
}

// ================= INIT =================
openDB(() => {
    displayTransactions();
});

// ================= DISPLAY =================
function displayTransactions() {
    transactionList.innerHTML = "";

    getAllTransactions(transactions => {
        if (!transactions || transactions.length === 0) {
            emptyState.style.display = "block";
            updateSummary([]);
            return;
        }

        emptyState.style.display = "none";
        const title = document.createElement('div')
        title.innerHTML =`<h1>Transaction</h1>`
        transactions.forEach(tx => {
            const div = document.createElement("div");
            div.className = " bg-white shadow-md rounded-xl p-4  justify-between  mb-4 w-screen max-w-[640px]  border border-blue-300 ";
            div.dataset.id = tx.id;

            // MIDDLE SIDE
            const middle = document.createElement("div");
            middle.className ="flex"
            middle.innerHTML = `
            <div class=" w-1/2">
                <div class = "flex gap">
                 <p class="font-bold text-xl category">${tx.category}</p>
                 <span class="font-bold category ${tx.type ===  "Income" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"} inline-block p-1 rounded-xl text-xs  ml-2">${tx.type}</span>
                </div>
                <span class="text-sm text-gray-500 date ">${tx.date}</span>
                <p class=" text-sm sm:text-xl text-gray-500 font-semibold">${tx.description}</p>
            </div>
            <span class="text-center ${tx.type === "Income" ? "text-green-600" : "text-red-600"} font-bold inline-block ">
                    $${tx.amount.toFixed(2)}
            </span>
            `

            // BOTTOM SIDE
            const bottom = document.createElement('div');
            bottom.innerHTML = `
            <hr class=" my-3  bg-blue-100">
            <div class = "flex justify-between *:w-[45%]   *:rounded-xl *:p-3">
                <button class="edit-btn text-blue-500 bg-blue-100">
                    <i class="fa-solid fa-pen"></i>
                    Edit
                </button>
                <button class="delete-btn text-red-500 bg-red-100" >
                    <i class="fa-solid fa-trash"></i>
                    Delete
                </button>
            </div>`

            div.appendChild(middle);
            div.appendChild(bottom)
            transactionList.appendChild(div);

            // DELETE
            div.querySelector(".delete-btn").onclick = () => {
                deleteTransaction(tx.id, () => displayTransactions());
            };

            // EDIT
            div.querySelector(".edit-btn").onclick = () => {
                editMode = true;
                editId = tx.id;
                populateForm(tx);
            };
        });

        updateSummary(transactions);
    });
}


function populateForm(tx) {

    amount.value = tx.amount;
    label.value = tx.category;
    date.value = tx.date;
    description.value = tx.description || "";

    selectType(tx.type);
    submitBtn.textContent = "Update Transaction";
    dialog.showModal();
}


form.onsubmit = e => {
    e.preventDefault();

    const data = {
        amount: parseFloat(amount.value),
        category: label.value,
        date: date.value,
        description: description.value,
        type: selectedType
    };

    if (editMode) {
        updateTransaction(editId, data, () => {
            resetForm();
            displayTransactions();
        });
    } else {
        addTransaction(data, () => {
            resetForm();
            displayTransactions();
        });
    }
};


function updateSummary(transactions) {
    let income = 0, expense = 0;
    transactions.forEach(tx => {
        if (tx.type === "Income") income += tx.amount;
        else expense += tx.amount;
    });
    incomeAmountDisplay.textContent = "$" + income.toFixed(2);
    expenseAmountDisplay.textContent = "$" + expense.toFixed(2);
    totalDisplay.textContent = "$" + (income - expense).toFixed(2);
}


function resetForm() {
    dialog.close();
    form.reset();
    editMode = false;
    editId = null;
    selectedType = "Income";
    submitBtn.textContent = "Save Transaction";
    selectType("Income");
}

// ================= BUTTON STYLING =================
addEventClick(income_btn, expense_btn);
addEventClick(expense_btn, income_btn);