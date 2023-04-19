jQuery(function () {
    $('#loginBtn').on('click', function () {
        const loginData = {
            username: $("#email").val(),
            password: $("#password").val()
        };
        console.log(loginData);
       $.ajax({
            data: loginData,
            method: 'get',
            url: '/findUser',
            dataType: 'json',
            success: function (response) {
                console.log(response);
            },
            error: function (response) {
                alert('Invalid Details');
                console.log('server error occured ', response);
            }
        });
    });
});