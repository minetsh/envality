/**
 * 非 IE 环境
 */
export const setPrototypeOf = (obj: any, proto: object): any => {
  if (obj.__proto__) {
    obj.__proto__ = proto;
    return obj;
  } else {
    // 如果你想返回 prototype of Object.create(null):
    const func = function () {
      for (const key in obj) {
        Object.defineProperty(this, key, {
          value: obj[key],
        });
      }
    };
    func.prototype = proto;
    return new func();
  }
};

export function assign(target: any, ...sources: any[]): any {
  if (Object.assign) {
    return Object.assign.apply(this, arguments);
  }

  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  for (let source: any, i = 1, n = arguments.length; i < n; i++) {
    source = arguments[i];
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}
