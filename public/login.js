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
                if(loginData.username == 'admin@email.com'){
                    console.log(response);
                    $(location).attr('href','/admin');
                }
                else{
                    console.log(response);
                    $(location).attr('href','/home');
                }  
            },
            error: function (response) {
                alert('Invalid Details');
                console.log('server error occured ', response);
            }
        });
    });
});