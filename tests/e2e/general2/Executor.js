const applyExtensions = require('./ext');

class Executor {
  browser;
  page;

  promiseFactories = [];

  create({ browser, page, captureDir }) {
    this.captureDir = captureDir;
    this.browser = browser;
    this.page = applyExtensions(page);
    return this;
  }

  appendAll(promiseFactoryDefs = []) {
    promiseFactoryDefs.forEach((d) => this.append(d));
    return this;
  }

  append({ promiseFactoryName, promiseFactory, wailtMilliSecond }) {
    const pf = this.decoratePromiseFactory(
      promiseFactoryName,
      promiseFactory,
      this.promiseFactories.length,
      wailtMilliSecond,
    );
    this.promiseFactories.push(pf);
    return this;
  }

  decoratePromiseFactory(promiseFactoryName, promiseFactory, idx, wailtMilliSecond) {
    const delay = (time = 0) => {
      return new Promise((resolve) => setTimeout(resolve, time));
    };

    return async () => {
      await promiseFactory({ ...this });
      await delay(wailtMilliSecond);
      await this.page.screenshot({
        path: `${this.captureDir}${require('path').sep}capture.${idx}.${promiseFactoryName}.png`,
        type: 'png',
        fullPage: true,
      });
      console.dir(`promise no.${idx} ${promiseFactoryName} was executed.`);
    };
  }

  async execute() {
    for (const promiseFactory of this.promiseFactories) {
      await promiseFactory();
    }
    console.dir('all promises are executed.');
    await this.browser.close();
  }
}

module.exports = Executor;
