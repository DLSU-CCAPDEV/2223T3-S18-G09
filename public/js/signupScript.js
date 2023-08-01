$(document).ready(function () {
    /* add an event listner to the button */
    /* server side validation */

    /* function checkFormValidity() {
        var first_name = validator.trim($('#first_name').val());
        var last_name = validator.trim($('#last_name').val());
        var username = validator.trim($('#username').val());
        var password = validator.trim($('#password').val());
        var avatarInpFile = $('#avatarInpFile').val(); // we can't trim this because some images have 


        var allInputsFilled = first_name !== '' &&
            last_name !== '' &&
            username !== '' &&
            password !== '' &&
            avatarInpFile !== '';

        $('#first_name').css('border-color', first_name !== '' ? 'green' : 'red'); 
        $('#last_name').css('border-color', last_name !== '' ? 'green' : 'red'); 
        $('#username').css('border-color', username !== '' ? 'green' : 'red'); 
        $('#password').css('border-color', password !== '' ? 'green' : 'red'); 
        $('#avatarInpFile').css('border-color', $('#avatarInpFile').val() !== '' ? 'green' : 'red'); 

        $('#signupButton').prop('disabled', !allInputsFilled);
        $('#error').text(allInputsFilled ? "" : "All fields must be filled!");
    }
 */
    function isFilled() {
        var first_name = validator.trim($('#first_name').val());
        var last_name = validator.trim($('#last_name').val());
        var username = validator.trim($('#username').val());
        var password = validator.trim($('#password').val());
        var avatarInpFile = $('#avatarInpFile').val();              // we can't trim this because some images have 

        var first_name_empty = validator.isEmpty(first_name);
        var last_name_empty = validator.isEmpty(last_name);
        var username_empty = validator.isEmpty(username);
        var password_empty = validator.isEmpty(password);
        var avatarInpFile_empty = validator.isEmpty(avatarInpFile);

        // true if all fields are not empty, otherwise false
        return !first_name_empty && !last_name_empty && !username_empty && !password_empty && !avatarInpFile_empty;
    }

    function isValidUsername(field, callback) {

        /* 
            gets the value of 'username' in the signup form
            removes leading and trailing blank spaces 
        */
        var username = validator.trim($('#username').val());

        $.get('/getCheckUsername', { username: username }, function (result) {

            // if the value of 'username' does not exist in the database
            if (result.username != username) {

                /* 
                    check if the <input> field is calling this function
                    is the 'username' <input> field                
                */
                if (field.is($('#username'))) {
                    // renive the error message in 'usernameError'
                    $('#usernameError').text('');
                }

                /*
                    since  the value of `username` is not yet used by 
                    another user in the database
                    return true.
                */

                return callback(true);
            }

            // else if the value of 'username' exists in the database
            else {

                /* 
                    check if the <input> field calling this function 
                    is the 'username' <input> field
                */
                if (field.is($('#username'))) {
                    // display appropriate error message in 'username'
                    $('#usernameError').text('Username already registered.');
                }

                /*
                    since the value of `username`
                    is used by another user in the database
                    return false.
                */
                return callback(false);
            }
        });
    }

    function isValidPassword(field) {
        var validPassword = false;

        var password = validator.trim($('#password').val());
        var isValidLength = validator.isLength(password, { min: 8 });

        // if the value of 'password' contains at least 8 characters
        if (isValidLength) {

            /*
                check if the <input> field calling this function
                is the `password` <input> field
            */
            if (field.is($('#password'))) {
                // remove the error message in 'passwordError'
                $('#passwordError').text('');
            }

            validPassword = true;
        } else {

            /*
                check if the <input> field calling this function
                is the `password` <input> field
            */
            if (field.is('#password')) {
                $('#passwordError').text(`Passwords should contain at least 8 characters.`);
            }
        }

        return validPassword;
    }

    /*
        Function which checks if the `field` is empty.
        This also calls functions isFilled(), isValidPassword(), and
        isValidUsername().
        This is attached to the `keyup` event of each field
        in the signup form.
        This activates the `submit` button if:
        - value returned by function isFilled() is true
        - value returned by function isValidPassword() is true
        - value returned by function isValidUsername() is true

        The function has 3 parameters:
        - field - refers to the current <input> field calling this function
        - fieldName - the `placeholder` of the current <input> field calling
        this function
        - error - the corresponding <p> element to display the error of the
        current <input> field calling this function
    */
    function validateField(field, fieldname, error) {

        /*
            gets the value of `field` in the signup form
            removes leading and trailing blank spaces
            then checks if the trimmed value is empty.
        */
        var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);

        // if the value of the 'field' is empty
        if (empty) {
            /*
                set the current value of `field` to an empty string
                this is applicable if the user just entered spaces
                as value to the `field`
            */
            field.prop('value', '');
            // also equivalent field.val('');

            // display appropriate error message in 'error'
            error.text(fieldname + ' should not be empty');
        }

        // else if the value of 'field' is not empty
        else {
            error.text('');
        }

        // call isFilled() function to check if all fields are filled
        var filled = isFilled();

        /* 
            vall isValidPassword() function
            to check if the value of 'password' field is valid 
        */
        var validPassword = isValidPassword(field);

        /* 
            call isValidUsername() function
            to check if the value of 'username' field is valid
        */
        isValidUsername(field, function (validUsername) {

            /*
                if all fields are filled
                and the password contains at least 8 characters
                and the username is unique
                then enable the `signupButton` button
            */
            if (filled && validPassword && validUsername)
                $('#signupButton').prop('disabled', false);

            /*
                else if at least one condition has not been met
                disable the `submit` button
            */
            else
                $('#signupButton').prop('disabled', true);
        })
    }

    // Call the function whenever any of the input fields change
    // $('#first_name, #last_name, #username, #password, #avatarInpFile').on('input change', checkFormValidity);

    /*
        attach the event `keyup` to the html element where id = `first_name`
        this html element is an `<input>` element
        this event activates when the user releases a key on the keyboard
    */
    $('#first_name').keyup(function () {

        // calls the validateField() function to validate 'first_name'
        validateField($('#first_name'), 'First name', $('#first_nameError'));
    });

    /*
        attach the event `keyup` to the html element where id = `last_name`
        this html element is an `<input>` element
        this event activates when the user releases a key on the keyboard
    */
    $('#last_name').keyup(function () {

        // calls the validateField() function to validate 'first_name'
        validateField($('#last_name'), 'Last name', $('#last_nameError'));
    });

    /*
        attach the event `keyup` to the html element where id = `username`
        this html element is an `<input>` element
        this event activates when the user releases a key on the keyboard
    */
    $('#username').keyup(function () {

        // calls the validateField() function to validate 'first_name'
        validateField($('#username'), 'Username', $('#usernameError'));
    });

    /*
        attach the event `keyup` to the html element where id = `password`
        this html element is an `<input>` element
        this event activates when the user releases a key on the keyboard
    */
    $('#password').keyup(function () {

        // calls the validateField() function to validate 'first_name'
        validateField($('#password'), 'Password', $('#passwordError'));
    });

    /*
        attach the event `keyup` to the html element where id = `avatarInpFile`
        this html element is an `<input>` element
        this event activates when the user releases a key on the keyboard
    */
    $('#avatarInpFile').on('input change', function () {

        // calls the validateField() function to validate 
        validateField($('#avatarInpFile'), 'Avatar Input', $('#avatarInpFileError'));
    });

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

        console.log('line305 signupScript');

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
                    $('avatarInpFile').val('');
                } else {
                    // The signup process encountered an issue
                    alert("Signup failed. Please try again");
                    $('#first_name').val('');
                    $('#last_name').val('');
                    $('#username').val('');
                    $('#password').val('');
                    $('#description').val('');
                    $('avatarInpFile').val('');
                }
            },
            /*             error: function (error) {
                            // Handle the error response from the server
                            console.error(error);
                        } */
        });

    });
});