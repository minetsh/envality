const CONFIG = Symbol('key-config');

interface Config<OPTION> {
  env?: string;
  baseEnv?: string;
  base: OPTION;
  option?: OPTION;
  options: { [env: string]: OPTION };
}

export const toEnvString = (exp: string | RegExp): string => {
  return exp.toString().replace(/^(\/?)(.*)(\1)[igm]*$/, '$2');
};

export default class Envality<O extends object = object> {
  private [CONFIG]: Config<O> = {
    base: {} as O,
    options: {},
  };

  constructor(options: { [env: string]: O }, baseEnv?: string) {
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
