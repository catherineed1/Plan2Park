jQuery(function () {
    $('#createAccountBtn').on('click', function () {
        const userData = {
            fullName: $("#fullname").val(),
            username: $("#email").val(),
            password: $("#password").val()
        };
        console.log(userData);
       $.ajax({
            data: userData,
            method: 'post',
            url: '/createAccount',
            dataType: 'json',
            success: function (response) {
                console.log('user added successfully');
                $(location).attr('href','/login');
            },
            error: function (response) {
                $(location).attr('href','/login');
                console.log('server error occured ', response);
            }
        });
    });
});