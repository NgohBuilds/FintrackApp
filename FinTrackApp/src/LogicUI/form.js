export const income_btn = document.querySelector('#Income')
export const expense_btn = document.querySelector('#Expense')
export const textColor = "text-white"
export const bgActiveIncomeBtn = "bg-green-500"
export const bgActiveExpsensBtn = "bg-red-500"
const optionForm = document.querySelectorAll('select option')

const optionContent = {
    "Income" : ["Salary", "Freelance","Investment","Gift","Other Income"]  ,
    "Expense" : ["Food" , "Transport" , "Shopping","Bills","Entertainement","Healt","Other Expense"]
 }

const color_btn_transaction = {
    "IncomeColor" : {"textColor" :textColor ,"bgColor" :bgActiveIncomeBtn },
    "ExpenseColor" : {"textColor" : textColor ,"bgColor" : bgActiveExpsensBtn},
}

export function changeCategory(typeTrans)
{
    Array.from(optionForm).map((opt , index)  => opt.textContent = optionContent[typeTrans][index])
}
/**
 * Identify button Type (Income or Expense)
 */


let identifyBtnType= (btn)=> btn.id;
/**
 * Apply specific style depending of id
 */
function applyStyleBtn (btn , Type){
   if (identifyBtnType(btn) == Type) 
    {
    let btnColor = color_btn_transaction[Type+"Color"]["bgColor"] ;
    let textColor = color_btn_transaction[Type+"Color"]["textColor"]
    btn.classList.add(btnColor,textColor)
    
   }
   
}

/** Change clicked button Color (background and text ) */
export function changeColorClickedBtn (btn){
    let typeBtn ; 
    if(btn.classList.contains('clicked'))
    {
        typeBtn = identifyBtnType(btn)
        applyStyleBtn(btn,typeBtn)

    }

}

/* Date : 12/02/2026 ------------------------------------------------ */

/* Input validation*/
const amountInput = document.querySelector("input[type ='number']")
const dateInput = document.querySelector("input[type ='date']")
/** Amount input */
export function isInputCorrect(){
    let userInput = amountInput.value 
    let span = "<span class =' text-red-500 text-xs '>Positive number allowed </span>"
    parseFloat(userInput) < 0 ?
    amountInput.insertAdjacentHTML('afterend',span) : amountInput.parentNode.removeChild(amountInput.parentNode.lastChild)
    
}

