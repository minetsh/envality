const KEY_OPTIONS = Symbol('key-options');

const KEY_BASEENV = Symbol('key-base-env');

const KEY_BASE = Symbol('key-base');

const KEY_ENV = Symbol('key-env');

export default class Envality<O extends object = object> {
  private [KEY_OPTIONS]: { [env: string]: O } = {};
  private [KEY_BASEENV]: string;
  private [KEY_BASE]: O = {} as O;
  private [KEY_ENV]: string;

  constructor(options: { [env: string]: O }, baseEnv?: string) {
    this[KEY_BASEENV] = baseEnv;
    if (options) {
      const base = this[KEY_BASE];
      Object.keys(options)
        .map((env) => options[env])
        .forEach((option) => {
          Object.setPrototypeOf(option, base);
        });
    }
    if (typeof window !== 'undefined') {
      this.env = window.location.host;
    }
  }

  public exists(env: string): boolean {
    return !!this[KEY_OPTIONS][env];
  }

  public set(env: string, option: O): void {
    const o: O = { ...option };
    if (this[KEY_BASEENV] === env) {
      Object.setPrototypeOf(this[KEY_BASE], o);
    } else {
      Object.setPrototypeOf(o, this[KEY_BASE]);
    }
    this[KEY_OPTIONS][env] = o;
  }

  public put(env: string, option: O) {
    if (option) {
      const o = this[KEY_OPTIONS][env];
      if (o) {
        Object.assign(o, option);
      } else {
        this.set(env, option);
      }
    }
  }

  public get(env: string): O {
    return this[KEY_OPTIONS][env] || this.base;
  }

  public get envs(): string[] {
    return Object.keys(this[KEY_OPTIONS]);
  }

  public get base(): O {
    return this[KEY_BASE];
  }

  public set env(env: string) {
    this[KEY_ENV] = env;
  }

  public get env(): string {
    return this[KEY_ENV];
  }

  public get option(): O {
    return this[KEY_OPTIONS][this.env] || this[KEY_BASE];
  }
}
