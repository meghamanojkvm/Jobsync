const puppeteer = require('puppeteer');

async function scrapeJobDetails() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const baseUrl =
    'https://www.amazon.jobs/content/en/job-categories/software-development?country%5B%5D=IN';
  const maxPages = 1; // Set the maximum number of pages to scrape

  // saving scraper data
  const amazonScrapedData = [];

  for (let currentPage = 1; currentPage <= maxPages; currentPage++) {
    const url = `${baseUrl}&page=${currentPage}`;
    console.log(`Navigating to ${url}...`);

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('.job-card-module_root__QYXVA');

    const jobCards = await page.$$('.job-card-module_root__QYXVA');
    for (const jobCard of jobCards) {
      const tempData = {};

      const jobTitle = await jobCard.$eval(
        '.header-module_title__9-W3R',
        (element) => element.textContent.trim()
      );
      tempData.jobTitle = jobTitle;

      const jobLink = await jobCard.$eval(
        '.header-module_title__9-W3R',
        (element) => element.href
      );
      tempData.jobLink = jobLink;

      const location = await jobCard.$eval(
        '.metadatum-module_text__ncKFr',
        (element) => element.textContent.trim()
      );
      tempData.jobLocation = location;

      const updatedDateElement = await jobCard.evaluate(() => {
        const elements = Array.from(
          document.querySelectorAll('.metadatum-module_text__ncKFr')
        );
        const updatedElement = elements.find((element) =>
          element.textContent.includes('Updated')
        );
        return updatedElement ? updatedElement.textContent.trim() : null;
      });

      const updatedDate = updatedDateElement || 'Not available';
      tempData.postingDate = updatedDate.replace('Updated: ', '');

      const jobDescription = await jobCard.$eval(
        '.job-card-module_content__8sS0J',
        (element) => element.textContent.trim()
      );
      tempData.description = jobDescription;

      tempData.companyLogo = '/images/Amazon.png';
      tempData.companyName = 'Amazon';

      amazonScrapedData.push(tempData);
    }

    console.log(`Scraped data from page ${currentPage}`);

    const nextButton = await page.$('[aria-label="Next page"]');
    if (nextButton) {
      await nextButton.click();
    } else {
      console.log('No more pages to load.');
      break;
    }

    await page.waitForTimeout(2000);
  }
  // console.log(amazonScrapedData);

  console.log('Closing browser...');
  await browser.close();

  fetch('http://localhost:3000/api/job/post-jobs', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(amazonScrapedData),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      if (result.message == 'Jobs Uploaded') {
        console.log('Amazon Jobs Posted Successfully!!!');
      }
      // reset();
    });
}

scrapeJobDetails();
