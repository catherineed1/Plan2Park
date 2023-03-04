jQuery(function () {
    $('#car-register').hide();
    $('#car-join').hide();

    $('#registerCar').on('click', function () {
        $('#car-register').toggle();
        $('#car-join').hide();
    });

    $('#joinCar').on('click', function () {
        $('#car-join').toggle();
        $('#car-register').hide();

        $.ajax({
            method: 'get',
            url: '/getCarPool',
            dataType: 'html',
            success: function (response) {
                console.log(response);
                $("#car-join").html(response); 
            }
        });
    });

    $('#car-pooling-register').on('click', function () {
        const formData = {
            pickupLoc: $("#chooseLocation").val(),
            vehicle: $("#chooseVehicle").val(),
            noOfPassenegers: $("#inputPassenegers").val(),
            dateOut: $("#DateTimeOut").val(),
            dateIn: $("#DateTimeReturn").val(),
        };
        console.log(formData);

       $.ajax({
            data: formData,
            method: 'post',
            url: '/addCarPool',
            dataType: 'json',
            success: function (response) {
                if (response.msg == 'success') {
                    console.log('car added successfully');
                } else {
                    alert('some error occurred try again');
                }
                $('#car-pooling-register-form')[0].reset();
            },
            error: function (response) {
                console.log(response);
                alert('server error occured')
                $('#car-pooling-register-form')[0].reset();
            }
        });
        $('#car-register').hide();
    });
});