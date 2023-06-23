$(document).ready(function () {
    // Your jQuery code goes here
    // For example:
    const USERNAME = "Brian Gabini";
    const USERPFP = "./images/user-pfp.jpg";
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const defaultLikes = 0;

    var currDate = new Date();

    var currDateString = monthNames[currDate.getMonth()] + " " + currDate.getDate() + ", " + currDate.getFullYear();

    // form submission for the review
    $('#submit-review').click(function () {
        var review_container = $('#review-container');

        var userReviewText = $('#floatingTextarea2').val();

        var userReviewTitle = $('#review-title').val();

        // get the rating 
        var rating = $('input[name="rating"]:checked').val();
        var remainingRating = 5 - rating;

        // elements for the picture part
        var review = $('<div></div>').addClass('row mb-5 user-review');
        var outerDiv1 = $('<div></div>').addClass('col-md-2 mb-3 pt-3');
        var innerDiv1 = $('<div></div>').addClass('container');
        var innerDiv1Child1 = $('<div></div>').addClass('row mb-3 justify-content-center');
        var userPFP = $('<img>').addClass('rounded-circle').attr('src', USERPFP);
        $(userPFP).css('width', '100px');
        $(userPFP).css('height', '75px');
        var innerDiv1Child2 = $('<div></div>').addClass('row justify-content-center text-center');
        var userName = $('<h6></h6>').text(USERNAME);

        var outerDiv2 = $('<div><div>').addClass('col-md-10 position-relative');

        var outerDiv2Child1 = $('<div></div>').addClass('d-flex justify-content-end position-absolute start-100 top-0');

        var deleteButton = $('<button></button>').addClass('btn btn-danger ml-auto btn-close delete-review t');

        var button = $('<button></button>').addClass('btn btn-danger edit-review text-nowrap')
            .attr('data-bs-toggle', 'modal')
            .attr('data-bs-target', '#edit-review-modal');


        $(button).text('✎');
        $(button).css('font-size', '10px');
        $(button).click(function () {
            // Handle edit button click event
            var reviewContainer = $(this).closest('.user-review');
            var reviewTitle = reviewContainer.find('h4').text();
            var reviewText = reviewContainer.find('p').eq(0).text();
            var outerDiv2Child2 = $(this).closest('.user-review').find('.position-relative > h6');

            // Populate the edit modal/form fields with the existing review data
            $('#edit-review-title').val(reviewTitle);
            $('#edit-floatingTextarea2').val(reviewText);

            // Update the review on submit
            $('#edit-review-submit').off('click').on('click', function () {
                var editedTitle = $('#edit-review-title').val();
                var editedText = $('#edit-floatingTextarea2').val();
                var editedRating = $('input[name="edit-rating"]:checked').val();

                // Update the review content
                reviewContainer.find('h4').text(editedTitle);
                reviewContainer.find('p').eq(0).text(editedText);


                // Remove the existing rating
                outerDiv2Child2.empty();

                // create rating again based on edited rating
                for (var i = 0; i < editedRating; i++) {
                    var checkedStar = $('<span><span>').addClass('fa fa-star checked');
                    var space = $('<span><span>').text(' ');
                    outerDiv2Child2.append(checkedStar).append(space);
                }

                for (var i = 0; i < 5 - editedRating; i++) {
                    var unCheckedStar = $('<span><span>').addClass('fa fa-star');
                    var space = $('<span><span>').text(' ');
                    outerDiv2Child2.append(unCheckedStar).append(space);
                }

                var text = $('<span></span>').text(' • Reviewed on ' + currDateString + ' • Edited');


                outerDiv2Child2.append(text);

                // Close the modal or form
                $('#edit-review-modal').modal('hide');
            }); text
        });

        var outerDivChild0 = $('<div></div>').addClass('d-flex justify-content-end position-absolute top-0 p-0');
        outerDivChild0.append(button);
        $(outerDivChild0).css('max-width', '100%');
        $(outerDivChild0).css('left', '95%');


        var outerDiv2Child2 = $('<h6></h6>').addClass('star-group');
        var text = $('<span></span>').text(' • Reviewed on ' + currDateString);

        var outerDiv2Child3 = $('<h4></h4>').text(userReviewTitle);
        $(outerDiv2Child3).css('font-weight', '600');
        var outerDiv2Child4 = $('<p></p>').text(userReviewText);
        var outerDiv2Child5 = $('<p></p>').text('👍👎');

        $(innerDiv1Child1).append(userPFP);
        $(innerDiv1Child2).append(userName);
        $(innerDiv1).append(innerDiv1Child1);
        $(innerDiv1).append(innerDiv1Child2);
        $(outerDiv1).append(innerDiv1);

        outerDiv2Child1.append(deleteButton);

        // append the checked star, rating times
        for (var i = 0; i < rating; i++) {
            var checkedStar = $('<span><span>').addClass('fa fa-star checked');
            var space = $('<span><span>').text(' ');
            outerDiv2Child2.append(checkedStar).append(space);
        }

        for (var i = 0; i < remainingRating; i++) {
            var unCheckedStar = $('<span><span>').addClass('fa fa-star');
            var space = $('<span><span>').text(' ');
            outerDiv2Child2.append(unCheckedStar).append(space);
        }

        outerDiv2Child2.append(text);

        $(outerDiv2).append(outerDivChild0);
        $(outerDiv2).append(outerDiv2Child1);
        $(outerDiv2).append(outerDiv2Child2);
        $(outerDiv2).append(outerDiv2Child3);
        $(outerDiv2).append(outerDiv2Child4);
        $(outerDiv2).append(outerDiv2Child5);

        $(review).append(outerDiv1);
        $(review).append(outerDiv2);

        $(review_container).append(review);

        // reset input fields after submission
        $('#floatingTextarea2').val('');
        $('#review-title').val('');
        $('input[name="rating"]:checked').prop('checked', false);

        alert('Review submitted!');

    });

    // delete review
    // change later when there's a button for deleting
    $(document).on('click', '.delete-review', function () {
        $(this).parent().parent().parent().remove();
        alert('Review removed!');
    });

    // create an edit review function
    // change later when there's a button for editing
});