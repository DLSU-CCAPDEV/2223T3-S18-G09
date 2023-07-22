$(document).ready(function () {
    /* add an event listner to the button */
    /* server side validation */

    function checkFormValidity() {
        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var username = $('#username').val();
        var password = $('#password').val();
        var avatarInpFile = $('#avatarInpFile').val();

        var allInputsFilled = first_name.trim() !== '' &&
            last_name.trim() !== '' &&
            username.trim() !== '' &&
            password.trim() !== '' &&
            avatarInpFile.trim() !== '';

        $('#first_name').css('border-color', first_name.trim() !== '' ? 'green' : 'red');
        $('#last_name').css('border-color', last_name.trim() !== '' ? 'green' : 'red');
        $('#username').css('border-color', username.trim() !== '' ? 'green' : 'red');
        $('#password').css('border-color', password.trim() !== '' ? 'green' : 'red');
        $('#avatarInpFile').css('border-color', $('#avatarInpFile').val() !== '' ? 'green' : 'red');

        $('#signupButton').prop('disabled', !allInputsFilled);
        $('#error').text(allInputsFilled ? "" : "All fields must be filled!");
    }

    // Call the function whenever any of the input fields change
    $('#first_name, #last_name, #username, #password, #avatarInpFile').on('input change', checkFormValidity);

    $('#signupButton').on('click', async function () {
        const inpFile = document.getElementById('avatarInpFile');
        const file = inpFile.files[0];

        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var username = $('#username').val();
        var password = $('#password').val();
        var description = $('#description').val();
        var joined = new Date();
        var avatarImagePath;
        var bannerImagePath = '../images/default-user-images/default-banner.jpg';

        /* if there are no inputted image files then provide the default */
        if (!file) {
            avatarImagePath = '../images/default-user-images/default-avatar.png';
        }

        /* also append the other two inputs, we will process it here */

        /* get the queries first */

        /* if the username is unique append everything to formdata */
        const formData = new FormData();
        formData.append('file', file);
        formData.append('first_name', first_name);
        formData.append('last_name', last_name);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('description', description);
        formData.append('joined', joined);
        formData.append('avatarImagePath', avatarImagePath);
        formData.append('bannerImagePath', bannerImagePath);
        /* the avatarImagePath will be processed later if it's not using the default avatar */

        /* this is where the ajax processing comes in */
        /* the client sends a .POST request */
        $.post({
            url: "/signup",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                // Handle the response from the server
                // Here, you can redirect the user to the login page after successful signup
                if (data.success) {

                    alert("Successfully signed up!");
                    window.location.href = '/login';

                    // Clear the input fields after successful signup
                    $('#first_name').val(''); 
                    $('#last_name').val('');  
                    $('#username').val(''); 
                    $('#password').val('');    
                    $('#description').val(''); 
                } else {
                    // The signup process encountered an issue
                    alert("Signup failed. Please try again with a different username.");
                    // $('#first_name').val('');
                    // $('#last_name').val('');
                    $('#username').val('');
                    $('#username').css('border-color', 'red');
                    // $('#password').val('');
                    // $('#description').val('');
                }
            },
            /*             error: function (error) {
                            // Handle the error response from the server
                            console.error(error);
                        } */
        });

    });
});