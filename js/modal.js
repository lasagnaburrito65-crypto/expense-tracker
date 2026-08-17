// ========================================
// CUSTOM CONFIRMATION MODAL
// ========================================


// ========================================
// GET MODAL ELEMENTS
// ========================================

const confirmationModal =
    document.getElementById(
        "confirmationModal"
    );


const modalTitle =
    document.getElementById(
        "confirmationTitle"
    );


const modalMessage =
    document.getElementById(
        "confirmationMessage"
    );


const modalCancelButton =
    document.getElementById(
        "modalCancelButton"
    );


const modalConfirmButton =
    document.getElementById(
        "modalConfirmButton"
    );


// ========================================
// STORE THE ACTION
// ========================================

let confirmAction = null;


// ========================================
// SHOW CONFIRMATION
// ========================================

function showConfirmation(
    title,
    message,
    action
) {

    // Put text into modal

    modalTitle.textContent =
        title;


    modalMessage.textContent =
        message;


    // Remember what should happen
    // if user clicks Confirm

    confirmAction =
        action;


    // Show modal

    confirmationModal.classList.add(
        "show"
    );

}


// ========================================
// CLOSE MODAL
// ========================================

function closeConfirmation() {

    confirmationModal.classList.remove(
        "show"
    );


    confirmAction =
        null;

}


// ========================================
// CANCEL BUTTON
// ========================================

modalCancelButton.addEventListener(
    "click",
    function() {

        closeConfirmation();

    }
);


// ========================================
// CONFIRM BUTTON
// ========================================

modalConfirmButton.addEventListener(
    "click",
    function() {

        if (confirmAction) {

            confirmAction();

        }


        closeConfirmation();

    }
);


// ========================================
// CLICK OUTSIDE MODAL
// ========================================

confirmationModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            confirmationModal
        ) {

            closeConfirmation();

        }

    }
);


// ========================================
// ESCAPE KEY
// ========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeConfirmation();

        }

    }
);