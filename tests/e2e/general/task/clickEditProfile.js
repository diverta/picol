module.exports = async ({ browser, page }) => {
  await page.waitForXPath("//a[contains(text(),'Edit profile')]");
  element = await page.$x("//a[contains(text(),'Edit profile')]");
  await Promise.all([await element[0].click(), page.waitTillHTMLRendered()]);
};
