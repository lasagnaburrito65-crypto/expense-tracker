// ========================================
// MONTH-TO-MONTH COMPARISON
// ========================================


// ========================================
// GET TOTAL EXPENSES FOR A MONTH
// ========================================

function getMonthlyExpenses(
    transactions,
    month
) {

    const monthlyTransactions =
        getMonthlyTransactions(
            transactions,
            month
        );


    let totalExpenses = 0;


    monthlyTransactions.forEach(
        function(transaction) {

            if (
                transaction.type ===
                "expense"
            ) {

                totalExpenses +=
                    Number(
                        transaction.amount
                    );

            }

        }
    );


    return totalExpenses;

}


// ========================================
// GET PREVIOUS MONTH
// ========================================

function getPreviousMonth(
    selectedMonth
) {

    /*
        selectedMonth looks like:

        2026-08

        We turn it into a date,
        then move one month backwards.
    */

    const date =
        new Date(
            selectedMonth + "-01T00:00:00"
        );


    date.setMonth(
        date.getMonth() - 1
    );


    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}`;

}


// ========================================
// CALCULATE COMPARISON
// ========================================

function calculateMonthlyComparison(
    transactions,
    selectedMonth
) {


    // Current month

    const currentExpenses =
        getMonthlyExpenses(
            transactions,
            selectedMonth
        );


    // Previous month

    const previousMonth =
        getPreviousMonth(
            selectedMonth
        );


    const previousExpenses =
        getMonthlyExpenses(
            transactions,
            previousMonth
        );


    // Difference

    const difference =
        currentExpenses -
        previousExpenses;


    // ====================================
    // PERCENTAGE CHANGE
    // ====================================

    let percentageChange = 0;


    if (
        previousExpenses > 0
    ) {

        percentageChange =
            (
                difference /
                previousExpenses
            ) * 100;

    }


    return {

        currentExpenses:
            currentExpenses,

        previousExpenses:
            previousExpenses,

        difference:
            difference,

        percentageChange:
            percentageChange,

        previousMonth:
            previousMonth

    };

}


// ========================================
// DISPLAY COMPARISON
// ========================================

function displayMonthlyComparison(
    comparison
) {


    const container =
        document.getElementById(
            "monthlyComparison"
        );


    container.innerHTML = "";


    // ====================================
    // CURRENT MONTH
    // ====================================

    const currentBox =
        document.createElement(
            "div"
        );


    currentBox.className =
        "comparison-card";


    currentBox.innerHTML = `

        <span>
            This Month
        </span>

        <strong>
            ₹${comparison.currentExpenses.toLocaleString("en-IN")}
        </strong>

    `;


    // ====================================
    // PREVIOUS MONTH
    // ====================================

    const previousBox =
        document.createElement(
            "div"
        );


    previousBox.className =
        "comparison-card";


    previousBox.innerHTML = `

        <span>
            Previous Month
        </span>

        <strong>
            ₹${comparison.previousExpenses.toLocaleString("en-IN")}
        </strong>

    `;


    // ====================================
    // CHANGE
    // ====================================

    const changeBox =
        document.createElement(
            "div"
        );


    changeBox.className =
        "comparison-change";


    // ====================================
    // NO PREVIOUS DATA
    // ====================================

    if (
        comparison.previousExpenses === 0
    ) {

        changeBox.innerHTML = `

            <span>
                📊 Comparison
            </span>

            <strong>
                No previous data
            </strong>

            <p>
                Add expenses from the previous
                month to compare your spending.
            </p>

        `;

    }


    // ====================================
    // SPENDING INCREASED
    // ====================================

    else if (
        comparison.difference > 0
    ) {

        changeBox.classList.add(
            "comparison-increase"
        );


        changeBox.innerHTML = `

            <span>
                📈 Spending Increased
            </span>

            <strong>
                +${Math.abs(
                    comparison.percentageChange
                ).toFixed(1)}%
            </strong>

            <p>
                You spent ₹${Math.abs(
                    comparison.difference
                ).toLocaleString("en-IN")}
                more than last month.
            </p>

        `;

    }


    // ====================================
    // SPENDING DECREASED
    // ====================================

    else if (
        comparison.difference < 0
    ) {

        changeBox.classList.add(
            "comparison-decrease"
        );


        changeBox.innerHTML = `

            <span>
                📉 Spending Decreased
            </span>

            <strong>
                -${Math.abs(
                    comparison.percentageChange
                ).toFixed(1)}%
            </strong>

            <p>
                🎉 You spent ₹${Math.abs(
                    comparison.difference
                ).toLocaleString("en-IN")}
                less than last month.
            </p>

        `;

    }


    // ====================================
    // SAME SPENDING
    // ====================================

    else {

        changeBox.innerHTML = `

            <span>
                ➡️ Spending Unchanged
            </span>

            <strong>
                0%
            </strong>

            <p>
                You spent the same amount
                as last month.
            </p>

        `;

    }


    // ====================================
    // ADD TO PAGE
    // ====================================

    container.appendChild(
        currentBox
    );


    container.appendChild(
        previousBox
    );


    container.appendChild(
        changeBox
    );

}