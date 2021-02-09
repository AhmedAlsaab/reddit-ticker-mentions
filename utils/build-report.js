const _ = require('lodash');

let tickersMentioned = [];

async function sortMentionedTickers(tickers) {
  if (tickers.length) {
    for await (ticker of tickers) {
      tickersMentioned.push(ticker);
    }
  }

  return _.countBy(tickersMentioned);
}

module.exports = {
  sortMentionedTickers,
};
