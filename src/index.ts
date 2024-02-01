import puppeteer from "puppeteer";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log("Welcome - Jobber CLI V.0.1");

console.log("Please enter the following details to get started!");
rl.question("Please enter a site : ", (site: string) => {
  rl.question("Please enter a job title : ", (title: string) => {
    scrapeAndApply(site,title);
    rl.close();
  });
});




async function scrapeAndApply(webSite: string,title:string){
const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  
  await page.goto("https://www.google.com");

  
  await page.waitForSelector("#prompt-textarea");

  
  
  await page.type(
    ".gLFyf",
    `Job Vacancies for${title} site:${webSite}`
  );

  await page.keyboard.press("Enter");

  await page.waitForSelector(".LC20lb.MBeuO.DKV0Md");
  await page.click(".LC20lb.MBeuO.DKV0Md");

  const email = await page.waitForSelector("a[href^=mailto]");
  console.log('Sending Application to : ',email)
  
  await page.click("a[href^=mailto]");

}
