import { isArray } from 'util';

/* tslint:disable */

export function defObj() {
  defineRemoveEmpty();
  defineGetValue();
}

/**
 * removes values recursively if those are undefiend data.
 * @notice empty length Array will be deleted same as undefined.
 */
function defineRemoveEmpty() {
  if (!Object.prototype.removeEmpty) {
    Object.defineProperty(Object.prototype, 'removeEmpty', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function<T>(
        option: {
          removeEmptyString?: boolean;
          removeNull?: boolean;
        } = {},
      ): T {
        /** configures conditions including extra conditioning option. */
        let conditions: any[] = [undefined]; // default
        if (option.removeEmptyString === true) {
          conditions.push('');
        }
        if (option.removeNull === true) {
          conditions.push(null);
        }

        /** executes */
        Object.keys(this).forEach((key) => {
          if (this[key] && typeof this[key] === 'object') {
            this[key].removeEmpty();
            if (Object.keys(this[key]).length === 0) {
              delete this[key];
            }
            return;
          }
          if (conditions.some((condition) => condition === this[key])) {
            delete this[key];
            return;
          }
        });

        return this;
      },
    });
  }
}

function defineGetValue() {
  if (!Object.prototype.getValue) {
    Object.defineProperty(Object.prototype, 'getValue', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function(keyNames: string[]): any {
        if (keyNames === undefined || keyNames === null || !isArray(keyNames)) {
          return Error(`should be passed argument as Array: ${keyNames}`);
        }
        return keyNames.reduce((xs, x) => (xs && xs[x] ? xs[x] : undefined), this);
      },
    });
  }
}
