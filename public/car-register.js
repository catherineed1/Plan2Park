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
                        $('#car-join').append('<table class="table table-hover" id="joinTable">\
                        <thead>\
                          <tr>\
                            <th scope="col">Location</th>\
                            <th scope="col">Vehicle</th>\
                            <th scope="col">Passenger</th>\
                            <th scope="col">Date In</th>\
                            <th scope="col">Date Out</th>\
                            <th scope="col"></th>\
                          </tr>\
                        </thead>\
                        <tbody>\
                        </tbody>\
                      </table>');
                        $.each(count, function(index, value){
                            console.log(value);
                            var location = json.data[index].pickupLoc;
                            var vehicle = json.data[index].vehicle;
                            var passengers = json.data[index].noOfPassenegers;
                            var dateIn = json.data[index].dateIn;
                            var dateOut = json.data[index].dateOut;
                            $('tbody').append('<tr><td scope="row">'+location +'</td>\
                            <td>'+vehicle+'</td>\
                            <td>'+passengers+'</td>\
                            <td>'+dateIn+'</td>\
                            <td>'+dateOut+'</td>\
                            <td><button id="joinBtn" type="button" class="btn btn-primary">Join</button>\
                            </td></tr>');
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
                console.log('car added successfully');
                $('#car-register-form')[0].reset();
            },
            error: function (response) {
                console.log('server error occured ', response);
                $('#car-register-form')[0].reset();
            }
        });
        $('#car-register').hide();
    });
});