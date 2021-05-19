module.exports = async ({ browser, page }) => {
  await page.waitForXPath("//*[@name='email']");
  let element = await page.$x("//*[@name='email']");
  await Promise.all([element[0].type('yabe@diverta.co.jp'), page.waitTillHTMLRendered()]);
};
