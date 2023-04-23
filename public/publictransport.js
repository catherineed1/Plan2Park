jQuery(function () {
$('#logoutBtn').on('click', function () {
    $.ajax({
         method: 'get',
         url: '/logout',
         success: function (response) {
             $(location).attr('href','/login');
         },
         error: function (response) {
             console.log('server error occured ', response);
         }
     });
 });
});