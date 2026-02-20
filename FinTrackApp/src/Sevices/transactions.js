let db;

function openDB(callback) {
    const request = indexedDB.open("fintrackDB", 1);

    request.onupgradeneeded = function (e) {
        db = e.target.result;

        if (!db.objectStoreNames.contains("transactions")) {
            const store = db.createObjectStore("transactions", {
                keyPath: "id",
                autoIncrement: true
            });

            store.createIndex("type", "type", { unique: false });
            store.createIndex("date", "date", { unique: false });
        }
    };

    request.onsuccess = function (e) {
        db = e.target.result;
        console.log("DB connected");
        if (callback) callback();
    };

    request.onerror = function () {
        console.error("DB error");
    };
}

function addTransaction(data, callback) {
    if (!db) return console.error("DB not initialized");

    const tx = db.transaction("transactions", "readwrite");
    const store = tx.objectStore("transactions");

    const request = store.add(data);

    request.onsuccess = function (e) {
        console.log("Transaction added");
        if (callback) callback(e.target.result); // retourne l'id
    };

    request.onerror = function () {
        console.error("Add failed");
    };
}

function getAllTransactions(callback) {
    if (!db) return console.error("DB not initialized");

    const tx = db.transaction("transactions", "readonly");
    const store = tx.objectStore("transactions");

    const request = store.getAll();

    request.onsuccess = function () {
        callback(request.result);
    };

    request.onerror = function () {
        console.error("Fetch failed");
    };
}

function updateTransaction(id, newData, callback) {
    const tx = db.transaction("transactions", "readwrite");
    const store = tx.objectStore("transactions");

    const getReq = store.get(id);

    getReq.onsuccess = function () {
        const updated = { ...getReq.result, ...newData };
        const updateReq = store.put(updated);

        updateReq.onsuccess = function () {
            console.log("Transaction updated");
            if (callback) callback();
        };
    };
}
function deleteTransaction(id, callback) {
    const tx = db.transaction("transactions", "readwrite");
    const store = tx.objectStore("transactions");

    const request = store.delete(id);

    request.onsuccess = function () {
        console.log("Transaction deleted");
        if (callback) callback();
    };
}