$(document).ready(function () {
  const createTweetElement = function (tweet) {
    console.log(tweet);
    const $tweet = $("<article>").addClass("tweet");
    const $header = $("<header>");

    $header.append(`<img src="${tweet.user.avatars}>`);
    $header.append(`<p>${tweet.user.name}</p>`);
    $header.append(`<p>${tweet.user.handle}</p>`);

    const $tweetText = $("<p>").text(tweet.content.text);
    const $footer = $("<footer>");

    $footer.append(`<p>${timeago(tweet.created_at).format()}</p>`);

    $tweet.append($header);
    $tweet.append($tweetText);
    $tweet.append($footer);

    return $tweet;
  };

  const renderTweets = function (tweets) {
    $("#tweet-container").empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweet-container").prepend($tweet);
    }
  };

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      type: "GET",
      dataType: "json",
      success: function (tweets) {
        renderTweets(tweets);
      },
      error: function (error) {
        console.log("Error:", error);
      },
    });
  };

  $("#tweet-form").submit(function (event) {
    event.preventDefault();

    const data = $(this).serialize();
    const tweetText = $("#tweet-text").val();

    if (tweetText === "" || tweetText === null) {
      $("#error-message").text("Tweet cannot be empty").css("display", "block");
    } else if (tweetText.length > 140) {
      $("#error-message").text("Too many characters").css("display", "block");
    } else {
      $("#error-message").css("display", "none")
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: data,
      })
        .then(loadTweets)
        .catch((error) => error);

      $(".counter").text(140);
      $("#tweet-text").val("");
    }
  });
  loadTweets();
});
