/**
 * 1. Create IdB ;(done)
 * 2. Create a function to add objectStore after user click on submit button ; (in progress)
 * 3. Create a function to show data in UI ;
 * 4. Create a function to delete objectStore  ;
 * 5. Create a function to update objectStore ;
*/
export function InitDataBase(){
    let db;
    let count = 0
    let openRequest = indexedDB.open('financeTrackApp',1)
    
    openRequest.onupgradeneeded= function(event){
        db = event.target.result
        if (!db.objectStoreNames.contains("Financial transaction")){
            let table = db.createObjectStore("Financial transaction" , {keyPath : "id"})
        }
    }
    openRequest.onsuccess = function(){
        console.log("FinanceTrackApp indexedDB created with success")
    }
    openRequest.onerror = function(){
        console.error("Something Goes wrong ")
    }
    return db;
}

export function addTransaction (amount , label , category,date){
    let db = InitDataBase()
    let transaction = db.transaction("Financial transaction" ,"readwrite")
    count ;
    let transactionParameter = {
        id : count,
        label: label,
        category : category ,
        date : date 
    }
    let addrequest = transaction.objectStore("Financial transaction").add(transactionParameter)
    addrequest.onsuccess = function(){
        alert("Transaction just added")
    }
    addrequest.onerror = function(){ alert("Transaction failed to be added")}

}
/**
 * Note : Create function return input value in form 
 */