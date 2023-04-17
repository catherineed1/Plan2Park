jQuery(function () {

    $('#carpool').hide();


    $('#carpool-check').on('click', function () {
        if( $('#carpool-check').is(':checked') ){
            $('#carpool').show();
        }
        else{
            $('#carpool').hide();
        }

    });
    
    $('rect').on('click', function () {
        var space_num = $(this).attr('id');
        $('#spaceNo').html(space_num);
    });

    $('#car-register-submit').on('click', function () {
        const formData = {
            spaceID: $("#spaceNo").html(),
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
                alert('Booking successful');
                $('#car-register-form')[0].reset();
            },
            error: function (response) {
                alert('Incorrect Details ', response);
                $('#car-register-form')[0].reset();
            }
        });
    });
});