jQuery(function () {

    $('#car-pooling-register').on('click', function () {
        console.log('here');
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
                    console.log('task added successfully');
                } else {
                    alert('some error occurred try again');
                }
            },
            error: function (response) {
                console.log(response);
                alert('server error occured')
            }
        });
    });
});