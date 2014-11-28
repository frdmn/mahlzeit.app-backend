$(function() {
    /* Sidebar toggle */

    $("#menu-toggle").click(function(e) {
        // Prevent stadard <button> behaviour
        e.preventDefault();
        // Toggle "active" class
        $("#wrapper").toggleClass("active");
        // Write log
        log.info('[INFO] Sidebar toggled');
    });
});

