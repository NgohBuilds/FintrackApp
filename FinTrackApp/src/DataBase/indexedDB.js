
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
