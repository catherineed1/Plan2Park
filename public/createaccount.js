jQuery(function () {
    $('#submitAccount').on('click', function () {
        const userData = {
            username: $("#inputEmail").val(),
            password: $("#inputPassword").val(),
            fullName: $("#inputName").val(),
            line1: $("#inputAddress").val(),
            line2: $("#inputAddress2").val(),
            town: $("#inputTown").val(),
            postcode: $("#inputPostcode").val(),
            nickname: $("#inputNameCar").val(),
            registration: $("#inputCarReg").val()
        };
        console.log(userData);
       $.ajax({
            data: userData,
            method: 'post',
            url: '/createAccount',
            dataType: 'json',
            success: function (response) {
                console.log('user added successfully');
                $('#account-form')[0].reset();
            },
            error: function (response) {
                console.log('server error occured ', response);
                $('#account-form')[0].reset();
            }
        });
    });
});