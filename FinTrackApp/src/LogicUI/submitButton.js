import { addTransaction } from "../Sevices/transactions.js"
export function submit(btn , amount , label , category , date){
    let data = {
        amount :amount,
        label:label,
        category:category,
        date:date,
        createAt :Date.now()
    }
    btn.addEventListener('submit',addTransaction(amount , label , category , date))
}