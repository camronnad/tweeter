$(document).ready(function () {
  // Function to create a tweet element based on a tweet object
  const createTweetElement = function (tweet) {
    const $tweet = $("<article>").addClass("tweet"); // Create a new article element with "tweet" class
    const $header = $("<header>").addClass("tweet-header");
  
    const $userDiv = $("<div>").addClass("div-header"); // Create a div element to wrap user information
  
    // Append user avatar and name to the user div
    $userDiv.append(`<img src=${tweet.user.avatars}>`); // Append user avatar image
    $userDiv.append(`<span>${tweet.user.name}</span>`); // Append user name
  
    $header.append($userDiv); // Append the user div to the header
    $header.append(`<span class="tweet-handle">${tweet.user.handle}</span>`); // Append user handle to the header
  
    const $tweetText = $("<p>").text(tweet.content.text); // Create a paragraph element for the tweet text
    const $footer = $("<footer>"); // Create a footer element for timestamp
  
    $footer.append(`<p>${timeago(tweet.created_at).format()}</p>`); // Append formatted timestamp to the footer
  
    $tweet.append($header); // Append header to the tweet element
    $tweet.append($tweetText); // Append tweet text to the tweet element
    $tweet.append($footer); // Append footer to the tweet element
  
    return $tweet; // Return the created tweet element
  };
  
  

  // Function to render tweets on the page
  const renderTweets = function (tweets) {
    $("#tweet-container").empty(); // Clear the tweet container

    // Iterate over the tweets and prepend each tweet element to the container
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").prepend($tweet);
    }
  };

  // Function to load tweets from the server
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      type: "GET",
      dataType: "json",
      success: function (tweets) {
        renderTweets(tweets); // Render the received tweets
      },
      error: function (error) {
        console.log("Error:", error); // Log any errors to the console
      },
    });
  };

  // Event handler for the tweet form submission
  $("#tweet-form").submit(function (event) {
    event.preventDefault();

    const data = $(this).serialize(); // Get the form data
    const tweetText = $("#tweet-text").val().trim(); // Get the trimmed value of the tweet text input

    // Perform validation checks on the tweet text
    if (tweetText === "" || tweetText === null) {
      $("#error-message").text("Tweet cannot be empty").css("display", "block"); // Display error message for empty tweet
    } else if (tweetText.length > 140) {
      $("#error-message").text("Too many characters").css("display", "block"); // Display error message for exceeding character limit
    } else {
      $("#error-message").css("display", "none"); // Hide error message if the text is valid

      // Make an AJAX POST request to submit the tweet and reload the tweets
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: data,
      })
        .then(loadTweets) // Reload the tweets
        .catch((error) => error);

      $(".counter").text(140); // Reset the character counter
      $("#tweet-text").val(""); // Clear the tweet text input
    }
  });

  loadTweets(); // Initially load the tweets
});

