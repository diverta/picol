/**
 * Polling waits until the current page woun't comletely change with diff checking of DOM contetnts.
 *
 * @see https://stackoverflow.com/a/61304202
 * @param {number} [timeout=30000]
 * @param {number} [checkDurationMsecs=30000]
 * @param {boolean} [debug=false]
 */
async function waitTillHTMLRendered(timeout = 30000, checkDurationMsecs = 1000, debug = false) {
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;

  while (checkCounts++ <= maxChecks) {
    let html = await this.content();
    let currentHTMLSize = html.length;

    let bodyHTMLSize = await this.evaluate(() => document.body.innerHTML.length);

    if (debug) {
      console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, ' body html size: ', bodyHTMLSize);
    }

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize) countStableSizeIterations++;
    else countStableSizeIterations = 0; //reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      if (debug) {
        console.log('Page rendered fully..');
      }
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await this.waitForTimeout(checkDurationMsecs);
  }
}

function applyExtensions(page) {
  page.__proto__.waitTillHTMLRendered = waitTillHTMLRendered;
  return page;
}
module.exports = applyExtensions;
