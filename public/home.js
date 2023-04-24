jQuery(function () {
    $.ajax({
        method: 'get',
        url: '/getUser',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: function (response) {
            userID = response.data._id;
            var fullname = response.data.fullName;
            $('#welcome').html(fullname);
        }
    });

    $('#poolBtn').on('click', function () {
        if ($('#car-join').hasClass('new card text-center')) {
            $('#car-join').attr('class', 'card text-center');
            $('#car-join').empty();
        }

        else if ($('#car-join').hasClass('card text-center')) {
            $.ajax({
                method: 'get',
                url: '/getCarBookings',
                dataType: 'html',
                success: function (response) {
                    var json = JSON.parse(response);
                    var count = json.data;
                    $('#car-join').append('<table class="table table-hover" id="joinTable">\
                        <thead>\
                          <tr>\
                            <th scope="col">Driver</th>\
                            <th scope="col">Pickup Location</th>\
                            <th scope="col">Vehicle</th>\
                            <th scope="col">Total Spaces</th>\
                            <th scope="col">Spaces filled</th>\
                            <th scope="col">Date In</th>\
                            <th scope="col">Date Out</th>\
                            <th scope="col"></th>\
                          </tr>\
                        </thead>\
                        <tbody>\
                        </tbody>\
                      </table>');
                    $.each(count, function (index, value) {
                        console.log(value);
                        var driverID = json.data[index].userID;
                        var carPoolID = json.data[index]._id;
                        console.log(carPoolID);
                        var location = json.data[index].pickupLoc;
                        var vehicle = json.data[index].vehicle;
                        var passengers = json.data[index].noOfPassenegers;
                        var dateIn = json.data[index].dateIn;
                        var dateOut = json.data[index].dateOut;
                        $.ajax({
                            data: { driverID: driverID },
                            method: 'get',
                            url: '/getDriver',
                            dataType: 'json',
                            xhrFields: { withCredentials: true },
                            success: function (response) {
                                var driver = response.data.fullName;
                                $.ajax({
                                    data: { bookingID: carPoolID },
                                    method: 'get',
                                    url: '/countCarPoolBookings',
                                    dataType: 'json',
                                    success: function (response) {
                                        console.log(response);
                                        if (response.data == passengers){
                                            $('tbody').append('<tr><td scope="row">' + driver + '</td>\
                                            <td>'+ location + '</td>\
                                            <td>'+ vehicle + '</td>\
                                            <td>'+ passengers + '</td>\
                                            <td>'+ response.data + '</td>\
                                            <td>'+ dateIn.substring(0, 10) + '</td>\
                                            <td>'+ dateOut.substring(0, 10) + '</td>\
                                            <td><button type="button" class="btn btn-secondary" disabled>Join</button>\
                                            </td></tr>');
                                        }else{

                                            $('tbody').append('<tr><td scope="row">' + driver + '</td>\
                                            <td>'+ location + '</td>\
                                            <td>'+ vehicle + '</td>\
                                            <td>'+ passengers + '</td>\
                                            <td>'+ response.data + '</td>\
                                            <td>'+ dateIn.substring(0, 10) + '</td>\
                                            <td>'+ dateOut.substring(0, 10) + '</td>\
                                            <td><button id="joinBtn" type="button" class="btn btn-primary" data-mycarpoolID='+ carPoolID + '>Join</button>\
                                            </td></tr>');
                                            $("#joinBtn[data-mycarpoolID='"+carPoolID+"']").on('click', function () {
                                                var CID = $('#joinBtn').attr('data-mycarpoolID');
                                                $.ajax({
                                                    data: { userID: userID, bookingID: CID },
                                                    method: 'post',
                                                    url: '/addCarPool',
                                                    dataType: 'json',
                                                    success: function (response) {
                                                        console.log(response);
                                                        alert('you joined this carpool!');
                                                        $("#joinBtn[data-mycarpoolID='"+carPoolID+"']").prop('disabled', true);
                                                        window.location.reload();
                                                    },
                                                    error: function (response) {
                                                        console.log('server error occured ', response);
                                                    }
                                                });
                                            
                                            });
                                        }
                                        
                                    }
                                });
                               
                            }
                        });
                    });
                }

            });
            $('#car-join').attr('class', 'new card text-center');

        }
    });

    $('#logoutBtn').on('click', function () {
        $.ajax({
            method: 'get',
            url: '/logout',
            success: function (response) {
                $(location).attr('href', '/login');
            },
            error: function (response) {
                console.log('server error occured ', response);
            }
        });
    });
});