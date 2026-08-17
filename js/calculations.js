// ========================================
// CALCULATIONS
// ========================================


// ========================================
// CALCULATE TOTALS
// ========================================

function calculateTotals(transactions) {

    let totalIncome = 0;

    let totalExpenses = 0;


    // ====================================
    // GO THROUGH EVERY TRANSACTION
    // ====================================

    transactions.forEach(
        function(transaction) {

            const amount =
                Number(transaction.amount);


            if (
                transaction.type === "income"
            ) {

                totalIncome += amount;

            }

            else {

                totalExpenses += amount;

            }

        }
    );


    // ====================================
    // CALCULATE BALANCE
    // ====================================

    const balance =
        totalIncome -
        totalExpenses;


    // ====================================
    // GET DASHBOARD ELEMENTS
    // ====================================

    const incomeElement =
        document.getElementById(
            "incomeAmount"
        );


    const expensesElement =
        document.getElementById(
            "expenseAmount"
        );


    const balanceElement =
        document.getElementById(
            "balanceAmount"
        );


    // ====================================
    // UPDATE RECEIVED
    // ====================================

    if (incomeElement) {

        incomeElement.textContent =
            `₹${totalIncome.toLocaleString(
                "en-IN"
            )}`;

    }


    // ====================================
    // UPDATE SPENT
    // ====================================

    if (expensesElement) {

        expensesElement.textContent =
            `₹${totalExpenses.toLocaleString(
                "en-IN"
            )}`;

    }


    // ====================================
    // UPDATE BALANCE
    // ====================================

    if (balanceElement) {

        balanceElement.textContent =
            `₹${balance.toLocaleString(
                "en-IN"
            )}`;

    }

}


// ========================================
// GET TRANSACTIONS FOR A MONTH
// ========================================

function getMonthlyTransactions(
    transactions,
    selectedMonth
) {

    return transactions.filter(
        function(transaction) {

            if (
                !transaction.date
            ) {

                return false;

            }


            return transaction.date.startsWith(
                selectedMonth
            );

        }
    );

}