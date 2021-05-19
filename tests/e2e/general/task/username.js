module.exports = async ({ browser, page }) => {
  await page.waitForXPath("//*[@name='email']");
  await page.$x("//*[@name='email']");
};
