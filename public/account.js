jQuery(function () {
    $.ajax({
    method: 'get',
    url: '/getCarPool',
    dataType: 'html',
    success: function (response) {
        var json = JSON.parse(response);
        var count = json.data;
        $('#usersVehicles').append('<table class="table table-hover" id="vehicleTable">\
        <thead>\
            <tr>\
            <th scope="col">Vehicle</th>\
            <th scope="col"></th>\
            </tr>\
        </thead>\
        <tbody id="vehicle">\
        </tbody>\
        </table>');
        $.each(count, function(index, value){
            console.log(value);
            var vehicle = json.data[index].vehicle;
            $('#vehicle').append('<tr>\
            <td>'+vehicle+'</td>\
            <td><button id="editCarBtn" type="button" class="btn btn-primary">Edit</button>\
            </td></tr>');
            });
        }
    });

    $.ajax({
        method: 'get',
        url: '/getCarPool',
        dataType: 'html',
        success: function (response) {
            var json = JSON.parse(response);
            var count = json.data;
            $('#usersLoc').append('<table class="table table-hover" id="LocTable">\
            <thead>\
                <tr>\
                <th scope="col">Locations</th>\
                <th scope="col"></th>\
                </tr>\
            </thead>\
            <tbody id="loc">\
            </tbody>\
            </table>');
            $.each(count, function(index, value){
                console.log(value);
                var location = json.data[index].pickupLoc;
                $('#loc').append('<tr>\
                <td>'+location+'</td>\
                <td><button id="editLocBtn" type="button" class="btn btn-primary">Edit</button>\
                </td></tr>');
                });
            }
        });
});