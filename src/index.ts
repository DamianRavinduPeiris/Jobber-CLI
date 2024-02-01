const puppeteer = require("puppeteer");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log("Welcome - Jobber CLI V.0.1");

console.log("Please enter the following details to get started!");
readline.question("Please enter a site : ", (site: string) => {
  readline.question("Please enter a job title : ", (title: string) => {
    scrapeAndApply(site,title);
    readline.close();
  });
});




async function scrapeAndApply(webSite: string,title:string){
    const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  
  await page.goto("https://www.google.com");

  
  await page.waitForSelector(".gLFyf");

  
  
  await page.type(
    ".gLFyf",
    `Job Vacancies for${title} site:${webSite}`
  );

  await page.keyboard.press("Enter");

  await page.waitForSelector(".LC20lb.MBeuO.DKV0Md");
  await page.click(".LC20lb.MBeuO.DKV0Md");

  const email = await page.waitForSelector("a[href^=mailto]");
  console.log(email);
  await page.click("a[href^=mailto]");

}
