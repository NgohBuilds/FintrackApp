import { addTransaction } from "../DataBase/indexedDB.js";

export function submit(btn , amount , label , category , date){
    
    btn.addEventListener('submit',addTransaction(amount , label , category , date))

}