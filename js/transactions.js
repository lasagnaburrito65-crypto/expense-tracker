// ============================================================
// TRANSACTIONS
// ============================================================


// ============================================================
// DISPLAY TRANSACTIONS
// ============================================================

function displayTransactions(transactionsToDisplay) {

    const transactionList =
        document.getElementById(
            "transactionList"
        );


    // Make sure the list exists

    if (!transactionList) {

        return;

    }


    // Clear current list

    transactionList.innerHTML = "";


    // ========================================================
    // NO MATCHING TRANSACTIONS
    // ========================================================

    if (
        transactionsToDisplay.length === 0
    ) {

        // Check whether the user has
        // any transactions at all

        if (
            transactions.length === 0
        ) {

            transactionList.innerHTML = `

                <div class="empty-message">

                    <strong>
                        Your ledger is still empty
                    </strong>

                    <span>
                        Add your first little
                        expense or income above. 🌿
                    </span>

                </div>

            `;

        }

        else {

            transactionList.innerHTML = `

                <div class="empty-message">

                    <strong>
                        Nothing found
                    </strong>

                    <span>
                        Try changing your search
                        or filters. 🔎
                    </span>

                </div>

            `;

        }


        return;

    }


    // ========================================================
    // CATEGORY ICONS
    // ========================================================

    const categoryIcons = {

        food:
            "🍔",

        transport:
            "🚗",

        shopping:
            "🛍️",

        bills:
            "📄",

        entertainment:
            "🎮",

        education:
            "📚",

        health:
            "❤️",

        other:
            "📌"

    };


    // ========================================================
    // DISPLAY EACH TRANSACTION
    // ========================================================

    transactionsToDisplay.forEach(
        function (transaction, index) {


            // ==================================================
            // CREATE TRANSACTION ELEMENT
            // ==================================================

            const transactionElement =
                document.createElement(
                    "div"
                );


            transactionElement.className =
                "transaction-item";


            // ==================================================
            // STAGGER ANIMATION
            // ==================================================

            transactionElement.style.animationDelay =
                `${Math.min(
                    index * 0.06,
                    0.5
                )}s`;


            // ==================================================
            // TYPE
            // ==================================================

            const isIncome =
                transaction.type ===
                "income";


            const amountClass =
                isIncome
                    ? "income-amount"
                    : "expense-amount";


            const amountSign =
                isIncome
                    ? "+"
                    : "-";


            // ==================================================
            // CATEGORY ICON
            // ==================================================

            const icon =
                categoryIcons[
                    transaction.category
                ]
                ||
                "📌";


            // ==================================================
            // FRIENDLY TYPE LABEL
            // ==================================================

            const typeLabel =
                isIncome
                    ? "Received"
                    : "Spent";


            // ==================================================
            // CREATE TRANSACTION HTML
            // ==================================================

            transactionElement.innerHTML = `

                <div class="transaction-info">


                    <div
                        class="transaction-icon"
                        aria-hidden="true"
                    >
                        ${icon}
                    </div>


                    <div class="transaction-details">


                        <strong
                            title="${escapeHTML(
                                transaction.description
                            )}"
                        >

                            ${escapeHTML(
                                transaction.description
                            )}

                        </strong>


                        <p>

                            ${capitalize(
                                transaction.category
                            )}

                            <span class="dot">
                                •
                            </span>

                            ${formatDate(
                                transaction.date
                            )}

                            <span class="dot">
                                •
                            </span>

                            ${typeLabel}

                        </p>


                    </div>


                </div>



                <div class="transaction-right">


                    <strong
                        class="${amountClass}"
                    >

                        ${amountSign}₹${Number(
                            transaction.amount
                        ).toLocaleString(
                            "en-IN",
                            {
                                minimumFractionDigits:
                                    0,

                                maximumFractionDigits:
                                    2
                            }
                        )}

                    </strong>



                    <div class="transaction-actions">


                        <button
                            type="button"
                            class="edit-button"
                            aria-label="Edit ${escapeHTML(
                                transaction.description
                            )}"
                            title="Edit entry"
                            onclick="
                                editTransaction(
                                    ${transaction.id}
                                )
                            "
                        >

                            ✏️

                        </button>



                        <button
                            type="button"
                            class="delete-button"
                            aria-label="Delete ${escapeHTML(
                                transaction.description
                            )}"
                            title="Delete entry"
                            onclick="
                                deleteTransaction(
                                    ${transaction.id}
                                )
                            "
                        >

                            🗑️

                        </button>


                    </div>


                </div>

            `;


            // ==================================================
            // ADD TO PAGE
            // ==================================================

            transactionList.appendChild(
                transactionElement
            );


        }
    );

}


// ============================================================
// FORMAT DATE
// ============================================================

function formatDate(date) {

    const dateObject =
        new Date(date);


    // Prevent invalid dates

    if (
        isNaN(
            dateObject.getTime()
        )
    ) {

        return "Unknown date";

    }


    return dateObject.toLocaleDateString(
        "en-IN",
        {
            day:
                "numeric",

            month:
                "short",

            year:
                "numeric"
        }
    );

}


// ============================================================
// CAPITALIZE TEXT
// ============================================================

function capitalize(text) {

    if (
        !text
    ) {

        return "";

    }


    return (
        text.charAt(0).toUpperCase()
        +
        text.slice(1)
    );

}


// ============================================================
// ESCAPE HTML
// ============================================================
//
// This prevents text entered by the user from
// accidentally being interpreted as HTML.
//
// Example:
//
// <script>...</script>
//
// will be displayed as text rather than executed.
// ============================================================

function escapeHTML(text) {

    const element =
        document.createElement(
            "div"
        );


    element.textContent =
        text ?? "";


    return element.innerHTML;

}