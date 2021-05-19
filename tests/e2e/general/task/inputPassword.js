module.exports = async ({ browser, page }) => {
  await page.waitForXPath("//*[@name='password']");
  let element = await page.$x("//*[@name='password']");
  await Promise.all([element[0].type('panda9337'), page.waitTillHTMLRendered()]);
};
