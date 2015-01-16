/* jQuery function */
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

    drawChart();
});

/* Redraw chart using jquery-smartresize on resize */
$(window).bind("debouncedresize", function() {
    window.m.redraw();
});

/* Function to draw chart */
function drawChart() {
    window.m = Morris.Area({
        element: 'order-chart',
        data: [
            { y: '2015-01-10', a: 0 },
            { y: '2015-01-11', a: 0 },
            { y: '2015-01-12', a: 15 },
            { y: '2015-01-13', a: 21 },
            { y: '2015-01-14', a: 14 },
            { y: '2015-01-15', a: 9 },
            { y: '2015-01-16', a: 6 }
        ],
        xkey: 'y',
        ykeys: ['a'],
        labels: ['Bestellungen'],
        xLabelFormat: function(d) {
            return d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear();
        },
        dateFormat: function(date) {
            d = new Date(date);
            return d.getDate()+'.'+(d.getMonth()+1)+'.'+d.getFullYear();
        },
    });
}
