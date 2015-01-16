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

    $('#bootstrap-datepicker').datepicker({
        "todayHighlight": true,
        "endDate": 'now'
    }).datepicker('update', 'now');

    $('#bootstrap-datepicker').datepicker('update', 'now');
});

