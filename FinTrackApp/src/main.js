import { closeForm } from "./LogicUI/closeButton.js";
import { displayForm } from "./LogicUI/addTransButton.js";
import { income_btn , expense_btn , isInputCorrect } from "./LogicUI/form.js"; 
import { addEventClick } from "./LogicUI/clickEvent.js";
import {initDB} from "../src/DataBase/indexedDB.js";
import { submit } from "./LogicUI/submitButton.js";

const transactionBtn = document.querySelector('#addTransactionBtn');
const closeDialogBtn = document.querySelector('#closeBtn');
const submitBtn =document.querySelector('#submitBtn')
const dialog = document.querySelector('dialog')
const form = document.querySelector('form')
const label = document.querySelector("#Category")
const date = document.querySelector("#Date")
const amount = document.querySelector("#amount")
const category = document.querySelector("select")

window.onload = function () {
    initDB();
};

displayForm(transactionBtn ,dialog )
closeForm(closeDialogBtn , dialog)

// form.addEventListener("submit" , (e)=>{
    
   
// })


/** Button Type Styling (Income : Green , white ; Expense : Red , White) */
addEventClick(income_btn , expense_btn)
addEventClick(expense_btn , income_btn)


submit(submitBtn,amount.value,label.value , category.value,date.value )
