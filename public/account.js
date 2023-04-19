jQuery(function () {
    $('#newCar').hide();
    $('#newLoc').hide();

    $.ajax({
        method: 'get',
        url: '/getUser',
        dataType: 'html',
        success: function (response) {
            var json = JSON.parse(response);
            var count = json.data;
            console.log(count);

            $.each(count, function(index, value){
                console.log(value);
                var user = json.data[index].username;
                var name = json.data[index].fullName;
                var address = json.data[index].address[0].nickname;
                var addressline = json.data[index].address[0].street_number;
                var postcode = json.data[index].address[0].postcode;
                var vehicle = json.data[index].vehicle[0].make;
                var vehiclecolour = json.data[index].vehicle[0].colour;
                var reg = json.data[index].vehicle[0].registration;
                var data = "Username: " + user + ", Name: " + name + ", Address: " + address + ", Vehicle: " + vehicle;
                $('#currentUser').append(name);
                $('#retrieveUser').append('<br>' + data);
            });
        }
    });

    $('#new-car-check').on('click', function () {
       if($('#newCar').hasClass('show form-group')){
            $('#newCar').attr('class', 'form-group');
            $('#newCar').hide();
        }
        else if($( '#newCar' ).hasClass('form-group')){
            $('#newCar').show();
            $('#newCar').attr('class', 'show form-group');
        }
    });
       

    $('#new-loc-check').on('click', function () {
        if($('#newLoc').hasClass('show form-group')){
            $('#newLoc').attr('class', 'form-group');
            $('#newLoc').hide();
        }
        else if($('#newLoc').hasClass('form-group')){
            $('#newLoc').show();
            $('#newLoc').attr('class', 'show form-group');
        }
    });
});



