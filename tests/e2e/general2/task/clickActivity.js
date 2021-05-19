module.exports = async ({ browser, page }) => {
  await page.waitForXPath("//a[contains(text(),'ACTIVITY')]");
  element = await page.$x("//a[contains(text(),'ACTIVITY')]");
  await Promise.all([await element[0].click(), page.waitTillHTMLRendered()]);
};
