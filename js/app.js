// ============================================================
// MY LITTLE LEDGER
// MAIN APPLICATION
// ============================================================


// ============================================================
// LOAD SAVED DATA
// ============================================================

let transactions =
    loadTransactions();


let budgets =
    loadBudgets();


// ============================================================
// MAKE SURE TRANSACTIONS HAVE IDs
// ============================================================

transactions =
    transactions.map(
        function (transaction) {

            if (!transaction.id) {

                transaction.id =
                    Date.now() +
                    Math.random();

            }

            return transaction;

        }
    );


saveTransactions(
    transactions
);


// ============================================================
// EDITING STATE
// ============================================================

let editingTransactionId =
    null;


// ============================================================
// GET HTML ELEMENTS
// ============================================================


// ------------------------------------------------------------
// TRANSACTION FORM
// ------------------------------------------------------------

const transactionForm =
    document.getElementById(
        "transactionForm"
    );


const descriptionInput =
    document.getElementById(
        "description"
    );


const amountInput =
    document.getElementById(
        "amount"
    );


const typeInput =
    document.getElementById(
        "type"
    );


const categoryInput =
    document.getElementById(
        "category"
    );


const dateInput =
    document.getElementById(
        "date"
    );


const submitButton =
    document.getElementById(
        "submitButton"
    );


const cancelButton =
    document.getElementById(
        "cancelButton"
    );


const formTitle =
    document.getElementById(
        "formTitle"
    );


// ------------------------------------------------------------
// SPENT / RECEIVED
// ------------------------------------------------------------

const expenseTypeButton =
    document.getElementById(
        "expenseTypeButton"
    );


const incomeTypeButton =
    document.getElementById(
        "incomeTypeButton"
    );


// ------------------------------------------------------------
// CATEGORY PICKER
// ------------------------------------------------------------

const categoryPicker =
    document.getElementById(
        "categoryPicker"
    );


// ------------------------------------------------------------
// SEARCH / FILTERS
// ------------------------------------------------------------

const searchInput =
    document.getElementById(
        "searchInput"
    );


const typeFilter =
    document.getElementById(
        "typeFilter"
    );


const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


const sortFilter =
    document.getElementById(
        "sortFilter"
    );


// ------------------------------------------------------------
// MONTH
// ------------------------------------------------------------

const monthFilter =
    document.getElementById(
        "monthFilter"
    );


// ------------------------------------------------------------
// BUDGET
// ------------------------------------------------------------

const budgetAmountInput =
    document.getElementById(
        "budgetAmount"
    );


const saveBudgetButton =
    document.getElementById(
        "saveBudgetButton"
    );


const budgetTotal =
    document.getElementById(
        "budgetTotal"
    );


const budgetSpent =
    document.getElementById(
        "budgetSpent"
    );


const budgetRemaining =
    document.getElementById(
        "budgetRemaining"
    );


const budgetProgressBar =
    document.getElementById(
        "budgetProgressBar"
    );


const budgetMessage =
    document.getElementById(
        "budgetMessage"
    );


// ------------------------------------------------------------
// DATA MANAGEMENT
// ------------------------------------------------------------

const exportButton =
    document.getElementById(
        "exportButton"
    );


const importButton =
    document.getElementById(
        "importButton"
    );


const importFile =
    document.getElementById(
        "importFile"
    );


// ============================================================
// BUTTON FEEDBACK
// ============================================================

function buttonFeedback(button) {

    if (!button) {

        return;

    }


    button.classList.add(
        "button-clicked"
    );


    setTimeout(
        function () {

            button.classList.remove(
                "button-clicked"
            );

        },
        250
    );

}


// ============================================================
// CATEGORY PICKER
// ============================================================

function updateCategoryPicker(
    selectedCategory
) {

    if (!categoryPicker) {

        return;

    }


    const categoryOptions =
        categoryPicker.querySelectorAll(
            ".category-option"
        );


    categoryOptions.forEach(
        function (option) {

            option.classList.toggle(

                "active",

                option.dataset.category ===
                selectedCategory

            );

        }
    );

}


// ============================================================
// CATEGORY BUTTON EVENTS
// ============================================================

if (categoryPicker) {

    const categoryOptions =
        categoryPicker.querySelectorAll(
            ".category-option"
        );


    categoryOptions.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {


                    // Get selected category

                    const selectedCategory =
                        button.dataset.category;


                    // Update hidden input

                    categoryInput.value =
                        selectedCategory;


                    // Update visible picker

                    updateCategoryPicker(
                        selectedCategory
                    );


                    // Feedback animation

                    button.classList.add(
                        "category-clicked"
                    );


                    setTimeout(
                        function () {

                            button.classList.remove(
                                "category-clicked"
                            );

                        },
                        250
                    );

                }
            );

        }
    );

}


// ============================================================
// SPENT BUTTON
// ============================================================

expenseTypeButton.addEventListener(
    "click",
    function () {

        buttonFeedback(
            expenseTypeButton
        );


        typeInput.value =
            "expense";


        expenseTypeButton.classList.add(
            "active"
        );


        incomeTypeButton.classList.remove(
            "active"
        );


        // Change wording

        descriptionInput.placeholder =
            "🍔 e.g. Lunch with friends...";

    }
);


// ============================================================
// RECEIVED BUTTON
// ============================================================

incomeTypeButton.addEventListener(
    "click",
    function () {

        buttonFeedback(
            incomeTypeButton
        );


        typeInput.value =
            "income";


        incomeTypeButton.classList.add(
            "active"
        );


        expenseTypeButton.classList.remove(
            "active"
        );


        // Change wording

        descriptionInput.placeholder =
            "💼 e.g. Part-time salary...";

    }
);


// ============================================================
// UPDATE TYPE BUTTONS
// ============================================================

function updateTypeButtons() {

    if (
        typeInput.value ===
        "income"
    ) {

        incomeTypeButton.classList.add(
            "active"
        );

        expenseTypeButton.classList.remove(
            "active"
        );


        descriptionInput.placeholder =
            "💼 e.g. Part-time salary...";

    }

    else {

        expenseTypeButton.classList.add(
            "active"
        );

        incomeTypeButton.classList.remove(
            "active"
        );


        descriptionInput.placeholder =
            "🍔 e.g. Lunch with friends...";

    }

}


// ============================================================
// UPDATE TRANSACTION DISPLAY
// ============================================================

function updateTransactionDisplay() {

    const filteredTransactions =
        getFilteredTransactions(

            transactions,

            searchInput.value,

            typeFilter.value,

            categoryFilter.value,

            sortFilter.value

        );


    displayTransactions(
        filteredTransactions
    );

}


// ============================================================
// UPDATE MONTHLY DASHBOARD
// ============================================================

function updateMonthlyDashboard() {

    const selectedMonth =
        monthFilter.value;


    if (!selectedMonth) {

        return;

    }


    const monthlyTransactions =
        getMonthlyTransactions(

            transactions,

            selectedMonth

        );


    // Update totals

    calculateTotals(
        monthlyTransactions
    );


    // Update category analytics

    calculateCategorySpending(
        monthlyTransactions
    );


    // Update insights

    const currentBudget =
        getMonthlyBudget(

            budgets,

            selectedMonth

        );


    generateSpendingInsights(

        monthlyTransactions,

        currentBudget

    );


    // Monthly comparison

    const comparison =
        calculateMonthlyComparison(

            transactions,

            selectedMonth

        );


    displayMonthlyComparison(
        comparison
    );

}


// ============================================================
// CREATE MONTH SELECTOR
// ============================================================

function updateMonthSelector() {

    monthFilter.innerHTML =
        "";


    const months = [

        ...new Set(

            transactions.map(
                function (transaction) {

                    return transaction.date.substring(
                        0,
                        7
                    );

                }
            )

        )

    ];


    // If there are no transactions,
    // show the current month

    if (
        months.length === 0
    ) {

        const currentMonth =
            new Date()
                .toISOString()
                .substring(
                    0,
                    7
                );


        months.push(
            currentMonth
        );

    }


    // Newest first

    months.sort(
        function (a, b) {

            return b.localeCompare(a);

        }
    );


    // Create options

    months.forEach(
        function (month) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                month;


            const date =
                new Date(
                    month +
                    "-01T00:00:00"
                );


            option.textContent =
                date.toLocaleDateString(
                    "en-IN",
                    {
                        month:
                            "long",

                        year:
                            "numeric"
                    }
                );


            monthFilter.appendChild(
                option
            );

        }
    );


    // Prefer current month

    const currentMonth =
        new Date()
            .toISOString()
            .substring(
                0,
                7
            );


    if (
        months.includes(
            currentMonth
        )
    ) {

        monthFilter.value =
            currentMonth;

    }

    else {

        monthFilter.value =
            months[0];

    }

}


// ============================================================
// UPDATE BUDGET DISPLAY
// ============================================================

function updateBudgetDisplay() {

    const selectedMonth =
        monthFilter.value;


    if (!selectedMonth) {

        return;

    }


    const budget =
        getMonthlyBudget(

            budgets,

            selectedMonth

        );


    const monthlyTransactions =
        getMonthlyTransactions(

            transactions,

            selectedMonth

        );


    let expenses =
        0;


    monthlyTransactions.forEach(
        function (transaction) {

            if (
                transaction.type ===
                "expense"
            ) {

                expenses +=
                    Number(
                        transaction.amount
                    );

            }

        }
    );


    const status =
        calculateBudgetStatus(

            budget,

            expenses

        );


    budgetTotal.textContent =
        `₹${status.budget.toLocaleString(
            "en-IN"
        )}`;


    budgetSpent.textContent =
        `₹${status.expenses.toLocaleString(
            "en-IN"
        )}`;


    budgetRemaining.textContent =
        `₹${Math.abs(
            status.remaining
        ).toLocaleString(
            "en-IN"
        )}`;


    let progress =
        status.percentage;


    if (
        progress > 100
    ) {

        progress =
            100;

    }


    if (
        progress < 0
    ) {

        progress =
            0;

    }


    budgetProgressBar.style.width =
        `${progress}%`;


    // Friendly message

    if (
        budget === 0
    ) {

        budgetMessage.textContent =
            "🌱 Set a budget and we'll help you keep an eye on it.";

    }

    else if (
        status.remaining < 0
    ) {

        budgetMessage.textContent =
            `🍂 You've gone ₹${Math.abs(
                status.remaining
            ).toLocaleString(
                "en-IN"
            )} over your budget.`;

    }

    else {

        budgetMessage.textContent =
            `🌿 You still have ₹${status.remaining.toLocaleString(
                "en-IN"
            )} left to spend.`;

    }

}


// ============================================================
// ADD / EDIT TRANSACTION
// ============================================================

transactionForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // ----------------------------------------------------
        // GET VALUES
        // ----------------------------------------------------

        const description =
            descriptionInput.value.trim();


        const amount =
            Number(
                amountInput.value
            );


        const type =
            typeInput.value;


        const category =
            categoryInput.value;


        const date =
            dateInput.value;


        // ----------------------------------------------------
        // VALIDATE DESCRIPTION
        // ----------------------------------------------------

        if (
            description === ""
        ) {

            showNotification(
                "Please tell us what this was for.",
                "warning"
            );


            descriptionInput.focus();


            return;

        }


        // ----------------------------------------------------
        // VALIDATE AMOUNT
        // ----------------------------------------------------

        if (
            isNaN(amount) ||
            amount <= 0
        ) {

            showNotification(
                "Please enter a valid amount.",
                "warning"
            );


            amountInput.focus();


            return;

        }


        // ----------------------------------------------------
        // VALIDATE DATE
        // ----------------------------------------------------

        if (
            date === ""
        ) {

            showNotification(
                "Please select a date.",
                "warning"
            );


            dateInput.focus();


            return;

        }


        // ----------------------------------------------------
        // EDIT EXISTING TRANSACTION
        // ----------------------------------------------------

        if (
            editingTransactionId !== null
        ) {

            const transaction =
                transactions.find(
                    function (transaction) {

                        return (
                            transaction.id ===
                            editingTransactionId
                        );

                    }
                );


            if (transaction) {

                transaction.description =
                    description;


                transaction.amount =
                    amount;


                transaction.type =
                    type;


                transaction.category =
                    category;


                transaction.date =
                    date;

            }


            saveTransactions(
                transactions
            );


            showNotification(
                "🌿 Entry updated successfully."
            );

        }


        // ----------------------------------------------------
        // ADD NEW TRANSACTION
        // ----------------------------------------------------

        else {

            const transaction = {

                id:
                    Date.now() +
                    Math.random(),

                description:
                    description,

                amount:
                    amount,

                type:
                    type,

                category:
                    category,

                date:
                    date

            };


            transactions.push(
                transaction
            );


            saveTransactions(
                transactions
            );


            if (
                type ===
                "expense"
            ) {

                showNotification(
                    `🍂 ₹${amount.toLocaleString(
                        "en-IN"
                    )} spent on ${description}.`
                );

            }

            else {

                showNotification(
                    `🌿 ₹${amount.toLocaleString(
                        "en-IN"
                    )} received for ${description}.`
                );

            }

        }


        // ----------------------------------------------------
        // FORM SUCCESS ANIMATION
        // ----------------------------------------------------

        transactionForm.classList.remove(
            "form-success"
        );


        void transactionForm.offsetWidth;


        transactionForm.classList.add(
            "form-success"
        );


        // ----------------------------------------------------
        // UPDATE MONTH
        // ----------------------------------------------------

        updateMonthSelector();


        monthFilter.value =
            date.substring(
                0,
                7
            );


        // ----------------------------------------------------
        // UPDATE EVERYTHING
        // ----------------------------------------------------

        updateTransactionDisplay();

        updateMonthlyDashboard();

        updateBudgetDisplay();


        // ----------------------------------------------------
        // RESET FORM
        // ----------------------------------------------------

        transactionForm.reset();


        editingTransactionId =
            null;


        formTitle.textContent =
            "New Entry";


        submitButton.textContent =
            "🌿 Add to my ledger";


        cancelButton.style.display =
            "none";


        // Reset type

        typeInput.value =
            "expense";


        updateTypeButtons();


        // Reset category

        categoryInput.value =
            "food";


        updateCategoryPicker(
            "food"
        );


        // Reset date

        setTodayDate();

    }
);


// ============================================================
// DELETE TRANSACTION
// ============================================================

function deleteTransaction(id) {

    const transaction =
        transactions.find(
            function (transaction) {

                return (
                    transaction.id ===
                    id
                );

            }
        );


    if (!transaction) {

        return;

    }


    showConfirmation(

        "Delete this entry?",

        `"${transaction.description}" — ₹${Number(
            transaction.amount
        ).toLocaleString(
            "en-IN"
        )}`,

        function () {


            transactions =
                transactions.filter(
                    function (transaction) {

                        return (
                            transaction.id !==
                            id
                        );

                    }
                );


            saveTransactions(
                transactions
            );


            updateMonthSelector();

            updateTransactionDisplay();

            updateMonthlyDashboard();

            updateBudgetDisplay();


            showNotification(
                "🗑️ Entry removed from your ledger."
            );

        }

    );

}


// ============================================================
// EDIT TRANSACTION
// ============================================================

function editTransaction(id) {

    const transaction =
        transactions.find(
            function (transaction) {

                return (
                    transaction.id ===
                    id
                );

            }
        );


    if (!transaction) {

        return;

    }


    // --------------------------------------------------------
    // LOAD VALUES
    // --------------------------------------------------------

    descriptionInput.value =
        transaction.description;


    amountInput.value =
        transaction.amount;


    typeInput.value =
        transaction.type;


    categoryInput.value =
        transaction.category;


    dateInput.value =
        transaction.date;


    // --------------------------------------------------------
    // UPDATE TYPE
    // --------------------------------------------------------

    updateTypeButtons();


    // --------------------------------------------------------
    // UPDATE CATEGORY
    // --------------------------------------------------------

    updateCategoryPicker(
        transaction.category
    );


    // --------------------------------------------------------
    // REMEMBER EDIT
    // --------------------------------------------------------

    editingTransactionId =
        id;


    // --------------------------------------------------------
    // UPDATE FORM
    // --------------------------------------------------------

    formTitle.textContent =
        "📖 Edit Entry";


    submitButton.textContent =
        "🌿 Update ledger";


    cancelButton.style.display =
        "block";


    transactionForm.classList.add(
        "editing-mode"
    );


    // --------------------------------------------------------
    // SCROLL TO FORM
    // --------------------------------------------------------

    transactionForm.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });


    setTimeout(
        function () {

            descriptionInput.focus();

        },
        500
    );

}


// ============================================================
// CANCEL EDIT
// ============================================================

cancelButton.addEventListener(
    "click",
    function () {

        cancelEdit();

    }
);


function cancelEdit() {

    editingTransactionId =
        null;


    formTitle.textContent =
        "New Entry";


    submitButton.textContent =
        "🌿 Add to my ledger";


    cancelButton.style.display =
        "none";


    transactionForm.classList.remove(
        "editing-mode"
    );


    transactionForm.reset();


    // Reset type

    typeInput.value =
        "expense";


    updateTypeButtons();


    // Reset category

    categoryInput.value =
        "food";


    updateCategoryPicker(
        "food"
    );


    // Reset date

    setTodayDate();

}


// ============================================================
// SAVE MONTHLY BUDGET
// ============================================================

saveBudgetButton.addEventListener(
    "click",
    function () {

        const amount =
            Number(
                budgetAmountInput.value
            );


        const selectedMonth =
            monthFilter.value;


        if (
            isNaN(amount) ||
            amount <= 0
        ) {

            showNotification(
                "Please enter a valid budget amount.",
                "warning"
            );


            budgetAmountInput.focus();


            return;

        }


        setMonthlyBudget(

            budgets,

            selectedMonth,

            amount

        );


        updateBudgetDisplay();

        updateMonthlyDashboard();


        budgetAmountInput.value =
            "";


        showNotification(
            "🌿 Your monthly budget was saved."
        );

    }
);


// ============================================================
// EXPORT DATA
// ============================================================

exportButton.addEventListener(
    "click",
    function () {

        buttonFeedback(
            exportButton
        );


        exportData();


        showNotification(
            "📦 Your backup was exported successfully."
        );

    }
);


// ============================================================
// IMPORT BUTTON
// ============================================================

importButton.addEventListener(
    "click",
    function () {

        buttonFeedback(
            importButton
        );


        importFile.click();

    }
);


// ============================================================
// IMPORT DATA
// ============================================================

importFile.addEventListener(
    "change",
    async function () {

        const file =
            importFile.files[0];


        if (!file) {

            return;

        }


        try {

            const importedData =
                await importData(
                    file
                );


            showConfirmation(

                "Restore this backup?",

                "This will replace your current transactions and budgets with the backup.",

                function () {


                    transactions =
                        importedData.transactions;


                    budgets =
                        importedData.budgets;


                    // Make sure IDs exist

                    transactions =
                        transactions.map(
                            function (transaction) {

                                if (
                                    !transaction.id
                                ) {

                                    transaction.id =
                                        Date.now() +
                                        Math.random();

                                }


                                return transaction;

                            }
                        );


                    saveTransactions(
                        transactions
                    );


                    saveBudgets(
                        budgets
                    );


                    // Update application

                    updateMonthSelector();

                    updateTransactionDisplay();

                    updateMonthlyDashboard();

                    updateBudgetDisplay();


                    importFile.value =
                        "";


                    showNotification(
                        "🌿 Your backup was restored successfully."
                    );

                }

            );

        }

        catch (error) {

            console.error(
                "Import error:",
                error
            );


            showNotification(

                "Could not restore this file. Please choose a valid Expense Tracker backup.",

                "error"

            );


            importFile.value =
                "";

        }

    }
);


// ============================================================
// SEARCH
// ============================================================

searchInput.addEventListener(
    "input",
    updateTransactionDisplay
);


// ============================================================
// TYPE FILTER
// ============================================================

typeFilter.addEventListener(
    "change",
    updateTransactionDisplay
);


// ============================================================
// CATEGORY FILTER
// ============================================================

categoryFilter.addEventListener(
    "change",
    updateTransactionDisplay
);


// ============================================================
// SORT FILTER
// ============================================================

sortFilter.addEventListener(
    "change",
    updateTransactionDisplay
);


// ============================================================
// MONTH FILTER
// ============================================================

monthFilter.addEventListener(
    "change",
    function () {

        updateMonthlyDashboard();

        updateBudgetDisplay();

        updateTransactionDisplay();

    }
);


// ============================================================
// SET TODAY'S DATE
// ============================================================

function setTodayDate() {

    if (!dateInput) {

        return;

    }


    const today =
        new Date()
            .toISOString()
            .split(
                "T"
            )[0];


    dateInput.value =
        today;

}


// ============================================================
// START APPLICATION
// ============================================================

setTodayDate();


updateMonthSelector();


updateTransactionDisplay();


updateMonthlyDashboard();


updateBudgetDisplay();


updateTypeButtons();


updateCategoryPicker(
    categoryInput.value
);


// Hide cancel button

cancelButton.style.display =
    "none";