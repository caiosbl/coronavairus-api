var Twit = require('twit')

 
var Bot = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
  access_token:         process.env.TWITTER_ACESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACESS_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});


const getTags = () => {
    const tags = ['coronavirus', 'coronavairus', 'news', 'quarentena', 'quarentine', 'brazil', 'brasil'];

    const tagsFormatted = tags.map(tag => `#${tag}`);

    return tagsFormatted.join(' ')
}

exports.postMessage = (message) => Bot.post('statuses/update', { status: `${message} ${getTags()}`.slice(0,280) }, function(err, data, response) {
   if (err) console.log('Fail to post tweet', err);
   else console.log(`Tweet sended with sucess ${message.slice(0,280)}`)
  })
   