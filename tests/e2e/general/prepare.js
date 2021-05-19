const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function prepare({ newCapture, headless }) {
  const captureDir = path.resolve(__dirname, '..', newCapture ? 'newcapture' : 'capture');
  fs.mkdirSync(captureDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless,
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

  return { captureDir, browser, page };
}
module.exports = prepare;
