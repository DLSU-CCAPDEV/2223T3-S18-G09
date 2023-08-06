$(document).ready(function () {
    $('#submit-update').click(function () {
        console.log(`test`);
        // AJAX CALL    
        // Get input from fields
        if($('#update-newpassword').val() == $('#verify-newpassword').val()){
            var upda = $('#update-username').val();
            $.get('/getUser', { username: upda }, function (data) {
                if (upda == "") {
                    alert('Username is invalid!');
                }
                else if(data && data.username != $('#update-username').data('user')) {
                    alert('Username is already taken!');
                }

                else {
                    var first_name = $('#update-firstname').val();
                    var last_name = $('#update-lastname').val();
                    var username = $('#update-username').val();
                    var description = $('#update-description').val();
                    var oldPassword = $('#update-oldpassword').val();
                    var newPassword = $('#update-newpassword').val();

                    // Get files uploaded
                    var input_banner = null;
                    var input_pfp = null;

                    input_banner = document.getElementById('updateform-banner');
                    input_pfp = document.getElementById('updateform-pfp');

                    console.log(input_pfp.files[0]);
                    console.log(input_banner.files[0]);

                    const formData = new FormData();
                    formData.append('avatar', input_pfp.files[0]);
                    formData.append('banner', input_banner.files[0]);
                    
                    formData.append('first_name', first_name);
                    formData.append('last_name', last_name);
                    formData.append('username', username);
                    formData.append('description', description);
                    formData.append('oldPassword', oldPassword);
                    formData.append('newPassword', newPassword);

                    $.post({
                        url: "/update-2db",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            // After updating database
                            window.location.href = '/user-profile-overview/' + username;
                        },
                    });
                }
            });

        }
        else {
            alert('Passwords do not match!');
        }
    });
    $('#verify-newpassword').keyup(function () {
        var upda = $('#update-newpassword').val();
        var veri = $('#verify-newpassword').val();
            if(upda == veri) {
                $('#passerr').css('display', 'none');
            }
    
            else {
                $('#passerr').css('display', 'block');
            }
        });
    $('#update-newpassword').keyup(function () {
        var upda = $('#update-newpassword').val();
        var veri = $('#verify-newpassword').val();
            if(upda == veri) {
                $('#passerr').css('display', 'none');
            }
    
            else {
                $('#passerr').css('display', 'block');
            }
        });
    $('#update-username').keyup(function () {
        var upda = $('#update-username').val();
        $.get('/getUser', { username: upda }, function (data) {
            if(data && data.username != $('#update-username').data('user')) {
                $('#accerr').css('display', 'block');
            }
    
            else {
                $('#accerr').css('display', 'none');
            }
        });
    });
});