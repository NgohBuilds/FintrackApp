import { closeForm } from "./LogicUI/closeButton.js";
import { displayForm } from "./LogicUI/addTransButton.js";


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
form.addEventListener("submit" , (e)=>{
    e.preventDefault()
})
