module.exports = async ({ browser, page }) => {
  await page.waitForXPath("//button[@type='submit']");
  let element = await page.$x("//button[@type='submit']");
  await Promise.all([element[0].click(), page.waitTillHTMLRendered()]);
};
