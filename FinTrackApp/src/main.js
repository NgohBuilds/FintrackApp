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

/**
 * Date : 08/02/2026
 * ----------------------------------------------------------------
 * # First Session (04:00 - 06:30)
 * 1. Refactoring close and open dialog (done)
 * 2. Animation de popup dialog
 * 
 * # Second Session ()
 * 1. Gestion des champs du formulaire (simplement avec le HTML)
 * 2. Couleur des bouttons au clic (simplement avec event )
 */