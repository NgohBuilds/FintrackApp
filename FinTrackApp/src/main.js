import { closeForm } from "./LogicUI/closeButton.js";
import { displayForm } from "./LogicUI/addTransButton.js";
import { income_btn , expense_btn , isInputCorrect } from "./LogicUI/form.js"; 
import { addEventClick } from "./LogicUI/clickEvent.js";

const transactionBtn = document.querySelector('#addTransactionBtn')
const closeDialogBtn = document.querySelector('#closeBtn')
const submitBtn =document.querySelector('#submitBtn')
const dialog = document.querySelector('dialog')
const form = document.querySelector('form')

displayForm(transactionBtn ,dialog )
closeForm(closeDialogBtn , dialog)
/*
 Update line 16 ...
*/
//isInputCorrect()
form.addEventListener("submit" , (e)=>{
    e.preventDefault()
   
})


/** Button Type Styling (Income : Green , white ; Expense : Red , White) */
addEventClick(income_btn , expense_btn)
addEventClick(expense_btn , income_btn)

/**
 * Date : 12/02/2026 - 13/02/2026
 * ----------------------------------------------------------------
 * 1. Input verification (Amount , Date) [done]
 * 2. Handle dialog issues position [done]
 * 3. Animation dialog [done]
 * 
 */
