// ========================================
// ANALYTICS
// ========================================


// ========================================
// CATEGORY EMOJIS
// ========================================

const categoryIcons = {

    food: "🍔",

    transport: "🚗",

    shopping: "🛒",

    bills: "💡",

    entertainment: "🎮",

    education: "📚",

    health: "💊",

    other: "📌"

};


// ========================================
// CATEGORY NAMES
// ========================================

const categoryNames = {

    food: "Food",

    transport: "Transport",

    shopping: "Shopping",

    bills: "Bills",

    entertainment: "Entertainment",

    education: "Education",

    health: "Health",

    other: "Other"

};


// ========================================
// CALCULATE CATEGORY SPENDING
// ========================================

function calculateCategorySpending(
    transactions
) {


    // ====================================
    // GET ONLY EXPENSES
    // ====================================

    const expenses =
        transactions.filter(
            function(transaction) {

                return (
                    transaction.type ===
                    "expense"
                );

            }
        );


    // ====================================
    // GROUP EXPENSES BY CATEGORY
    // ====================================

    const categoryTotals =
        {};


    expenses.forEach(
        function(transaction) {

            const category =
                transaction.category;


            const amount =
                Number(
                    transaction.amount
                );


            // If category doesn't
            // exist yet, create it.

            if (
                !categoryTotals[category]
            ) {

                categoryTotals[category] =
                    0;

            }


            // Add amount

            categoryTotals[category] +=
                amount;

        }
    );


    // ====================================
    // CALCULATE TOTAL SPENDING
    // ====================================

    let totalSpending = 0;


    Object.values(
        categoryTotals
    ).forEach(
        function(amount) {

            totalSpending +=
                amount;

        }
    );


    // ====================================
    // DISPLAY CHART
    // ====================================

    displayCategoryChart(

        categoryTotals,

        totalSpending

    );

}


// ========================================
// DISPLAY CATEGORY CHART
// ========================================

function displayCategoryChart(
    categoryTotals,
    totalSpending
) {


    const chart =
        document.getElementById(
            "categoryChart"
        );


    // Clear old chart

    chart.innerHTML = "";


    // ====================================
    // NO EXPENSES
    // ====================================

    if (
        totalSpending === 0
    ) {

        chart.innerHTML = `

            <p class="empty-message">

                No expenses for this month yet.

            </p>

        `;

        return;

    }


    // ====================================
    // SORT CATEGORIES
    // ====================================

    const sortedCategories =
        Object.entries(
            categoryTotals
        ).sort(
            function(a, b) {

                return b[1] - a[1];

            }
        );


    // ====================================
    // CREATE EACH CATEGORY
    // ====================================

    sortedCategories.forEach(
        function([category, amount]) {


            // Calculate percentage

            const percentage =
                (
                    amount /
                    totalSpending
                ) * 100;


            // Get icon

            const icon =
                categoryIcons[category]
                || "📌";


            // Get readable name

            const name =
                categoryNames[category]
                || category;


            // ====================================
            // CREATE ROW
            // ====================================

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "category-row";


            row.innerHTML = `

                <div class="category-name">

                    ${icon} ${name}

                </div>


                <div class="category-bar-container">

                    <div
                        class="category-bar"
                        style="width: ${percentage}%"
                    ></div>

                </div>


                <div class="category-amount">

                    ₹${amount.toLocaleString("en-IN")}

                </div>

            `;


            chart.appendChild(
                row
            );

        }
    );

}