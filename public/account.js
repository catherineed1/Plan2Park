jQuery(function () {
    var userID;
    $('#newCar').hide();
    $('#newLoc').hide();

    $(".addnew").hover(function () {
        $(this).css("color", "#298AD8");
    }, function () {
        $(this).css("color", "#4b4b4b");
    });

    $.ajax({
        method: 'get',
        url: '/getUser',
        dataType: 'json',
        xhrFields: { withCredentials: true },
        success: function (response) {
            userID = response.data._id;
            var fullname = response.data.fullName;
            $('#currentUser').html(fullname);
            $.ajax({
                data: { userID: userID },
                method: 'get',
                url: '/countUserCreditsRegister',
                dataType: 'json',
                success: function (response) {
                    console.log(response);
                    var creditsReg = parseInt(response.data);
                    $.ajax({
                        method: 'get',
                        url: '/countUserCreditsJoin',
                        dataType: 'json',
                        success: function (response) {
                            console.log(response);
                            var creditsJoin = parseInt(response.data);
                            var total = creditsReg + creditsJoin;
                            $('#creditValue').html(total);
                        }
                    });
                }
            });
            
        }
    });

    $.ajax({
        method: 'get',
        url: '/getUserBookings',
        dataType: 'html',
        success: function (response) {
            var json = JSON.parse(response);
            var count = json.data;
            $('#parkingBookings').append('<table class="table table-hover" id="bookingTable">\
            <thead>\
              <tr>\
                <th scope="col">Location</th>\
                <th scope="col">Vehicle</th>\
                <th scope="col">Date In</th>\
                <th scope="col">Date Out</th>\
                <th scope="col"></th>\
              </tr>\
              </thead>\
              <tbody id="my-bookings">\
              </tbody>\
            </table>');
            $.each(count, function (index, value) {
                console.log(value);
                var bookingID = json.data[index]._id;
                var location = json.data[index].pickupLoc;
                var vehicle = json.data[index].vehicle;
                var dateIn = json.data[index].dateIn;
                var dateOut = json.data[index].dateOut;
                $('#my-bookings').append('<tr><td scope="row">' + location + '</td>\
                <td>'+ vehicle + '</td>\
                <td>'+ dateIn.substring(0, 10) + '</td>\
                <td>'+ dateOut.substring(0, 10) + '</td>\
                <td><i class="fas fa-trash" type="button" id="delBookingBtn" data-mybookingID="'+ bookingID + '"></i>\
                </td></tr>');
                $("#delBookingBtn[data-mybookingID='" + bookingID + "']").on('click', function () {
                    var BID = $('#delBookingBtn').attr('data-mybookingID');
                    console.log(BID);
                    $.ajax({
                        data: { bookingId: BID },
                        method: 'delete',
                        url: '/deleteSpaceBooking',
                        dataType: 'json',
                        success: function (response) {
                            console.log(response);
                            alert('booking deleted');
                            window.location.reload();
                        },
                        error: function (response) {
                            console.log('server error occured ', response);
                        }
                    });
                });
            });
        }
    });

    $.ajax({
        method: 'get',
        url: '/getCarPoolBookings',
        dataType: 'json',
        success: function (response) {
            console.log(response);
            var count = response.data;
            $('#carpoolBookings').append('<table class="table table-hover" id="CPbookingTable">\
            <thead>\
              <tr>\
                <th scope="col">Driver</th>\
                <th scope="col">Location</th>\
                <th scope="col">Vehicle</th>\
                <th scope="col">Date In</th>\
                <th scope="col">Date Out</th>\
                <th scope="col"></th>\
              </tr>\
              </thead>\
              <tbody id="my-CP-bookings">\
              </tbody>\
            </table>');
            $.each(count, function (index, value) {
                console.log(value);
                var CPbookingID = response.data[index].cpID;
                var driver = response.data[index].driverName;
                var location = response.data[index].pickupLoc;
                var vehicle = response.data[index].vehicle;
                var dateIn = response.data[index].dateIn;
                var dateOut = response.data[index].dateOut;
                $('#my-CP-bookings').append('<tr><td scope="row">' + driver + '</td>\
                <td>'+ location + '</td>\
                <td>'+ vehicle + '</td>\
                <td>'+ dateIn.substring(0, 10) + '</td>\
                <td>'+ dateOut.substring(0, 10) + '</td>\
                <td><i class="fas fa-trash" type="button" id="delCPBtn" data-myCPbookingID="'+ CPbookingID + '"></i>\
                </td></tr>');
           
            $("#delCPBtn[data-myCPbookingID='" + CPbookingID + "']").on('click', function () {
                var CPBID = $('#delCPBtn').attr('data-myCPbookingID');
                $.ajax({
                    data: { carpoolBookingId: CPBID },
                    method: 'delete',
                    url: '/deleteCarPoolBooking',
                    dataType: 'json',
                    success: function (response) {
                        window.location.reload();
                    },
                    error: function (response) {
                        console.log('server error occured ', response);
                    }
                });
            });
          });
        }
    });

    $.ajax({
        method: 'get',
        url: '/getCars',
        dataType: 'json',
        success: function (response) {
            var count = response.data;
            $('#AddNewCar').append('<table class="table table-hover" id="CarTable">\
            <thead>\
              <tr>\
                <th scope="col">Make</th>\
                <th scope="col">Colour</th>\
                <th scope="col">Registration</th>\
                <th scope="col"></th>\
              </tr>\
            </thead>\
            <tbody id="cars">\
            </tbody>\
            </table>');
            $.each(count, function (index, value) {
                console.log(value);
                var carID = response.data[index]._id;
                var make = response.data[index].make;
                var colour = response.data[index].colour;
                var registration = response.data[index].registration;
                $('#cars').append('<tr><td scope="row">' + make + '</td>\
                <td>'+ colour + '</td>\
                <td>'+ registration + '</td>\
                <td><i class="fas fa-trash" type="button" id="delCarBtn" data-carID="'+ carID + '"></i>\
                </td></tr>');
           
            $("#delCarBtn[data-carID='" + carID + "']").on('click', function (e) {
                var car_ID = $('#delCarBtn').attr('data-carID');
                $.ajax({
                    data: { carId: car_ID },
                    method: 'delete',
                    url: '/deleteCar',
                    dataType: 'json',
                    success: function (response) {
                        console.log(response);
                        window.location.reload();
                    },
                    error: function (response) {
                        console.log('server error occured ', response);
                    }
                });
            });
            });
        }
    });

    $('#new-car-check').on('click', function () {
        if ($('#newCar').hasClass('show form-group')) {
            $('#newCar').attr('class', 'form-group');
            $('#newCar').hide();
        }
        else if ($('#newCar').hasClass('form-group')) {
            $('#newCar').show();
            $('#newCar').attr('class', 'show form-group');
        }
    });

    $('#new-car').on('click', function () {
        const carData = {
            userID: userID,
            make: $("#car-make").val(),
            colour: $("#car-colour").val(),
            registration: $("#car-registration").val()
        };
        console.log(carData);

        $.ajax({
            data: carData,
            method: 'post',
            url: '/addCar',
            dataType: 'json',
            success: function (response) {
                $("#car-make").val("");
                $("#car-colour").val("");
                $("#car-registration").val("");
                window.location.reload();
            },
            error: function (response) {
                console.log('server error occured ', response);
            }
        });
    });

    $.ajax({
        method: 'get',
        url: '/getLocations', 
        dataType: 'json',
        success: function (response) {
            var count = response.data;
            $('#AddNewLoc').append('<table class="table table-hover" id="LocTable">\
            <thead>\
              <tr>\
                <th scope="col">Nickname</th>\
                <th scope="col">Address</th>\
                <th scope="col">Postcode</th>\
                <th scope="col"></th>\
              </tr>\
            </thead>\
            <tbody id="locations">\
            </tbody>\
          </table>');
            $.each(count, function (index, value) {
                console.log(value);
                var locID = response.data[index]._id;
                var nickname = response.data[index].nickname;
                var street_num = response.data[index].street_num;
                var postcode = response.data[index].postcode;
                $('#locations').append('<tr><td scope="row">' + nickname + '</td>\
                <td>'+ street_num + '</td>\
                <td>'+ postcode + '</td>\
                <td><i class="fas fa-trash" type="button" id="delLocBtn" data-locID="'+ locID + '"></i>\
                </td></tr>');
            
            $("#delLocBtn[data-locID='" + locID + "']").on('click', function () {
                var loc_ID = $('#delLocBtn').attr('data-locID');
                $.ajax({
                    data: { locId: loc_ID },
                    method: 'delete',
                    url: '/deleteLoc',
                    dataType: 'json',
                    success: function (response) {
                        console.log(response);
                        window.location.reload();
                    },
                    error: function (response) {
                        console.log('server error occured ', response);
                    }
                });
            });
            });
        }
    });

    $('#new-loc-check').on('click', function () {
        if ($('#newLoc').hasClass('show form-group')) {
            $('#newLoc').attr('class', 'form-group');
            $('#newLoc').hide();
        }
        else if ($('#newLoc').hasClass('form-group')) {
            $('#newLoc').show();
            $('#newLoc').attr('class', 'show form-group');
        }
    });

    $('#new-loc').on('click', function () {
        const locData = {
            userID: userID,
            nickname: $("#loc-name").val(),
            street_num: $("#addressLine1").val(),
            postcode: $("#postcode").val()
        };
        console.log(locData);

        $.ajax({
            data: locData,
            method: 'post',
            url: '/addLocation',
            dataType: 'json',
            success: function (response) {
                $("#loc-name").val("");
                $("#addressLine1").val("");
                $("#postcode").val("");
                window.location.reload();
            },
            error: function (response) {
                console.log('server error occured ', response);
            }
        });
    });

    $('#logoutBtn').on('click', function () {
        $.ajax({
            method: 'get',
            url: '/logout',
            success: function (response) {
                $(location).attr('href', '/login');
            },
            error: function (response) {
                $(location).attr('href', '/login');
                console.log('server error occurred ', response);
            }
        });
    });
});



