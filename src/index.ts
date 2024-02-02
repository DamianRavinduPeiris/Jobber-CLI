import puppeteer from "puppeteer";
import readline from "readline";
import getBody from "../src/ai";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log("Welcome - Jobber CLI V.0.1");

console.log("Please enter the following details to get started!");
rl.question("Please enter a site : ", (site: string) => {
  rl.question("Please enter a job title : ", (title: string) => {
    rl.question("Please enter a tech stack : ", (techStack: string) => {
      rl.question("Please enter your name : ", (name: string) => {
        scrapeAndApply(site, title, techStack, name);
        rl.close();
      });
    });
  });
});

async function scrapeAndApply(
  webSite: string,
  title: string,
  techStack: string,
  name: string
) {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.google.com");

    await page.waitForSelector(".gLFyf");

    await page.type(".gLFyf", `Job Vacancies for ${title} site:${webSite}`);

    await page.keyboard.press("Enter");

    await page.waitForSelector(".LC20lb.MBeuO.DKV0Md");
    await page.click(".LC20lb.MBeuO.DKV0Md");

    getBody(webSite, title, techStack, name)
      .then(async (res: string) => {
        console.log("Application Body : ", res);
        const email = await page.waitForSelector("a[href^=mailto]");

        if (email) {
          // Get the href attribute of the mailto link
          const href = await (await email.getProperty("href")).jsonValue();

          // URL encode your subject and body
          let subject = encodeURIComponent(
            `Applying for the position of ${title} in ${webSite}`
          );
          let body = encodeURIComponent(res);
          // Append the subject and body to the mailto link
          let mailtoLink = `${href}?subject=${subject}&body=${body}`;
          // Use the modified mailto link to navigate
          await page.evaluate(
            (url) => (window.location.href = url),
            mailtoLink
          );
        }
      })
      .catch((er: any) => {
        console.log(er);
      });
  } catch (error) {}
}
