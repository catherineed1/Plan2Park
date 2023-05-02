jQuery(function () {
    $.ajax({
        method: 'get',
        url: '/getReportedIssues',
        dataType: 'html',
        success: function (response) {
            console.log(response);
            var json = JSON.parse(response);
            var count = json.data;
            $('#admin-view').append('<table class="table table-hover" id="adminTable">\
            <thead>\
              <tr>\
                <th scope="col">Space Number</th>\
                <th scope="col">Issue Details</th>\
                <th scope="col">Staff Member Email</th>\
                <th scope="col">Resolved?</th>\
              </tr>\
              </thead>\
              <tbody id="admin-issues">\
              </tbody>\
            </table>');
            $.each(count, function (index, value) {
                var issueID = json.data[index]._id;
                var spaceNum = json.data[index].spaceNum;
                var details = json.data[index].issue;
                var staffEmail = json.data[index].userEmail;
                $('#admin-issues').append('<tr><td scope="row">' + spaceNum + '</td>\
                <td>'+ details + '</td>\
                <td>'+ staffEmail + '</td>\
                <td><i class="fas fa-check-circle" type="button" id="resolveIssueBtn" data-issueID="'+ issueID + '"></i>\
                </td></tr>');
                $("#resolveIssueBtn[data-issueID='" + issueID + "']").on('click', function () {
                    var IID = $('#resolveIssueBtn').attr('data-issueID');
                    $.ajax({
                        data: { issueId: IID },
                        method: 'delete',
                        url: '/deleteIssue',
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
        },
        error: function (response) {
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
                $(location).attr('href', '/login');
                console.log('server error occurred ', response);
            }
        });
    });
});