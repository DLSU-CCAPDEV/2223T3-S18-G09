/*
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// for the insertOne
const Review = require('../models/ReviewModel.js');

//inside submit-review

var review = new Review({
    review_id: 1234,
    username: 'uwah',
    establishment_id: 1234,
    title: 'uwah',
    body_desc 'uwah',
    date '2022-09-09',
    edited true,
    rating 5,
    votes {
        numUpvotes: 1,
        numDownvotes: 1,
        upvotes: [uwah],
        downvotes: [uwah]
    },
    photos './uwah.png',
    owner_response_id 123,
});

db.insertOne(Review, review);
*/

// import module `database` from `../models/db.js`
//const db = require('../models/db.js');

// for the insertOne
//const Review = require('../models/ReviewModel.js');

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
        if(!$(`#review-title`).val() && !$(`#floatingTextarea2`).val()) {
            $(`#review-title`).addClass(`is-invalid`);
            $(`#floatingTextarea2`).addClass(`is-invalid`);
            return;
        }
        else if(!$(`#review-title`).val()) {
            $(`#review-title`).addClass(`is-invalid`);
            $(`#floatingTextarea2`).removeClass(`is-invalid`);
            return;
        }
        else if(!$(`#floatingTextarea2`).val()) {
            $(`#floatingTextarea2`).addClass(`is-invalid`);
            $(`#review-title`).removeClass(`is-invalid`);
            return;
        }
        
        // AJAX CALL    
        // Get input from fields
        
        var userReviewText = $('#floatingTextarea2').val();
        var userReviewTitle = $('#review-title').val(); 
        var rating = $('input[name="rating"]:checked').val();
        if (rating == undefined)
            rating = 0;
        var remainingRating = 5 - rating;
        
        // Get establishment that the user will write review for
        var establishment_id = $(`#submit-review`).attr("data");

        $.get('/write-review', { title: userReviewTitle, body_desc: userReviewText, establishment_id: establishment_id, rating: rating }, 
            function (data, status) {
                $('#review-container').append(data);
            });

        /*
        var review = new Review({
            review_id: 1234,
            username: 'uwah',
            establishment_id: 1234,
            title: 'uwah',
            body_desc: 'uwah',
            date: '2022-09-09',
            edited: true,
            rating: 5,
            votes: {
                numUpvotes: 1,
                numDownvotes: 1,
                upvotes: [uwah],
                downvotes: [uwah]
            },
            photos: './uwah.png',
            owner_response_id: 1234,
        });
        db.insertOne(Review, review);*/

        

        // set default values if inputs are empty
        // if (userReviewText == '') {
        //     userReviewText = 'No review text';
        // }

        // if (userReviewTitle == '') {
        //     userReviewTitle = 'Untitled';
        // }

//         var review_container = $('#review-container');
//         // elements for the picture part
//         var review = $('<div></div>').addClass('row mb-5 user-review');
//         var outerDiv1 = $('<div></div>').addClass('col-md-2 mb-3 pt-3');
//         var innerDiv1 = $('<div></div>').addClass('container');
//         var innerDiv1Child1 = $('<div></div>').addClass('row mb-3 justify-content-center');
        

//         var innerDiv1Child2 = $('<div></div>').addClass('row justify-content-center text-center');

//         var carouselDiv = $('<div></div>').addClass("carousel slide mb-3");
//         var outerDiv2 = $('<div><div>').addClass('col-md-10 position-relative');

//         var outerDiv2Child1 = $('<div></div>').addClass('d-flex justify-content-end position-absolute start-100 top-0');

//         var deleteButton = $('<button></button>').addClass('btn btn-danger ml-auto btn-close delete-review t');

//         var button = $('<button></button>').addClass('btn btn-danger edit-review text-nowrap')
//             .attr('data-bs-toggle', 'modal')
//             .attr('data-bs-target', '#edit-review-modal');



//         var editButtonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
//   <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
//   <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
// </svg>`;

//         $(button).html(editButtonSVG);
//         $(button).css('font-size', '10px');
//         $(button).click(function () {
//             // Handle edit button click event
//             var reviewContainer = $(this).closest('.user-review');
//             var reviewTitle = reviewContainer.find('h4').text();
//             var reviewText = reviewContainer.find('p').eq(0).text();
//             var outerDiv2Child2 = $(this).closest('.user-review').find('.position-relative > h6');

//             // Populate the edit modal/form fields with the existing review data
//             $('#edit-review-title').val(reviewTitle);
//             $('#edit-floatingTextarea2').val(reviewText);

//             // Default values if inputs are empty
//             if ($('#edit-review-title').val() == '') {
//                 $('#edit-review-title').val(reviewTitle);
//             }

//             if ($('#edit-floatingTextarea2').val() == '') {
//                 $('#edit-floatingTextarea2').val(reviewText);
//             }

//             // Update the review on submit
//             $('#edit-review-submit').off('click').on('click', function () {
//                 var editedTitle = $('#edit-review-title').val();
//                 var editedText = $('#edit-floatingTextarea2').val();
//                 var editedRating = $('input[name="edit-rating"]:checked').val();

//                 // Update the review content
//                 reviewContainer.find('h4').text(editedTitle);
//                 reviewContainer.find('p').eq(0).text(editedText);

//                 // Update images
//                 var editCarouselItemsHtml = "";
//                 var editSliders = "";
//                 var filesEdit = $('#edit-formFileMultiple').get(0).files; // Retrieve the selected files
//                 if (filesEdit.length != 0) {
//                     for (var i = 0; i < filesEdit.length; i++) {
//                         var activeClass = i === 0 ? "active" : ""; // Add 'active' class to the first carousel item
//                         var imageUrl = URL.createObjectURL(filesEdit[i]);

//                         var slider = `
//                             <button type="button" data-bs-target="#${random_id}" data-bs-slide-to="${i}" class="${activeClass}"
//                                 aria-label="Slide ${i+1}"></button>
//                             `;

//                         if(i == 0) {
//                             var slider = `
//                             <button type="button" data-bs-target="#${$(this).parent().attr('id')}" data-bs-slide-to="${i}" class="${activeClass}"
//                                 aria-current="true" aria-label="Slide ${i+1}"></button>
//                             `;
//                         } 

//                         var carouselItemHtml = `
//                             <div class="carousel-item ${activeClass}">
//                                 <img src="${imageUrl}" class="d-block w-100" alt="...">
//                             </div>`;
//                         editCarouselItemsHtml += carouselItemHtml;
//                         editSliders += slider;
//                     }
//                 }

//                 reviewContainer.find('.carousel-indicators').html('');
//                 reviewContainer.find('.carousel-indicators').html(editSliders);
//                 reviewContainer.find('.carousel').find('.carousel-inner').html(editCarouselItemsHtml);

//                 // Remove the existing rating
//                 outerDiv2Child2.empty();

//                 // create rating again based on edited rating
//                 for (var i = 0; i < editedRating; i++) {
//                     var checkedStar = $('<span><span>').addClass('fa fa-star');
//                     var space = $('<span><span>').text(' ');
//                     outerDiv2Child2.append(checkedStar).append(space);
//                 }

//                 for (var i = 0; i < 5 - editedRating; i++) {
//                     var unCheckedStar = $('<span><span>').addClass('fa fa-star-o');
//                     var space = $('<span><span>').text(' ');
//                     outerDiv2Child2.append(unCheckedStar).append(space);
//                 }

//                 var text = $('<span></span>').text(' • Reviewed on ' + currDateString + ' • Edited');

//                 outerDiv2Child2.append(text);

//                 // Close the modal or form
//                 $('#edit-review-modal').modal('hide');
//                 $('#edit-formFileMultiple').val('');
//             }); text
//         });

//         var outerDivChild0 = $('<div></div>').addClass('d-flex justify-content-end position-absolute top-0 p-0');
//         outerDivChild0.append(button);
//         $(outerDivChild0).css('max-width', '100%');
//         $(outerDivChild0).css('left', '95%');


//         var outerDiv2Child2 = $('<h6></h6>').addClass('star-group');
//         var text = $('<span></span>').text(' • Reviewed on ' + currDateString);

//         var outerDiv2Child3 = $('<h4></h4>').text(userReviewTitle);
//         $(outerDiv2Child3).css('font-weight', '600');
//         var outerDiv2Child4 = $('<p></p>').text(userReviewText);

//         // Input photos
//         var files = $('#formFileMultiple').get(0).files; // Retrieve the selected files
//         /* 
//         Need to figure out a way to generate unique id for each entry. 
//         Random is just temporary. Maybe we can use a global variable in the future to keep track of entries of all users
//         */
//         var random_id = "carousel" + Math.floor(Math.random() * 1000);
//         carouselDiv.attr(`id`, random_id)
        
//         if (files.length != 0) {
//             var carouselItemsHtml = "";
//             var sliders = "";
        
//             for (var i = 0; i < files.length; i++) {
//                 if(i == 0) {

//                 } 

//                 var activeClass = i === 0 ? "active" : ""; // Add 'active' class to the first carousel item
//                 var imageUrl = URL.createObjectURL(files[i]);
                
//                 var slider = `
//                   <button type="button" data-bs-target="#${random_id}" data-bs-slide-to="${i}" class="${activeClass}"
//                     aria-label="Slide ${i+1}"></button>
//                 `;

//                 if(i == 0) {
//                     var slider = `
//                     <button type="button" data-bs-target="#${random_id}" data-bs-slide-to="${i}" class="${activeClass}"
//                         aria-current="true" aria-label="Slide ${i+1}"></button>
//                     `;
//                 } 
        
//                 var carouselItemHtml = `
//                   <div class="carousel-item ${activeClass}">
//                     <img src="${imageUrl}" class="d-block w-100" alt="...">
//                   </div>
//                 `;
        
//                 sliders += slider;
//                 carouselItemsHtml += carouselItemHtml;
//             }
        
//             var carousel_html = `
//             <!-- Image Carousel -->
//             <div id="${random_id}" class="carousel slide mb-3">
//               <div class="carousel-indicators">${sliders}</div>
//               <div class="carousel-inner" role="listbox">${carouselItemsHtml}</div>
//               <button class="carousel-control-prev" type="button" data-bs-target="#${random_id}" data-bs-slide="prev">
//                 <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//                 <span class="visually-hidden">Previous</span>
//               </button>
//               <button class="carousel-control-next" type="button" data-bs-target="#${random_id}" data-bs-slide="next">
//                 <span class="carousel-control-next-icon" aria-hidden="true"></span>
//                 <span class="visually-hidden">Next</span>
//               </button>
//             </div>`;
//         }
        
//         carouselDiv.append(carousel_html);
        



//         var votegroup = `<div class="container d-flex px-2">
//             <p class="mx-2">Was this review helpful to you?</p>
//             <span class="upvote" style="color: var(--accent1);">
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">' + '<path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/></svg>
//             </span>
//             <span class="downvote" style="color: var(--accent1);">
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">' + '<path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
//             </svg>
//             </span>
//             </div>
//             </div>`;


//         $(innerDiv1).append(innerDiv1Child1);
//         $(innerDiv1).append(innerDiv1Child2);
//         $(outerDiv1).append(innerDiv1);

//         outerDiv2Child1.append(deleteButton);

//         // append the checked star, rating times
//         for (var i = 0; i < rating; i++) {
//             var checkedStar = $('<span><span>').addClass('fa fa-star');
//             var space = $('<span><span>').text(' ');
//             outerDiv2Child2.append(checkedStar).append(space);
//         }

//         for (var i = 0; i < remainingRating; i++) {
//             var unCheckedStar = $('<span><span>').addClass('fa fa-star-o');
//             var space = $('<span><span>').text(' ');
//             outerDiv2Child2.append(unCheckedStar).append(space);
//         }

//         outerDiv2Child2.append(text);

//         $(outerDiv2).append(outerDivChild0);
//         $(outerDiv2).append(outerDiv2Child1);
//         $(outerDiv2).append(outerDiv2Child2);
//         $(outerDiv2).append(outerDiv2Child3);
//         $(outerDiv2).append(outerDiv2Child4);
//         $(outerDiv2).append(carouselDiv);
//         $(outerDiv2).append(votegroup);

//         $(review).append(outerDiv1);
//         $(review).append(outerDiv2);

//         $(review_container).append(review);

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




    // delete review

    
    $(document).on('click', '.delete-review', function () {
        var review_id = $(this).attr("data");
        var reviewElement = $(this).closest('.user-review');
        console.log(reviewElement)
        $.get('/delete-review', { review_id: review_id }, 
            function (data, status) {
                reviewElement.remove();
            });
    });      

    // create an edit review function
    // change later when there's a button for editing



    // SCRIPT FOR VOTING
    // Upvote
    $(document).on('click', '.upvote', function () {

        // Remove active vote
        if ($(this).hasClass('active-vote')) {
            $(this).removeClass('active-vote');
            $(this).html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                </svg>`);
        }
        // Add active vote and replace icons
        else {
            $(this).html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"/>
                </svg>`);
            $(this).addClass('active-vote');

            var dv = $(this).next('.downvote');
            dv.removeClass('active-vote');
            dv.html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                </svg>`);

        }
    });

    // Downvote
    $(document).on('click', '.downvote', function () {
        // Remove active vote
        if ($(this).hasClass('active-vote')) {
            $(this).removeClass('active-vote');
            $(this).html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                <path d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856 0 .289-.036.586-.113.856-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a9.877 9.877 0 0 1-.443-.05 9.364 9.364 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964l-.261.065zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a8.912 8.912 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.224 2.224 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.866.866 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1z"/>
                </svg>`);
        }
        // Add active vote and replace icons
        else {
            $(this).html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-down-fill" viewBox="0 0 16 16">
                <path d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.378 1.378 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51.136.02.285.037.443.051.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.896 1.896 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2.094 2.094 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.162 3.162 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.823 4.823 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591z"/>
                </svg>`);
            $(this).addClass('active-vote');
            var uv = $(this).prev('.upvote');
            uv.removeClass('active-vote');
            uv.html(`
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                </svg>`);
        }
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