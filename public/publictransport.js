jQuery(function () {
$('#logoutBtn').on('click', function () {
    $.ajax({
         method: 'get',
         url: '/logout',
         success: function (response) {
             $(location).attr('href','/login');
         },
         error: function (response) {
            $(location).attr('href', '/login');
            console.log('server error occurred ', response);
        }
     });
 });
});