// ========================================
// NOTIFICATIONS
// ========================================


// ========================================
// SHOW NOTIFICATION
// ========================================

function showNotification(
    message,
    type = "success"
) {

    // Get notification container

    const container =
        document.getElementById(
            "notificationContainer"
        );


    // Create notification

    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        `notification ${type}`;


    // Choose icon

    let icon = "✅";


    if (type === "error") {

        icon = "❌";

    }


    if (type === "warning") {

        icon = "⚠️";

    }


    if (type === "info") {

        icon = "ℹ️";

    }


    // Add notification content

    notification.innerHTML = `

        <span class="notification-icon">
            ${icon}
        </span>

        <span class="notification-message">
            ${message}
        </span>

        <button
            class="notification-close"
            type="button"
        >
            ×
        </button>

    `;


    // Add to page

    container.appendChild(
        notification
    );


    // Close button

    const closeButton =
        notification.querySelector(
            ".notification-close"
        );


    closeButton.addEventListener(
        "click",
        function() {

            removeNotification(
                notification
            );

        }
    );


    // Automatically remove

    setTimeout(
        function() {

            removeNotification(
                notification
            );

        },
        3000
    );

}


// ========================================
// REMOVE NOTIFICATION
// ========================================

function removeNotification(
    notification
) {

    notification.classList.add(
        "hide"
    );


    setTimeout(
        function() {

            if (
                notification.parentElement
            ) {

                notification.remove();

            }

        },
        300
    );

}
