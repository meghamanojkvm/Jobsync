// ----------------------------------- ford--------------------------------------------------------------------

const puppeteer = require('puppeteer');

async function scrapeJobDetails() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });

  console.log('Opening new page...');
  const page = await browser.newPage();

  // URL of the website you want to scrape
  const websiteUrl =
    'https://efds.fa.em5.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1/requisitions?keyword=software+developer&location=India&locationId=300000000425349&locationLevel=country&mode=location';

  console.log(`Navigating to ${websiteUrl}...`);
  await page.goto(websiteUrl, { waitUntil: 'domcontentloaded' });

  // Wait for the job cards to be present
  await page.waitForSelector('.job-list-item__link');

  // Extract information from each job card
  const jobCards = await page.$$('.job-list-item__link');
  const scrapedData = [];
  for (const jobCard of jobCards) {
    const tempData = {};

    // Extract job title
    tempData.jobTitle = await jobCard.$eval('.job-tile__title', (element) =>
      element.textContent.trim()
    );

    // Extract job link
    tempData.jobLink = await jobCard.evaluate((anchorElement) =>
      anchorElement.getAttribute('href')
    );
    // Extract location
    tempData.jobLocation = await jobCard.$eval(
      ".job-tile__subheader span[data-bind='html: primaryLocation']",
      (element) => element.textContent.trim()
    );

    // Extract posted date
    tempData.postingDate = await jobCard.$eval(
      ".job-tile__subheader span[data-bind='text: job.postedDate']",
      (element) => element.textContent.trim()
    );

    tempData.companyLogo = '/images/Ford.png';
    tempData.companyName = 'Ford';

    scrapedData.push(tempData);
  }

  // console.log('Scraped data:', scrapedData);

  console.log('Closing browser...');
  await browser.close();

  // return scrapedData;

  fetch('http://localhost:3000/api/job/post-jobs', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(scrapedData),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result.message == 'Jobs Uploaded') {
        console.log('Ford Jobs Posted Successfully!!!');
      }
      // reset();
    });
}

scrapeJobDetails();
