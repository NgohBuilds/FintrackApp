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
            let table = db.createObjectStore("Financial transaction" , {keyPath : "id", autoIncrement:true})
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

export function addTransaction (amount , label , category,date , select){
    let db = InitDataBase()
    let transaction = db.transaction("Financial transaction" ,"readwrite")
    let transactionParameter = {
        amount: amount,
        label: label,
        category : category ,
        date : date ,
        createdAt: Date.now()
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
/**
 * ✅ Solution propre (avec Promise)

La meilleure pratique moderne est d’utiliser une Promise :

export function InitDataBase(){
    return new Promise((resolve, reject) => {

        const openRequest = indexedDB.open('financeTrackApp', 1);

        openRequest.onupgradeneeded = function(event){
            const db = event.target.result;

            if (!db.objectStoreNames.contains("Financial transaction")){
                db.createObjectStore("Financial transaction", { keyPath: "id" });
            }
        };

        openRequest.onsuccess = function(event){
            const db = event.target.result;
            console.log("FinanceTrackApp indexedDB created with success");
            resolve(db); // ✅ on retourne la db ici
        };

        openRequest.onerror = function(){
            reject("Something goes wrong");
        };

    });
}

✅ Comment l’utiliser
InitDataBase().then(db => {
    console.log("DB ready :", db);
});


Ou encore mieux (si tu es moderne 😉) :

const db = await InitDataBase();
console.log(db);

🎯 Résumé
Problème	Cause
db undefined	indexedDB est asynchrone
return db trop tôt	les callbacks ne sont pas encore exécutés

Si tu veux, je peux t’expliquer aussi comment structurer proprement une architecture
 */


/**
 * 
 * ✅ Solution PROPRE (avec async / await)

Ta fonction doit devenir asynchrone :

export async function addTransaction(amount, label, category, date){

    const db = await InitDataBase();

    const transaction = db.transaction("Financial transaction", "readwrite");

    const store = transaction.objectStore("Financial transaction");

    const transactionParameter = {
        id: Date.now(), // ✅ meilleur que count
        amount: amount,
        label: label,
        category: category,
        date: date
    };

    const addrequest = store.add(transactionParameter);

    addrequest.onsuccess = function(){
        alert("Transaction just added");
    };

    addrequest.onerror = function(){
        alert("Transaction failed to be added");
    };
}

🎯 Pourquoi Date.now() ?

Parce que :

count est dangereux

si tu refresh la page → il repart à 0

ça va créer des conflits de clés

Date.now() garantit un id unique.

🧠 Encore mieux (bonus senior)

Tu peux laisser IndexedDB générer l'id automatiquement :

Dans InitDataBase() :

db.createObjectStore("Financial transaction", { 
    keyPath: "id",
    autoIncrement: true
});


Et ensuite tu retires complètement id :

const transactionParameter = {
    amount,
    label,
    category,
    date
};


C’est plus propre.

📌 Résumé de tes erreurs
Erreur	Pourquoi
db = InitDataBase()	retourne une Promise
db.transaction	db n’est pas encore prêt
count	non défini
id manuel	risque de collision
 */