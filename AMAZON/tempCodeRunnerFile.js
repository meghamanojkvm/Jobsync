const puppeteer = require("puppeteer");

async function scrapeJobDetails() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({ headless: "new" });

  console.log("Opening new page...");
  const page = await browser.newPage();

  // URL of the website you want to scrape
  const websiteUrl =
    "https://www.amazon.jobs/content/en/job-categories/software-development"; // Replace this with the actual URL

  console.log(`Navigating to ${websiteUrl}...`);
  await page.goto(websiteUrl, { waitUntil: "domcontentloaded" });

  // Wait for the job cards to be present
  await page.waitForSelector(".job-card-module_root__QYXVA");

  // Extract information from each job card
  const jobCards = await page.$$(".job-card-module_root__QYXVA");
  for (const jobCard of jobCards) {
    // Extract job title
    const jobTitle = await jobCard.$eval(
      ".header-module_mobile__Nl1un.header-module_title__9-W3R",
      (element) => element.textContent.trim()
    );
    console.log("Job Title:", jobTitle);
    const jobLink = await jobCard.$eval(
      ".header-module_mobile__Nl1un.header-module_header__pAds2 a",
      (anchorElement) => anchorElement.getAttribute("href")
    );

    console.log("Job Link:", jobLink);

    // Extract location
    const location = await jobCard.$eval(
      ".metadatum-module_text__ncKFr.css-1ruyw7v",
      (element) => element.textContent.trim()
    );
    console.log("Location:", location);

    // Extract job description
    const jobDescription = await jobCard.$eval(
      ".job-card-module_content__8sS0J",
      (element) => element.textContent.trim()
    );
    console.log("Job Description:", jobDescription);

    // Extract updated date using a different approach
    const updatedDateElement = await jobCard.evaluateHandle(() => {
      const elements = Array.from(document.querySelectorAll(".css-1ruyw7v"));
      const updatedElement = elements.find((element) =>
        element.textContent.includes("Updated")
      );
      return updatedElement ? updatedElement.textContent.trim() : null;
    });

    const updatedDate =
      (await updatedDateElement.jsonValue()) || "Not available";
    console.log("Updated Date:", updatedDate);

    console.log("------------------------");
  }

  console.log("Closing browser...");
  await browser.close();
}

scrapeJobDetails();
