// jQuery(function () {
//     $('#car-register-submit').on('click', function () {
//         const formData = {
//             spaceID: $("#spaceNo").val(),
//             pickupLoc: $("#chooseLocation").val(),
//             vehicle: $("#chooseVehicle").val(),
//             noOfPassenegers: $("#inputPassenegers").val(),
//             dateOut: $("#DateTimeOut").val(),
//             dateIn: $("#DateTimeReturn").val(),
//         };
//         console.log(formData);

//        $.ajax({
//             data: formData,
//             method: 'post',
//             url: '/addCarPool',
//             dataType: 'json',
//             success: function (response) {
//                 console.log('car added successfully');
//                 $('#car-register-form')[0].reset();
//             },
//             error: function (response) {
//                 console.log('server error occured ', response);
//                 $('#car-register-form')[0].reset();
//             }
//         });
//         $('#car-register').hide();
//     });
// });