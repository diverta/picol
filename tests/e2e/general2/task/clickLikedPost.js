module.exports = async ({ browser, page }) => {
  await page.waitForXPath("//a[contains(text(),'Liked post')]");
  element = await page.$x("//a[contains(text(),'Liked post')]");
  await Promise.all([await element[0].click(), page.waitTillHTMLRendered()]);
};
