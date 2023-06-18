

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


const createTweetElement = function (tweet) {

  const $tweet = $('<article>').addClass('tweet');
  const $header = $('<header>');

  $header.append(`<img src="${tweet.user.avatars}>`)
  $header.append(`<p>${tweet.user.name}</p>`)
  $header.append(`<p>${tweet.user.handle}</p>`)

  const $tweetText = $('<p>').text(tweet.content.text);
  const $footer = $('<footer>');

  $footer.append(`<p>${tweet.created_at}</p>`);

  $tweet.append($header);
  $tweet.append($tweetText);
  $tweet.append($footer);

  return $tweet; 
};

const renderTweets = function(tweets) {
 
  for(let tweet of data) {
     const $tweet = createTweetElement(tweet);
     $('#tweets-container').append($tweet);
  }
}
renderTweets(data);



