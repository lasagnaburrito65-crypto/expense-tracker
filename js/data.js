// ========================================
// DATA EXPORT & IMPORT
// ========================================


// ========================================
// EXPORT DATA
// ========================================

function exportData() {

    // Create the backup object

    const backupData = {

        transactions: transactions,

        budgets: budgets,

        exportedAt:
            new Date().toISOString()

    };


    // Convert the object into JSON

    const jsonData =
        JSON.stringify(
            backupData,
            null,
            4
        );


    // Create a file

    const file =
        new Blob(
            [jsonData],
            {
                type: "application/json"
            }
        );


    // Create a temporary URL
    // for the file

    const url =
        URL.createObjectURL(file);


    // Create a temporary download link

    const link =
        document.createElement("a");


    link.href = url;


    link.download =
        "expense-tracker-backup.json";


    // Start download

    link.click();


    // Remove temporary URL

    URL.revokeObjectURL(url);

}


// ========================================
// IMPORT DATA
// ========================================

function importData(file) {

    return new Promise(
        function(resolve, reject) {

            // Create a file reader

            const reader =
                new FileReader();


            // When file is loaded

            reader.onload =
                function(event) {

                    try {

                        // Convert JSON text
                        // back into JavaScript

                        const importedData =
                            JSON.parse(
                                event.target.result
                            );


                        // ====================================
                        // VALIDATE FILE
                        // ====================================

                        if (
                            !importedData ||
                            !Array.isArray(
                                importedData.transactions
                            ) ||
                            typeof importedData.budgets !==
                            "object"
                        ) {

                            throw new Error(
                                "Invalid backup file."
                            );

                        }


                        // Return imported data

                        resolve(
                            importedData
                        );

                    }

                    catch (error) {

                        reject(error);

                    }

                };


            // If reading the file fails

            reader.onerror =
                function() {

                    reject(
                        new Error(
                            "Could not read the file."
                        )
                    );

                };


            // Read file

            reader.readAsText(file);

        }
    );

}