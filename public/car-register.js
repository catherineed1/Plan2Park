jQuery(function () {
    $('#car-register').hide();
    $('#car-join').hide();

    $('#registerCar').on('click', function () {
        $('#car-register').toggle();
        $('#car-join').hide();
    });


    $('#joinCar').on('click', function () {
        $('#car-register').hide();
        $('#car-join').toggle(function(){
            if($('#car-join').hasClass('new card text-center')){
                $('#car-join').attr('class', 'card text-center');
                $('#car-join').empty();
            }
            else if($( '#car-join' ).hasClass('card text-center')){
                $.ajax({
                    method: 'get',
                    url: '/getCarPool',
                    dataType: 'html',
                    success: function (response) {
                        var json = JSON.parse(response);
                        var count = json.data;
        
                        $('#car-join').append('<table> <tr><th>Location:</th><th>Vehicle:</th><th>Passengers:</th><th>Date In:</th><th>Date Out:</th></tr>');
                        $.each(count, function(index, value){
                            console.log(value);
                            console.log(json.data[index].pickupLoc);
                            $('#car-join').append('<tr><td>', json.data[index].pickupLoc, '</td><td>', json.data[index].vehicle, '</td><td>', json.data[index].noOfPassenegers, '</td><td>', json.data[index].dateIn, '</td><td>', json.data[index].dateOut,'</td></tr></table>');
                        });
                    }
                });
                $('#car-join').attr('class', 'new card text-center');
            }
        });
        
    });

    $('#car-register-submit').on('click', function () {
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
                $('#car-register-form')[0].reset();
            },
            error: function (response) {
                console.log(response);
                alert('server error occured')
                $('#car-register-form')[0].reset();
            }
        });
        $('#car-register').hide();
    });
});