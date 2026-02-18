import { initDB } from "../DataBase/indexedDB.js";
import { db } from "../DataBase/indexedDB.js";

function deleteTransaction(id) {

    if (!db) {
        console.log("DB non initialisée !");
        return;
    }

    let transaction = db.transaction("Transactions", "readwrite");
    let store = transaction.objectStore("Transactions");

    let request = store.delete(id);

    request.onsuccess = function () {
        console.log("Transaction supprimée");
    };

    request.onerror = function () {
        console.log("Erreur suppression");
    };
}

function updateTransaction(data) {

    if (!db) {
        console.log("DB non initialisée !");
        return;
    }

    let transaction = db.transaction("Transactions", "readwrite");
    let store = transaction.objectStore("Transactions");

    let request = store.put(data);

    request.onsuccess = function () {
        console.log("Transaction mise à jour");
    };

    request.onerror = function () {
        console.log("Erreur mise à jour");
    };
}

export function addTransaction(data) {

    if (!db) {
        console.log("DB non initialisée !");
        return;
    }

    let transaction = db.transaction("Transactions", "readwrite");
    let store = transaction.objectStore("Transactions");

    let request = store.add(data);

    request.onsuccess = function (event) {
        console.log("Transaction ajoutée avec succès");
        console.log("ID généré :", event.target.result);
    };

    request.onerror = function () {
        console.log("Erreur lors de l'ajout");
    };
}

function getAllTransactions() {

    if (!db) {
        console.log("DB non initialisée !");
        return;
    }

    let transaction = db.transaction("Transactions", "readonly");
    let store = transaction.objectStore("Transactions");

    let request = store.getAll();

    request.onsuccess = function (event) {
        let results = event.target.result;
        console.log("Toutes les transactions :", results);
    };

    request.onerror = function () {
        console.log("Erreur récupération");
    };
}
