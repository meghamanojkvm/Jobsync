const puppeteer = require("puppeteer");

async function scrapeJobDetails() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: 'new' });

  console.log("Opening new page...");
  const page = await browser.newPage();

  // URL of the website you want to scrape
  const websiteUrl = "https://www.flexsin.com/careers/"; // Replace this with the actual URL

  console.log(`Navigating to ${websiteUrl}...`);
  await page.goto(websiteUrl, { waitUntil: "domcontentloaded" });

  // Wait for job cards to be present
  await page.waitForSelector("a .hd");

  // Extract information from each job card
  const jobCards = await page.$$("a .hd");
  for (const jobCard of jobCards) {
    const jobTitle = await jobCard.evaluate(element => element.textContent.trim());
    console.log("Job Title:", jobTitle);

      // Extract href attribute from the anchor element
      const href = await jobCard.evaluate(element => element.parentElement.getAttribute("href"));
      console.log("Job Href:", href);

    // Get the parent element of jobTitle and extract other information
    const parentElement = await jobCard.$x('..');
    
    const experience = await parentElement[0].$eval(".info:nth-child(2)", (element) => element.textContent.trim());
    console.log("Experience:", experience);

    const location = await parentElement[0].$eval(".info:nth-child(3)", (element) => element.textContent.trim());
    console.log("Location:", location);

    const descriptionElement = await parentElement[0].$(".over");
    const description = descriptionElement ? await descriptionElement.evaluate(element => element.textContent.trim()) : "Not available";
    console.log("Description:", description);

    console.log("------------------------");
  }

  console.log("Closing browser...");
  await browser.close();
}

scrapeJobDetails();
