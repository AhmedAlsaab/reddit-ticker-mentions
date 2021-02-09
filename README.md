# Reddit-Ticker-Mentions
Scans through new Reddit posts titles and gathers mentioned company tickers via the Reddit API



![alt text](https://i.imgur.com/YtMEqCD.png)

# Running the app

Clone the repo and run the following from the root directory:

```npm run start```

# Reddit API Credentials

At the root directory, you need a file called secrets.js. This file should contain your Reddit API key credentials and look like the following:

```
const redditSecrets = {
  userAgent: 'your-reddit-app-name',
  clientId: 'your-client-id',
  clientSecret: 'your-secret-id',
  refreshToken: 'your-refresh-token',
};

module.exports = {
  redditSecrets,
};
```

# How it works

This app send an API request to get all newely created posts from a number of specified sub-Reddits. It iterates through each post title and using Regex, tries to find company tickers; this is accomplished by getting the string following the $ symbol in a post, which is why it currently won't detect tickers without the $ symbol. It will console log a table with a tally of what was mentioned and how often. It only scans unique posts, in other words, if the app has already scanned through a specific post title in a previous iteration, it will not extract the ticker from it (this is done by assessing the post id). This cycle happens every minute using a Cron schedule.

# Modifying tracked sub-Reddits

In the main.js file, you can adjust the array of sub-Reddits to remove/add whatever sub-Reddits you want to scan through:

```
 const subReditsToScan = [
    'StockMarket',
    'Pennystock',
    'stocks',
    'investing',
    'wallstreetbets',
  ];
```
