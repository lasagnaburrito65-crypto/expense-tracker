// ========================================
// BUDGET SYSTEM
// ========================================


// ========================================
// LOAD SAVED BUDGETS
// ========================================

function loadBudgets() {

    const savedBudgets =
        localStorage.getItem(
            "expenseTrackerBudgets"
        );


    if (!savedBudgets) {

        return {};

    }


    try {

        return JSON.parse(
            savedBudgets
        );

    } catch (error) {

        console.error(
            "Could not load budgets:",
            error
        );

        return {};

    }

}


// ========================================
// SAVE BUDGETS
// ========================================

function saveBudgets(budgets) {

    localStorage.setItem(
        "expenseTrackerBudgets",
        JSON.stringify(budgets)
    );

}


// ========================================
// GET BUDGET FOR A MONTH
// ========================================

function getMonthlyBudget(
    budgets,
    month
) {

    return Number(
        budgets[month] || 0
    );

}


// ========================================
// SET BUDGET FOR A MONTH
// ========================================

function setMonthlyBudget(
    budgets,
    month,
    amount
) {

    budgets[month] =
        Number(amount);


    saveBudgets(
        budgets
    );

}


// ========================================
// CALCULATE BUDGET INFORMATION
// ========================================

function calculateBudgetStatus(
    budget,
    expenses
) {

    const remaining =
        budget - expenses;


    let percentage = 0;


    if (budget > 0) {

        percentage =
            (expenses / budget) * 100;

    }


    return {

        budget: budget,

        expenses: expenses,

        remaining: remaining,

        percentage: percentage

    };

}