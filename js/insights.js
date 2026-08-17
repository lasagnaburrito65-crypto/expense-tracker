// ========================================
// SPENDING INSIGHTS
// ========================================


// ========================================
// CATEGORY NAMES
// ========================================

const insightCategoryNames = {

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
// CATEGORY ICONS
// ========================================

const insightCategoryIcons = {

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
// GENERATE INSIGHTS
// ========================================

function generateSpendingInsights(
    transactions,
    budget
) {


    // Get only expenses

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
    // FIND TOTAL SPENDING
    // ====================================

    let totalSpending = 0;


    expenses.forEach(
        function(transaction) {

            totalSpending +=
                Number(
                    transaction.amount
                );

        }
    );


    // ====================================
    // GET INSIGHTS ELEMENT
    // ====================================

    const insightsContainer =
        document.getElementById(
            "spendingInsights"
        );


    // Clear previous insights

    insightsContainer.innerHTML = "";


    // ====================================
    // NO EXPENSES
    // ====================================

    if (expenses.length === 0) {

        insightsContainer.innerHTML = `

            <div class="insight-item">

                <span class="insight-icon">
                    💡
                </span>

                <div>

                    <strong>
                        No spending data yet
                    </strong>

                    <p>
                        Add some expenses to get
                        personalized spending insights.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    // ====================================
    // GROUP BY CATEGORY
    // ====================================

    const categoryTotals = {};


    expenses.forEach(
        function(transaction) {

            const category =
                transaction.category;


            const amount =
                Number(
                    transaction.amount
                );


            if (
                !categoryTotals[category]
            ) {

                categoryTotals[category] =
                    0;

            }


            categoryTotals[category] +=
                amount;

        }
    );


    // ====================================
    // FIND BIGGEST CATEGORY
    // ====================================

    const sortedCategories =
        Object.entries(
            categoryTotals
        ).sort(
            function(a, b) {

                return b[1] - a[1];

            }
        );


    const biggestCategory =
        sortedCategories[0];


    const biggestCategoryName =
        insightCategoryNames[
            biggestCategory[0]
        ]
        || biggestCategory[0];


    const biggestCategoryIcon =
        insightCategoryIcons[
            biggestCategory[0]
        ]
        || "📌";


    const biggestCategoryAmount =
        biggestCategory[1];


    // ====================================
    // CALCULATE PERCENTAGE
    // ====================================

    const biggestCategoryPercentage =
        (
            biggestCategoryAmount /
            totalSpending
        ) * 100;


    // ====================================
    // INSIGHT 1
    // ====================================

    addInsight(

        "🏆",

        `${biggestCategoryIcon} ${biggestCategoryName} is your biggest expense.`,

        `You spent ₹${biggestCategoryAmount.toLocaleString("en-IN")} on ${biggestCategoryName} this month.`

    );


    // ====================================
    // INSIGHT 2
    // ====================================

    addInsight(

        "📊",

        `${biggestCategoryName} makes up ${Math.round(biggestCategoryPercentage)}% of your spending.`,

        `Your total spending this month is ₹${totalSpending.toLocaleString("en-IN")}.`

    );


    // ====================================
    // BUDGET INSIGHT
    // ====================================

    if (budget > 0) {


        const remaining =
            budget - totalSpending;


        if (remaining > 0) {

            addInsight(

                "💰",

                `You have ₹${remaining.toLocaleString("en-IN")} left in your budget.`,

                "Keep an eye on your spending so you stay within your limit."

            );

        }


        else if (remaining < 0) {

            addInsight(

                "⚠️",

                `You are ₹${Math.abs(remaining).toLocaleString("en-IN")} over your budget.`,

                "Consider reducing spending for the rest of the month."

            );

        }


        else {

            addInsight(

                "⚠️",

                "You have reached your budget limit.",

                "Any additional expenses will put you over budget."

            );

        }

    }


    // ====================================
    // MANY CATEGORIES INSIGHT
    // ====================================

    if (
        sortedCategories.length >= 4
    ) {

        addInsight(

            "📋",

            "You are spending across several categories.",

            `You currently have expenses in ${sortedCategories.length} different categories.`

        );

    }

}


// ========================================
// ADD AN INSIGHT TO THE PAGE
// ========================================

function addInsight(
    icon,
    title,
    description
) {


    const container =
        document.getElementById(
            "spendingInsights"
        );


    const insight =
        document.createElement(
            "div"
        );


    insight.className =
        "insight-item";


    insight.innerHTML = `

        <span class="insight-icon">
            ${icon}
        </span>

        <div>

            <strong>
                ${title}
            </strong>

            <p>
                ${description}
            </p>

        </div>

    `;


    container.appendChild(
        insight
    );

}