module.exports = async ({ browser, page }) => {
  await page.waitForXPath("//*[@name='password']");
  await page.$x("//*[@name='password']");
};
