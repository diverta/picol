module.exports = async ({ browser, page }) => {
  await page.waitForXPath("//a[contains(text(),'Commented post')]");
  element = await page.$x("//a[contains(text(),'Commented post')]");
  await Promise.all([await element[0].click(), page.waitTillHTMLRendered()]);
};
