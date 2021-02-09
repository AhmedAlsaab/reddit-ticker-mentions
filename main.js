const reddit = require('./utils/fetch-data');
const report = require('./utils/build-report');
const cron = require('node-cron');
const chalk = require('chalk');

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
    console.log(chalk.blue(await report.buildLogMessage(`CHECKING...`)));

    await runApp();
  });
}

startJob();
