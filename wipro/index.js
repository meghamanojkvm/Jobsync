//-------------------WIPRO India JOB IN ARRAY-------------------------

const puppeteer = require('puppeteer');

async function scrapeJobDetails() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const baseUrl = 'https://careers.wipro.com';
  const maxPages = 5;
  const scrapedData = [];

  for (let currentPage = 1; currentPage <= maxPages; currentPage++) {
    const url = `${baseUrl}/careers-home/jobs?keywords=Software%20development&sortBy=relevance&limit=10&country=India&page=${currentPage}`;
    console.log(`Navigating to ${url}...`);

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('.mat-expansion-panel-header', {
      visible: true,
    });

    const jobCards = await page.$$('.mat-expansion-panel-header');
    for (const jobCard of jobCards) {
      const tempData = {};

      tempData.jobTitle = await jobCard.$eval('.job-title span', (element) =>
        element.textContent.trim()
      );

      const jobLinkRelative = await jobCard.$eval(
        '.job-title a',
        (anchorElement) => anchorElement.getAttribute('href')
      );
      tempData.jobLink = `${baseUrl}${jobLinkRelative}`;

      tempData.jobLocation = await jobCard.$eval(
        '.location.label-value',
        (element) => element.textContent.trim()
      );

      tempData.postingDate = await jobCard.$eval(
        '.posted_date.label-value',
        (element) => element.textContent.trim()
      );
      // console.log(tempData.postingDate);
      let date = tempData.postingDate.split('/');
      const tempSwapVariable = date[0];
      date[0] = date[1];
      date[1] = tempSwapVariable;
      tempData.postingDate = date.join('/');

      tempData.companyLogo = '/images/Wipro.png';
      tempData.companyName = 'Wipro';

      scrapedData.push(tempData);
    }

    console.log(`Scraped data from page ${currentPage}`);
  }

  console.log('Scraped data:', scrapedData);

  console.log('Closing browser...');
  await browser.close();

  fetch('http://localhost:3000/api/job/post-jobs', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(scrapedData),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result.message == 'Jobs Uploaded') {
        console.log('Wipro Jobs Posted Successfully!!!');
      }
      // reset();
    });
}

scrapeJobDetails();
