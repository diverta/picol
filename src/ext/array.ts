/* tslint:disable */

export function defArr() {
  defineUnique();
  definePushAll();
  defineClear();
  defineReplace();
}

/**
 * pickes up unique values (getting rid of duplicates values).
 */
function defineUnique() {
  if (!Array.prototype.unique) {
    Object.defineProperty(Array.prototype, 'unique', {
      enumerable: false,
      configurable: false,
      writable: false,
      /**
       * remove duplicates.
       * @param option { identifierPropKey?: string } option for seeking inside property to detect duplicates.
       * @example ```
       * [{id: 0, ...}, {id: 1, ...}, {id: 0, ...}].unique({ identifierPropKey: 'id' })
       *   => [{id: 0, ...}, {id: 1, ...}]
       * ```
       */
      value: function(option?: { identifierPropKey?: string }) {
        // no option
        if (!option || !option.identifierPropKey) {
          var a = this.concat();
          for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
              if (a[i] === a[j]) a.splice(j--, 1);
            }
          }

          return a;
        }

        // specified option
        const identifierValues = Array.from(new Set(this.map((s: any) => s[option.identifierPropKey as string])));
        return identifierValues.map((identifierValue) => ({
          ...this.find((s: any) => s[option.identifierPropKey as string] === identifierValue),
        }));
      },
    });
  }
}

/**
 * push all elements of array.
 */
function definePushAll() {
  if (!Array.prototype.pushAll) {
    Object.defineProperty(Array.prototype, 'pushAll', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function<T>(elements: T[]) {
        return elements.forEach((elm) => this.push(elm));
      },
    });
  }
}

/**
 * remove all elements of array, without prototype bind destruction.
 */
function defineClear() {
  if (!Array.prototype.clear) {
    Object.defineProperty(Array.prototype, 'clear', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function() {
        while (this.length) {
          this.pop();
        }
      },
    });
  }
}

/**
 * replace all elements of array, without prototype bind destruction.
 */
function defineReplace() {
  if (!Array.prototype.replaceAll) {
    Object.defineProperty(Array.prototype, 'replaceAll', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function<T>(elements: T[]): void {
        this.clear();
        this.pushAll(elements);
      },
    });
  }
}
