// we can declare global variables here
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// jquery code for the event listener
$(document).ready(function () {
    // Your jQuery code goes here

    var currDate = new Date();

    var currDateString = monthNames[currDate.getMonth()] + " " + currDate.getDate() + ", " + currDate.getFullYear();

    // form submission for the review
    $('#submit-review').click(function () {

        // Validate if input fields are empty
        if (!$(`#review-title`).val().trim() && !$(`#floatingTextarea2`).val().trim()) {
            $(`#review-title`).addClass(`is-invalid`);
            $(`#floatingTextarea2`).addClass(`is-invalid`);
            return;
        }
        else if (!$(`#review-title`).val().trim()) {
            $(`#review-title`).addClass(`is-invalid`);
            $(`#floatingTextarea2`).removeClass(`is-invalid`);
            return;
        }
        else if (!$(`#floatingTextarea2`).val().trim()) {
            $(`#floatingTextarea2`).addClass(`is-invalid`);
            $(`#review-title`).removeClass(`is-invalid`);
            return;
        }

        // AJAX CALL    
        // Get input from fields

        var userReviewText = $('#floatingTextarea2').val().trim();
        var userReviewTitle = $('#review-title').val().trim();
        var rating = $('input[name="rating"]:checked').val();
        if (rating == undefined)
            rating = 0;

        // Get files uploaded
        var input = document.getElementById('formFileMultiple');
        var inputFiles = input.files;
        if (!inputFiles) {
            inputFiles = null;
        }

        const formData = new FormData();
        // Append each file to the formData with a unique key, e.g., "file1", "file2", etc.
        for (let i = 0; i < inputFiles.length; i++) {
            formData.append(`files`, inputFiles[i]);
        }

        var establishment_id = $(`#submit-review`).attr("data");

        formData.append('title', userReviewTitle);
        formData.append('body_desc', userReviewText);
        formData.append('establishment_id', establishment_id);
        formData.append('rating', rating);


        // Get establishment that the user will write review for


        $.post({
            url: "/write-review",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                $('#review-container').append(data);
            },
        });

        // reset input fields after submission
        $('#floatingTextarea2').val('');
        $('#review-title').val('');
        $('input[name="rating"]:checked').prop('checked', false);
        $('#formFileMultiple').val('');
        alert('Review submitted!');


        document.getElementById("buttonDismiss").click(); // close modal
        $(`#review-title`).removeClass(`is-invalid`);
        $(`#floatingTextarea2`).removeClass(`is-invalid`);
    });





    $(document).on('click', '.delete-review', function () {
        var review_id = $(this).attr("data");
        var reviewElement = $(this).closest('.user-review');

        $.get('/delete-review', { review_id: review_id },
            function (data, status) {
                reviewElement.remove();
            });
    });

    // SCRIPT FOR VOTING
    // Upvote
    $(document).on('click', '.upvote', function () {
        // Remove active vote
        if ($(this).hasClass('active-vote')) {
            $(this).removeClass('active-vote');
            $(this).html(`<i style="font-size: 16px" class="bi bi-hand-thumbs-up"></i>`);

            /* Pseudo code
            Remove username from upvotes array
            --numUpvotes
            */
        }
        // Add active vote and replace icons
        else {
            $(this).html(`<i style="font-size: 16px" class="bi bi-hand-thumbs-up-fill"></i>`);
            $(this).addClass('active-vote');

            var dv = $(this).nextAll('.downvote').first(); //This stopped workin
            dv.removeClass('active-vote'); //This stopped workin
            dv.html(`<i style="font-size: 16px" class="bi bi-hand-thumbs-down"></i>`); //This stopped workin

            /* Pseudo code
            Append username to upvotes array
            ++numUpvotes

            if user currently downvoted review
                Remove username from downvotes array
                --numDownvotes
            */
        }
    });

    // Downvote
    $(document).on('click', '.downvote', function () {
        // Remove active vote
        if ($(this).hasClass('active-vote')) {
            $(this).removeClass('active-vote');
            $(this).html(`<i style="font-size: 16px" class="bi bi-hand-thumbs-down"></i>`);

            /* Pseudo code
            Remove username from downvotes array
            --numDownvotes
            */
        }
        // Add active vote and replace icons
        else {
            $(this).html(`<i style="font-size: 16px" class="bi bi-hand-thumbs-down-fill"></i>`);
            $(this).addClass('active-vote');

            var uv = $(this).prevAll('.upvote').first(); //This stopped workin
            uv.removeClass('active-vote'); //This stopped workin
            uv.html(`<i style="font-size: 16px" class="bi bi-hand-thumbs-up"></i>`); //This stopped workin

            /* Pseudo code
            Append username to downvotes array
            ++numDownvotes

            if user currently upvoted review
                Remove username from upvotes array
                --numUpvotes
            */
        }
    });

    // Edit Review
    $(document).on('click', '.edit-review-submit', function () {
        var review_id = $(this).attr("data");
        var edit_review_title = `#edit-review-title-` + review_id;
        var edit_review_text = `#edit-floatingTextarea2-` + review_id;
        var edit_review_rating = `input[name="` + `edit-rating-` + review_id + `"]:checked`;
        var reviewElement = $(this).closest('.user-review');

        // Validate if input fields are empty
        if (!$(edit_review_title).val().trim() && !$(edit_review_text).val().trim()) {
            $(edit_review_title).addClass(`is-invalid`);
            $(edit_review_text).addClass(`is-invalid`);
            return;
        }
        else if (!$(edit_review_title).val().trim()) {
            $(edit_review_title).addClass(`is-invalid`);
            $(edit_review_text).removeClass(`is-invalid`);
            return;
        }
        else if (!$(edit_review_text).val().trim()) {
            $(edit_review_text).addClass(`is-invalid`);
            $(edit_review_title).removeClass(`is-invalid`);
            return;
        }
        else {
            $(edit_review_title).removeClass(`is-invalid`);
            $(edit_review_text).removeClass(`is-invalid`);
        }


        // Get input from fields
        var userReviewText = $(edit_review_text).val().trim();
        var userReviewTitle = $(edit_review_title).val().trim();
        var rating = $(edit_review_rating).val();

        // Get files uploaded
        var edit_form = `edit-formFileMultiple-` + review_id;
        var input = document.getElementById(edit_form);
        var inputFiles = input.files;
        if (!inputFiles) {
            inputFiles = null;
        }

        const formData = new FormData();
        // Append each file to the formData with a unique key, e.g., "file1", "file2", etc.
        for (let i = 0; i < inputFiles.length; i++) {
            formData.append(`files`, inputFiles[i]);
        }

        formData.append('title', userReviewTitle);
        formData.append('body_desc', userReviewText);
        formData.append('rating', rating);
        formData.append(`review_id`, review_id);

        $.post({
            url: "/update-review",
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                $(reviewElement).replaceWith(data);
            },
        });

        $(edit_review_text).val('');
        $(edit_review_title).val('');
        $(edit_review_rating).prop('checked', false);
        var edit_form = '#edit-formFileMultiple-' + review_id;
        $(edit_form).val('');
        alert('Review updated!');
        var closeBtn = `closeBtn-` + review_id;
        document.getElementById(closeBtn).click(); // close modal
    });

    // Rating filter on establishment list
    $('input[type="radio"]').on('change', function () {
        // Get the selected rating
        var selectedRating = $(this).val();

        $('.establishment-item').hide();
        $('.establishment-item[data-rating="' + selectedRating + '"]').show();
    });

    $('#filterReset').click(function () {
        $('.establishment-item').show(); //Reset filter
    });

    // Create Response
    $(document).on('click', '.create-response', function () {
        var review_id = $(this).attr("data");
        var userResponseText = $('#floatingTextarea2' + review_id);
        var currentDate = currDate;
        var body_desc = userResponseText.val();
        var username = $('#getUsername').text();
        //var reviewElement = $(this).closest('.user-response');
        $.get('/create-response', { id: review_id, date: currentDate, text: body_desc });

        //text
        var eyy = $('#response-reedit' + review_id);
        var p = $('<span></span>').addClass('mx-5 user-response').css({ 'color': 'black' });
        var span1 = $('<span></span>').attr({ 'id': 'show' + review_id });
        var b1 = $('<b></b>').text('Response from the Owner');
        var span2 = $('<span></span>').attr({ 'id': 'hide' + review_id }).css({ 'display': 'none' });
        var b2 = $('<b></b>').text('Response from the Owner');
        var span3 = $('<span></span>').css({ 'color': '#B4B4B4' }).text(' Replied on ' + currDateString);
        var span4 = $('<span></span>').attr({ 'id': 'rewrite' + review_id }).css({ 'margin-left': '60px' }).text(body_desc);

        var a1 = $('<a></a>').attr({ 'onclick': 'hideResponseFunction(`response' + review_id + '`, `show' + review_id + '`, `hide' + review_id + '`)', 'id': 'response' + review_id });
        a1.text(' • Show Response');

        //buttons
        var edit = $('<button></button>').addClass('btn btn-danger edit-response text-nowrap').attr({'data-bs-toggle':'modal', 'data-bs-target': '#edit-response-modal-' + review_id, 'data':review_id}).css({'font-size':'10px', 'margin-left':'60px', 'margin-right':'4px'});
        var i = $('<i></i>').addClass('bi bi-pencil-square');
        var del = $('<button></button>').addClass('btn btn-danger ml-auto delete-response t').attr({'id':'delete-btn-' + review_id, 'data':review_id}).css({'font-size':'10px'});
        var i2 = $('<i></i>').addClass('bi bi-trash-fill');

        //modal
        var divOuter = $('<div></div>').addClass('modal fade').attr({'id':'edit-response-modal-' + review_id, 'tabindex': '-1', 'aria-labelledby':'modalLabel', 'aria-hidden':'true'});
        var divInner1 = $('<div></div>').addClass('modal-dialog');
        var divInner2 = $('<div></div>').addClass('modal-content');

        var divInner3 = $('<div></div>').addClass('modal-header');
        var h1 = $('<h1></h1>').addClass('modal-title fs-5').attr({'id':'edit-modalLabel-' + review_id}).text('Edit Response');
        var buttonID = 'closeBtn-' + review_id;
        var button2 = $('<button></button>').addClass('btn-close').attr({'type':'button','data-bs-dismiss':'modal', 'aria-label':'Close', 'id':buttonID});

        var divInner4 = $('<div></div>').addClass('modal-body');
        var form = $('<form></form>').css('max-width', '600px');
        var inDiv1 = $('<div></div>').addClass('form-floating border p-3 my-3 rounded');
        var textArea = $('<textarea></textarea>').addClass('form-control border-0').attr({'id':'edit-floatingTextarea2-'+ review_id, 'required':''}).css({'height':'200px', 'text-justify':'inter-word', 'text-align':'justify'}).text(body_desc); //text-justify: inter-word
        var label = $('<label></label>').attr('for', 'edit-floatingTextarea2-' + review_id).text('Respond to ' + username);

        var input = $('<input>').addClass('submit-button btn btn-primary edit-response-submit').attr({'id':'edit-response-submit-' + review_id, 'type':'button', 'value':'Edit Response', 'data': review_id}).css({'width':'200px'});
        var br1 = document.createElement("BR");
        var br2 = document.createElement("BR");

        //append
        span1.append(b1);
        span2.append(b2);
        span2.append(span3);
        span2.append(br1);
        span2.append(span4);
        p.append(span1);
        p.append(span2);
        p.append(a1);
        p.append(br2);

        edit.append(i);
        edit.append(' Edit Response');
        del.append(i2);

        inDiv1.append(textArea);
        inDiv1.append(label);
        form.append(inDiv1);
        form.append(input);
        divInner4.append(form);

        divInner3.append(h1);
        divInner3.append(button2);

        divInner2.append(divInner3);
        divInner2.append(divInner4);
        divInner1.append(divInner2);
        divOuter.append(divInner1);

        p.append(edit);
        p.append(del);
        p.append(divOuter);

        eyy.append(p);

        userResponseText.text('');
        $('#response-btn' + review_id).remove();
        alert('Response submitted!');
        var closeBtn = `btn-close` + review_id;
        document.getElementById(closeBtn).click();
    });

    // Delete Response
    $(document).on('click', '.delete-response', function () {
        var review_id = $(this).attr("data");
        var username = $('#getUsername').text();
        var reviewElement = $(this).closest('.user-response');
        $.get('/delete-response', { review_id: review_id },
            function (data, status) {
                reviewElement.remove();

                //To follow: Appends Write a Response Button after deleting

                //button
                var eyy = $('#response-reedit' + review_id);
                var div = $('<div></div>').addClass('col').attr('id', 'response-btn' + review_id);
                var button = $('<button></button>').addClass('btn btn-danger fs-6 mx-5 btn-sm').attr({'data-bs-toggle': 'modal','data-bs-target': '#write-response-modal' + review_id});
                var i = $('<i></i>').css('font-size', '16px').addClass('bi bi-pencil-square me-1');

                //modal
                var divOuter = $('<div></div>').addClass('modal fade').attr({'id':'write-response-modal' + review_id, 'tabindex': '-1', 'aria-labelledby':'modalLabel', 'aria-hidden':'true'});
                var divInner1 = $('<div></div>').addClass('modal-dialog');
                var divInner2 = $('<div></div>').addClass('modal-content');

                var divInner3 = $('<div></div>').addClass('modal-header');
                var h1 = $('<h1></h1>').addClass('modal-title fs-5').attr({'id':'modalLabel' + review_id}).text('Respond to ' + username);
                var buttonClass = 'btn-close' + review_id;
                var button2 = $('<button></button>').addClass(buttonClass).attr({'type':'button','data-bs-dismiss':'modal', 'aria-label':'Close'});

                var divInner4 = $('<div></div>').addClass('modal-body');
                var form = $('<form></form>').css('max-width', '600px');
                var inDiv1 = $('<div></div>').addClass('border p-3 my-3 rounded');
                var inDiv2 = $('<div></div>').addClass('form-floating');
                var textArea = $('<textarea></textarea>').addClass('form-control border-0').attr({'id':'floatingTextarea2'+ review_id, 'required':''}).css({'height':'200px'}); //needs required
                var label = $('<label></label>').attr('for', 'floatingTextarea2').text('Response from the owner');

                var input = $('<input>').addClass('submit-button btn btn-primary position-relative create-response').attr({'id':'submit-response' + review_id, 'type':'button', 'value':'Post Response', 'data-bs-dismiss': 'modal', 'data': review_id}).css({'width':'200px', 'left':'55%'});

                //append
                button.append(i);
                button.append('Write a Response');

                inDiv2.append(textArea);
                inDiv2.append(label);
                inDiv1.append(inDiv2);
                form.append(inDiv1);
                form.append(input);
                divInner4.append(form);

                divInner3.append(h1);
                divInner3.append(button2);

                divInner2.append(divInner3);
                divInner2.append(divInner4);
                divInner1.append(divInner2);
                divOuter.append(divInner1);

                div.append(button);
                div.append(divOuter);
                eyy.append(div);
            });
    });

    // Edit Response
    $(document).on('click', '.edit-response-submit', function () {
        var review_id = $(this).attr("data");
        var edit_response_text = `#edit-floatingTextarea2-` + review_id;
        var currentDate = currDate;
        //var reviewElement = $(this).closest('.user-response');

        // Validate if input fields are empty
        if (!$(edit_response_text).val().trim()) {
            $(edit_response_text).addClass(`is-invalid`);
            return;
        }
        // Get input from fields
        var userResponseText = $(edit_response_text).val().trim();

        $.get("/update-response", { id: review_id, date: currentDate, text: userResponseText });
        $('#rewrite' + review_id).text(userResponseText);
        $(edit_response_text).val(userResponseText);
        alert('Response updated!');
        var closeBtn = `closeBtn-` + review_id;
        document.getElementById(closeBtn).click(); // close modal
    });
});

function hideResponseFunction(ID, show_id, hide_id) {
    var show = document.getElementById(show_id);
    var showRep = document.getElementById(hide_id);
    var btnRep = document.getElementById(ID);

    if (show.style.display === "none") {
        show.style.display = "inline";
        btnRep.text = " • Show Response";
        showRep.style.display = "none";
    } else {
        show.style.display = "none";
        btnRep.text = " • Hide Response";
        showRep.style.display = "inline";
    }
}

function readMoreFunction(dots_id, more_id, myBtn_id) {
    var dots = dots_id;
    var moreText = more_id;
    var btnText = myBtn_id;

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}