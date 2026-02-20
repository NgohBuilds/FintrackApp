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

        transactions.forEach(tx => {
            const div = document.createElement("div");
            div.className = "transaction-item bg-white shadow-md rounded-xl p-4 flex flex-col justify-between  mb-4";
            div.dataset.id = tx.id;

            // LEFT SIDE
            const left = document.createElement("div");
            left.className = "transaction-left";
            left.innerHTML = `
            <div>
                <div>
                 <p class="font-bold category">${tx.category}</p>
                 <span class="font-bold category">${selectedType}</span>
                </div>
                <span class="text-sm text-gray-500 date">${tx.date}</span>

               
            </div>
        
            `;

            // RIGHT SIDE
            const right = document.createElement("div");
            right.className = "transaction-right flex items-center gap-3";
            right.innerHTML = `
                <span class="${tx.type === "Income" ? "text-green-600" : "text-red-600"} font-bold">
                    $${tx.amount.toFixed(2)}
                </span>
                <button class="edit-btn text-blue-500"><i class="fa-solid fa-pen"></i></button>
                <button class="delete-btn text-red-500"><i class="fa-solid fa-trash"></i></button>
            `;

            div.appendChild(left);
            div.appendChild(right);
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
    // NE TOUCHER QUE LES VALEURS
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