const fs = require('fs');
const puppeteer = require('puppeteer');

function mkdir(dirName) {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
}
const captureDir = process.argv.slice(2)[0] !== undefined ? process.argv.slice(2)[0] : 'tests/e2e/capture';
mkdir(captureDir);

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: process.argv.slice(2)[1] !== undefined && process.argv.slice(2)[1] === '--headless',
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      args: ['--start-maximized', '--lang=en-US'],
    });

    const page = await browser.newPage();
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'language', {
        get: () => 'en-US',
      });
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
      });
    });
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US',
    });

    try {
      const extensions = require('puppeteer-extensions')(page);
      extensions.turnOffAnimations();
    } catch (e) {
      const msg = `
        \x1b[33mpuppeteer-extensions would work better for your e2e testing,
        see https://github.com/HuddleEng/puppeteer-extensions#miscellaneous
        \x1b[0m${e}
        `
        .split('\n')
        .map((line) => line.trim())
        .join('\n');
      console.info(msg);
    }
    let element, formElement, tabs;

    await page.goto('http://localhost:8080/', { waitUntil: 'networkidle0' });
    await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_000_command%3Dopen%2Ctarget%3Dhttp%3A%2F%2Flocalhost%3A8080%2F%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.0');

    await page.waitForXPath("//*[@name='email']");
    element = await page.$x("//*[@name='email']");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    // await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_001_command%3Dclick%2Ctarget%3Dname%3Demail%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.1');

    await page.waitForXPath("//*[@name='email']");
    element = await page.$x("//*[@name='email']");
    await element[0].type('yabe@diverta.co.jp');
    // await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_002_command%3Dtype%2Ctarget%3Dname%3Demail%2Cvalue%3Dyabe%40diverta.co.jp.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.2');

    await page.waitForXPath("//*[@name='password']");
    element = await page.$x("//*[@name='password']");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    // await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_003_command%3Dclick%2Ctarget%3Dname%3Dpassword%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.3');

    await page.waitForXPath("//*[@name='password']");
    element = await page.$x("//*[@name='password']");
    await element[0].type('panda9337');
    // await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_004_command%3Dtype%2Ctarget%3Dname%3Dpassword%2Cvalue%3Dpanda9337.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.4');

    await page.waitForXPath("//button[@type='submit']");
    element = await page.$x("//button[@type='submit']");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_005_command%3Dclick%2Ctarget%3D%2F%2Fbutton%5B%40type%3D'submit'%5D%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.5');

    await page.waitForXPath("//a[contains(text(),'POST')]");
    element = await page.$x("//a[contains(text(),'POST')]");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    await delay(3000);
    // await page.screenshot({
    //   path: `${captureDir}${
    //     require('path').sep
    //   }general.json_006_command%3Dclick%2Ctarget%3D%2F%2Fa%5Bcontains(text()%2C'POST')%5D%2Cvalue%3D.png`,
    //   type: 'png',
    //   fullPage: true,
    // });
    console.log('puppeteer executed at no.6');

    await page.waitForXPath("//a[contains(text(),'ACTIVITY')]");
    element = await page.$x("//a[contains(text(),'ACTIVITY')]");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    await delay(10000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_007_command%3Dclick%2Ctarget%3D%2F%2Fa%5Bcontains(text()%2C'ACTIVITY')%5D%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.7');

    await page.waitForXPath("//img[@alt='My Page']");
    element = await page.$x("//img[@alt='My Page']");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_008_command%3Dclick%2Ctarget%3D%2F%2Fimg%5B%40alt%3D'My%20Page'%5D%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.8');

    await page.waitForXPath("//a[contains(text(),'Liked post')]");
    element = await page.$x("//a[contains(text(),'Liked post')]");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    await delay(10000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_009_command%3Dclick%2Ctarget%3D%2F%2Fa%5Bcontains(text()%2C'Liked%20post')%5D%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.9');

    await page.waitForXPath("//img[@alt='My Page']");
    element = await page.$x("//img[@alt='My Page']");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_010_command%3Dclick%2Ctarget%3D%2F%2Fimg%5B%40alt%3D'My%20Page'%5D%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.10');

    await page.waitForXPath("//a[contains(text(),'Commented post')]");
    element = await page.$x("//a[contains(text(),'Commented post')]");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    await delay(10000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_011_command%3Dclick%2Ctarget%3D%2F%2Fa%5Bcontains(text()%2C'Commented%20post')%5D%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.11');

    await page.waitForXPath("//img[@alt='My Page']");
    element = await page.$x("//img[@alt='My Page']");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_012_command%3Dclick%2Ctarget%3D%2F%2Fimg%5B%40alt%3D'My%20Page'%5D%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.12');

    await page.waitForXPath("//a[contains(text(),'Edit profile')]");
    element = await page.$x("//a[contains(text(),'Edit profile')]");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    // await page.waitForNavigation();
    await delay(20000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_013_command%3Dclick%2Ctarget%3Dlink%3DEdit%20profile%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.13');

    await page.waitForXPath("//div[@id='app']/div/div[2]/div/button");
    element = await page.$x("//div[@id='app']/div/div[2]/div/button");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_014_command%3Dclick%2Ctarget%3D%2F%2Fdiv%5B%40id%3D'app'%5D%2Fdiv%2Fdiv%5B2%5D%2Fdiv%2Fbutton%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.14');

    await page.waitForXPath("(//img[@alt='image'])[4]");
    element = await page.$x("(//img[@alt='image'])[4]");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_015_command%3Dclick%2Ctarget%3Dxpath%3D(%2F%2Fimg%5B%40alt%3D'image'%5D)%5B4%5D%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.15');

    await page.goto('http://localhost:8080/sub/search?tag_id=186&tag_nm=new%20tag1', { waitUntil: 'networkidle0' });
    await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_016_command%3Dopen%2Ctarget%3Dhttp%3A%2F%2Flocalhost%3A8080%2Fsub%2Fsearch%3Ftag_id%3D186%26tag_nm%3Dnew%2520tag1%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.16');

    await page.waitForXPath("//img[@alt='image']");
    element = await page.$x("//img[@alt='image']");
    await element[0].click().catch(
      async (e) =>
        await page.evaluate((elm) => {
          elm.click();
        }, element[0]),
    );
    await delay(3000);
    await page.screenshot({
      path: `${captureDir}${
        require('path').sep
      }general.json_017_command%3Dclick%2Ctarget%3D%2F%2Fimg%5B%40alt%3D'image'%5D%2Cvalue%3D.png`,
      type: 'png',
      fullPage: true,
    });
    console.log('puppeteer executed at no.17');

    await browser.close();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
