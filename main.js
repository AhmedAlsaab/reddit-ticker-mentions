const reddit = require('./utils/fetch-data');
const report = require('./utils/build-report');
const moment = require('moment');
const cron = require('node-cron');

async function runApp() {
  const subReditsToScan = [
    'StockMarket',
    'Pennystock',
    'stocks',
    'investing',
    'wallstreetbets',
  ];

  const tickers = await reddit.getMentionedStockTickers(subReditsToScan);

  const data = await report.sortMentionedTickers(tickers);

  console.table(data);
}

async function startJob() {
  cron.schedule('* * * * *', async () => {
    console.log(`[Starting Check...] :: [${moment().format('h:mm:ss a')}]`);
    await runApp();
  });
}

startJob();
