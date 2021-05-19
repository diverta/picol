module.exports = async ({ browser, page }) => {
  await page.goto('http://localhost:8080/', {
    waitUntil: 'networkidle0',
  });
  await page.waitTillHTMLRendered();
};
