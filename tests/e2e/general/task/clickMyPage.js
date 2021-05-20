module.exports = async ({ browser, page }) => {
  await page.waitForXPath("//img[@alt='My Page']");
  element = await page.$x("//img[@alt='My Page']");
  await Promise.all([await element[0].click(), page.waitTillHTMLRendered()]);
};
