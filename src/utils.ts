/**
 * 仅适用于Chrome和FireFox，在IE中不工作
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
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  const to = Object(target);

  for (let index = 1; index < arguments.length; index++) {
    const nextSource = arguments[index];

    if (nextSource !== null && nextSource !== undefined) {
      for (const nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }
  return to;
}
