import Vue from 'vue';
import StackTrace from 'stacktrace-js';

function joinLines(...errors: any[]) {
  return errors.map((e) => `${e}`).join('\n');
}

/**
 * apply Error Log Reporter.
 *
 * @export
 * @class ErrorLogReporter
 */
export class ErrorLogReporter {
  get reportUrl() {
    const { host, pathname, search } = window.location;
    return `https://jstrace-dot-rcms-248505.an.r.appspot.com/jstrace/picol/${host}${pathname}${search}`;
  }

  async reportWithMessage(headerMessage: string = '', error: any) {
    try {
      const isError = error instanceof Error;
      const message = `${joinLines(headerMessage, isError ? error.stack : error)}`;

      const stackframes = isError ? await StackTrace.fromError(error) : [];
      await StackTrace.report(stackframes, this.reportUrl, message);
    } catch (e) {
      console.info(e);
    }
  }

  apply() {
    Vue.config.errorHandler = async (err, vm, info) => {
      await this.reportWithMessage(`Captured in Vue.config.errorHandler`, err);
    };
    window.addEventListener('error', async (event) => {
      await this.reportWithMessage('Captured in error EventListener', event.error);
    });
    window.addEventListener('unhandledrejection', async (event) => {
      await this.reportWithMessage('Captured in unhandledrejection EventListener', event.reason);
    });
    window.addEventListener('rejectionhandled', async (event) => {
      await this.reportWithMessage('Captured in rejectionhandled EventListener', event.reason);
    });
  }
}
