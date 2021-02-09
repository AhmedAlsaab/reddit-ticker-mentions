const _ = require('lodash');
const moment = require('moment');
const chalk = require('chalk');

let tickersMentioned = [];

async function sortMentionedTickers(tickers) {
  if (tickers.length) {
    for await (ticker of tickers) {
      tickersMentioned.push(ticker);
    }
  } else {
    console.log(chalk.magenta(await buildLogMessage('NO NEW MENTIONS')));
  }

  return _.countBy(tickersMentioned);
}

async function buildLogMessage(message) {
  return `[${moment().format('h:mm:ss a')}] :: [${message}]`;
}

module.exports = {
  sortMentionedTickers,
  buildLogMessage,
};
