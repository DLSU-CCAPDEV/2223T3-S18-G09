$(document).ready(function () {
    $('.upvote').on('click', function () {
        var review_id = $(this).attr('data');

        $.get('/upvote', { review_id: review_id }, function (data) {

            if (data.success) {
                console.log('success');

                // change the number of upvotes and downvotes using jquery
                $(this).siblings('.numUpvotes').text(data.numUpvotes);
                $(this).siblings('.numDownvotes').text(data.numDownvotes);
            }
        });
    });

    $('.downvote').on('click', function () {
        var review_id = $(this).attr('data');

        $.get('/downvote', { review_id: review_id }, function (data) {

            if (data.success) {
                console.log('success');

                // change the number of upvotes and downvotes using jquery
                $(this).siblings('.numUpvotes').text(data.numUpvotes);
                $(this).siblings('.numDownvotes').text(data.numDownvotes);
            }

        });
    });
});