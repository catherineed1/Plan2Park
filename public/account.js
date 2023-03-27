jQuery(function () {
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
                var address = json.data[index].address[0].line1;
                var vehicle = json.data[index].vehicle[0].nickname;
                var data = "Username: " + user + ", Name: " + name + ", Address: " + address + ", Vehicle: " + vehicle;
                $('#currentUser').append(name);
                $('#retrieveUser').append('<br>' + data);
            });
        }
    });
});


