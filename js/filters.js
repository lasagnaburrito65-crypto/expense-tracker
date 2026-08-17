// ========================================
// FILTERS & SORTING
// ========================================


// Filter and sort transactions
function getFilteredTransactions(
    transactions,
    searchText,
    selectedType,
    selectedCategory,
    selectedSort
) {


    // Convert search text to lowercase
    searchText =
        searchText.toLowerCase().trim();


    // ====================================
    // FILTER
    // ====================================

    let filteredTransactions =
        transactions.filter(function(transaction) {


            // Search filter
            const matchesSearch =
                transaction.description
                    .toLowerCase()
                    .includes(searchText);


            // Type filter
            const matchesType =
                selectedType === "all"
                ||
                transaction.type === selectedType;


            // Category filter
            const matchesCategory =
                selectedCategory === "all"
                ||
                transaction.category === selectedCategory;


            // Keep transaction only if
            // all conditions are true
            return (
                matchesSearch
                &&
                matchesType
                &&
                matchesCategory
            );

        });


    // ====================================
    // SORT
    // ====================================


    // Newest first
    if (selectedSort === "newest") {

        filteredTransactions.sort(
            function(a, b) {

                return new Date(b.date)
                    - new Date(a.date);

            }
        );

    }


    // Oldest first
    else if (selectedSort === "oldest") {

        filteredTransactions.sort(
            function(a, b) {

                return new Date(a.date)
                    - new Date(b.date);

            }
        );

    }


    // Highest amount
    else if (selectedSort === "highest") {

        filteredTransactions.sort(
            function(a, b) {

                return b.amount - a.amount;

            }
        );

    }


    // Lowest amount
    else if (selectedSort === "lowest") {

        filteredTransactions.sort(
            function(a, b) {

                return a.amount - b.amount;

            }
        );

    }


    // Give the filtered list back
    return filteredTransactions;

}