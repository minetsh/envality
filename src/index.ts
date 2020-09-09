const CONFIG: symbol | string =
  typeof Symbol === 'function' ? Symbol('key-config') : Symbol('key-config');

if (!Object.setPrototypeOf) {
  // 仅适用于Chrome和FireFox，在IE中不工作：
  Object.prototype.setPrototypeOf = function (obj, proto) {
    if (obj.__proto__) {
      obj.__proto__ = proto;
      return obj;
    } else {
      // 如果你想返回 prototype of Object.create(null):
      var Fn = function () {
        for (var key in obj) {
          Object.defineProperty(this, key, {
            value: obj[key],
          });
        }
      };
      Fn.prototype = proto;
      return new Fn();
    }
  };
}

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function (predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
  });
}

interface Config<OPTION> {
  env?: string;
  baseEnv?: string;
  base: OPTION;
  option?: OPTION;
  options: { [env: string]: OPTION };
}

export const toEnvString = (env: string | RegExp): string => {
  return env.toString().replace(/^(\/?)(.*)(\1)[igm]*$/, '$2');
};

export default class Envality<O extends object = object> {
  private [CONFIG]: Config<O> = {
    base: {} as O,
    options: {},
  };

  constructor(options: { [env: string]: O }, baseEnv?: string) {
    this[CONFIG] = {
      base: {} as O,
      options: {},
    };
    this[CONFIG].baseEnv = baseEnv;
    if (options) {
      Object.keys(options).forEach((env) => {
        this.set(env, options[env]);
      });
    }
    if (typeof window !== 'undefined') {
      this.env = window.location.host;
    }
  }

  public set(env: string, option: O): void {
    const o: O = { ...option };
    if (new RegExp(env).test(this[CONFIG].baseEnv)) {
      Object.setPrototypeOf(this.base, o);
    } else {
      Object.setPrototypeOf(o, this.base);
    }
    this[CONFIG].option = null;
    this[CONFIG].options[env] = o;
  }

  public put(env: string, option: O) {
    if (option) {
      const o = this.get(env);
      if (o) {
        Object.assign(o, option);
      } else {
        this.set(env, option);
      }
    }
  }

  public get(env?: string): O {
    const targetEnv = env || this.env;
    const options = this[CONFIG].options;
    const matchEnv = this.envs.find((env) => {
      return new RegExp(env).test(targetEnv);
    });
    return options[matchEnv] || this.base;
  }

  public get envs(): string[] {
    return Object.keys(this[CONFIG].options);
  }

  public get base(): O {
    return this[CONFIG].base;
  }

  public set env(env: string) {
    this[CONFIG].env = env;
    this[CONFIG].option = null;
  }

  public get env(): string {
    return this[CONFIG].env;
  }

  public get option(): O {
    if (this[CONFIG].option) {
      return this[CONFIG].option;
    }
    return (this[CONFIG].option = this.get());
  }
}
