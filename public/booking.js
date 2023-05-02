jQuery(function () {
    var userID;
    var checked;
    var userEmail;

    $('#carpool').hide();

    $.ajax({
        method: 'get',
        url: '/getUser',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: function (response) {
            userID = response.data._id;
            userEmail = response.data.username;
        }
    });

    $.ajax({
        method: 'get',
        url: '/getCars',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            var count = response.data;
            $.each(count, function (index, value) {
                console.log(value);
                var make = response.data[index].make;
                $('#chooseVehicle').append($('<option></option>').html(make));
            });
        }
     });

    $.ajax({
        method: 'get',
        url: '/getLocations',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            var count = response.data;
            $.each(count, function (index, value) {
                console.log(value);
                var nickname = response.data[index].nickname;
                $('#chooseLocation').append($('<option></option>').html(nickname));
            });
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

        if($('#carpool-check').prop('checked')==true){
            checked = 'yes';
        }
        else{
            checked= 'no';
        }

        const formData = {
            spaceID: $("#spaceNo").html(),
            userID: userID,
            pickupLoc: $("#chooseLocation").val(),
            vehicle: $("#chooseVehicle").val(),
            carpoolYN: checked,
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
                $(location).attr('href','/home');
            }
        });
    });
    
    $('#openBtn').on('click', function () {
        document.getElementById("reportForm").style.display = "block";
    });

    $('#closeBtn').on('click', function () {
        document.getElementById("reportForm").style.display = "none";
    });

    $('#sendIssue').on('click', function () {
        const issueData = {
            spaceNum: $("#spaceNum").val(),
            userEmail: userEmail,
            issue: $("#issueDetails").val()
        };
        $.ajax({
            data: issueData,
            method: 'post',
            url: '/addIssue',
            dataType: 'json',
            success: function (response) {
                document.getElementById("reportForm").style.display = "none";
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
                $(location).attr('href', '/login');
                console.log('server error occurred ', response);
            }
         });
     });
});