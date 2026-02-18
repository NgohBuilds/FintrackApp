/**
 * 1. Create IdB ;(done)
 * 2. Create a function to add objectStore after user click on submit button ; (in progress)
 * 3. Create a function to show data in UI ;
 * 4. Create a function to delete objectStore  ;
 * 5. Create a function to update objectStore ;
 
*/
export let db = null;

export function initDB() {
    let request = indexedDB.open("MaBase", 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;

        if (!db.objectStoreNames.contains("Transactions")) {
            db.createObjectStore("Transactions", {
                keyPath: "id",
                autoIncrement: true
            });
        }
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        console.log("Base ouverte avec succès");

    };

    request.onerror = function () {
        console.log("Erreur ouverture DB");
    };
}
