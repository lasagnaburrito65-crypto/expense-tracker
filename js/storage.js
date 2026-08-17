// ========================================
// STORAGE
// ========================================


// Load transactions from localStorage
function loadTransactions() {

    const savedTransactions =
        localStorage.getItem("transactions");

    return savedTransactions
        ? JSON.parse(savedTransactions)
        : [];

}


// Save transactions to localStorage
function saveTransactions(transactions) {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}