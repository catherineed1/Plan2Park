jQuery(function () {
    $('#loginBtn').on('click', function () {
        const loginData = {
            username: $("#email").val(),
            password: $("#password").val()
        };
        console.log(loginData);
       $.ajax({
            data: loginData,
            method: 'post',
            url: '/findUser',
            dataType: 'json',
            success: function (response) {
                console.log(response);
                $(location).attr('href','/home');
            },
            error: function (response) {
                alert('Invalid Details');
                console.log('server error occured ', response);
            }
        });
    });
});