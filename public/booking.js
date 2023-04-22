jQuery(function () {
    var userID;

    $('#carpool').hide();

    $.ajax({
        method: 'get',
        url: '/getUser',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: function (response) {
            userID = response.data._id;
            var fullname = response.data.fullName;
            // $('#currentUser').html(fullname);
        }
    });

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
            userID: userID,
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
            url: '/addCarBooking',
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