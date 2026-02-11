export const income_btn = document.querySelector('#Income')
export const expense_btn = document.querySelector('#Expense')
export const textColor = "text-white"
export const bgActiveIncomeBtn = "bg-green-500"
export const bgActiveExpsensBtn = "bg-red-500"
const color_btn_transaction = {
    "IncomeColor" : {"textColor" :textColor ,"bgColor" :bgActiveIncomeBtn },
    "ExpenseColor" : {"textColor" : textColor ,"bgColor" : bgActiveExpsensBtn},
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

