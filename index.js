const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://www.correios.com.br/", {
    timeout: 60000,
  });
  await page.type("#relaxation", "60821-490");
  await page.keyboard.press("Enter");

  await page.waitForTimeout(5000);

  const abas = await browser.pages();
  const abaResultCep = abas[2];

  function getResultCep() {
    const table = document.querySelector("#resultado-DNEC");
    return table.innerText;
  }

  const getTable = await abaResultCep.evaluate(getResultCep);

  console.log(getTable);

  await browser.close();
})();
