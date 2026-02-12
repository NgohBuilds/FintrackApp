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
isInputCorrect()
form.addEventListener("submit" , (e)=>{
    e.preventDefault()
   
})

/**
 * Date : 08/02/2026 - 11/02/2026
 * ----------------------------------------------------------------
 * # First Session (
 * 1. Refactoring close and open dialog (done)
 * 2. Animation de popup dialog
 * 
 * # Second Session ()
 * 1. Gestion des champs du formulaire (simplement avec le HTML) (done)
 * 2. Couleur des bouttons au clic (simplement avec event ) (done)
 * 3. Contenu des options (done)
 */

/**
 * Form elements Interactivity
 */

/** Button Type Styling (Income : Green , white ; Expense : Red , White) */
addEventClick(income_btn , expense_btn)
addEventClick(expense_btn , income_btn)

/**
 * Date : 12/02/2026 - 13/02/2026
 * ----------------------------------------------------------------
 * # First Session :
 * 1. Input verification (Amount , Date) [In progress]
 * 2. Handle dialog issues position
 * 3. Animation dialog
 * 
 * # Second Session :
 * 1. 
 * 2. 
 * 3. 
 */
