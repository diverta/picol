module.exports = async ({ browser, page }) => {
  await page.waitForXPath("//a[contains(text(),'POST')]");
  let element = await page.$x("//a[contains(text(),'POST')]");
  await Promise.all([await element[0].click(), page.waitTillHTMLRendered()]);
};
