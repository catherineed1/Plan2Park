jQuery(function () {
    $.ajax({
        method: 'get',
        url: '/getReportedIssues',
        dataType: 'json',
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
        }
    });

    $('#logoutBtn').on('click', function () {
        $.ajax({
            method: 'get',
            url: '/logout',
            success: function (response) {
                $(location).attr('href', '/login');
            },
            error: function (response) {
                console.log('server error occured ', response);
            }
        });
    });
});