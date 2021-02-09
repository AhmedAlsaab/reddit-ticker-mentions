const snoowrap = require('snoowrap');
const secrets = require('../secret');
const chalk = require('chalk');
const report = require('./build-report');

async function client() {
  const r = new snoowrap({
    userAgent: secrets.redditSecrets.userAgent,
    clientId: secrets.redditSecrets.clientId,
    clientSecret: secrets.redditSecrets.clientSecret,
    refreshToken: secrets.redditSecrets.refreshToken,
  });
  return r;
}

const alreadyScannedPostIds = [];

async function getMentionedStockTickers(subRedditsToLookThrough) {
  let tickersMentioned = [];

  const r = await client();

  for await (const sub of subRedditsToLookThrough) {
    const subreddit = await r.getSubreddit(sub);
    const newPosts = await subreddit.getNew();

    for await (const newPost of newPosts) {
      if (newPost.title.match(/\$([A-Z])\w+/g)) {
        if (!alreadyScannedPostIds.includes(newPost.id)) {
          const getTicker = await newPost.title.match(/\$([A-Z])\w+/g)[0];

          console.log(
            chalk.green(
              await report.buildLogMessage(`FOUND A NEW MENTION: ${getTicker}`)
            )
          );

          tickersMentioned.push(getTicker);

          alreadyScannedPostIds.push(newPost.id);
        }
      }
    }
  }

  return tickersMentioned;
}

module.exports = {
  getMentionedStockTickers,
};
