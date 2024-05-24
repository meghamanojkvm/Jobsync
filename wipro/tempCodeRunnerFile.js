

const puppeteer = require("puppeteer");

async function scrapeJobDetails() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const baseUrl = "https://careers.wipro.com/careers-home/jobs?keywords=Software%20development&sortBy=relevance";
  const maxPages = 5;
  const wiproScrapedData = [];

  for (let currentPage = 1; currentPage <= maxPages; currentPage++) {
    const url = `${baseUrl}&page=${currentPage}`;
    console.log(`Navigating to ${url}...`);

    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".mat-expansion-panel-header");

    const jobCards = await page.$$(".mat-expansion-panel-header");
    for (const jobCard of jobCards) {
      const tempData = {};

      const jobTitle = await jobCard.$eval(
        ".job-title span",
        (element) => element.textContent.trim()
      );
      tempData.jobTitle = jobTitle;

      const jobLink = await jobCard.$eval(
        ".job-title a",
        (anchorElement) => anchorElement.getAttribute("href")
      );
      tempData.jobLink = jobLink;

      const location = await jobCard.$eval(
        ".location.label-value",
        (element) => element.textContent.trim()
      );
      tempData.location = location;

      const postedDate = await jobCard.$eval(
        ".posted_date.label-value",
        (element) => element.textContent.trim()
      );
      tempData.postedDate = postedDate;

      wiproScrapedData.push(tempData);
    }

    console.log(`Scraped data from page ${currentPage}`);

    // Check if there is a next page button
    const nextPageButtonDisabled = await page.evaluate(() => {
      return document.querySelector('.mat-paginator-navigation-next').classList.contains('mat-button-disabled');
    });

    if (nextPageButtonDisabled) {
      console.log("No more pages to load.");
      break;
    }

    // Click the next page button
    await page.click('.mat-paginator-navigation-next');
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  console.log("Scraped data:", wiproScrapedData);

  console.log("Closing browser...");
  await browser.close();

  // Return the scraped data
  return wiproScrapedData;
}

// Call the function and handle the returned data
scrapeJobDetails()
  .then((data) => {
    // Display first 5 pages of scraped data
    console.log("First 5 pages of scraped data:");
    for (let i = 0; i < 5; i++) {
      console.log(`Page ${i + 1}:`, data[i]);
    }
  })
  .catch((error) => console.error("Error:", error));