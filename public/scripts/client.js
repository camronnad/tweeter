$(document).ready(function() {
 



const createTweetElement = function (tweet) {

  const $tweet = $('<article>').addClass('tweet');
  const $header = $('<header>');

  $header.append(`<img src="${tweet.user.avatars}>`)
  $header.append(`<p>${tweet.user.name}</p>`)
  $header.append(`<p>${tweet.user.handle}</p>`)

  const $tweetText = $('<p>').text(tweet.content.text);
  const $footer = $('<footer>');

  $footer.append(`<p>${timeago(tweet.created_at).format()}</p>`);

  $tweet.append($header);
  $tweet.append($tweetText);
  $tweet.append($footer);

  return $tweet;
};

const renderTweets = function (tweets) {

  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweet-container').append($tweet);
  }
};




  $('#tweet-form').submit(function (event) {
    event.preventDefault();

    const data = $(this).serialize();

    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: data,
      success: function (response) {
        //refresh tweets
      },
      error: function (error) {

      }
    });
  });




  const loadTweets = function() {
      $.ajax({
        url: '/tweets',
        type: 'GET',
        dataType: 'json',
        success: function(tweets) {
          console.log(tweets);
          renderTweets(tweets);
           // This will log the array of tweets to the console
          // Here you can add code to handle the data and update your webpage
        },
        error: function(error) {
          console.log('Error:', error);
          // Here you can add code to handle any errors
        }
      });
    }
    
    // Call the function to load the tweets
    loadTweets();
    

  });


