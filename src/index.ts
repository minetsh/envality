import { setPrototypeOf, assign } from './ployfill';

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

export class Envality<O extends object = object> {
  private _config: Config<O> = {
    base: {} as O,
    options: {},
  };

  constructor(options: { [env: string]: O }, baseEnv?: string) {
    this._config.baseEnv = baseEnv;
    if (options) {
      Object.keys(options).forEach((env) => {
        this.set(env, options[env]);
      });
    }
    if (typeof window !== 'undefined') {
      let env = window.location.host;
      if (typeof sessionStorage !== 'undefined') {
        env = sessionStorage.getItem('envality-env') || env;
      }
      this.env = env;
    }
  }

  public set(env: string, option: O): void {
    let o: O = assign({}, option);
    if (env === this._config.baseEnv) {
      this._config.base = setPrototypeOf(this.base, o);
    } else {
      o = setPrototypeOf(o, this.base);
    }
    this._config.option = null;
    this._config.options[env] = o;
  }

  public put(env: string, option: O) {
    if (option) {
      const o = this.get(env);
      if (o) {
        assign(o, option);
      } else {
        this.set(env, option);
      }
    }
  }

  public get(env?: string): O {
    const targetEnv = env || this.env;
    const options = this._config.options;
    let matchEnv: string;
    for (let i = 0; i < this.envs.length; i++) {
      if (new RegExp(this.envs[i]).test(targetEnv)) {
        matchEnv = this.envs[i];
        break;
      }
    }
    return (matchEnv && options[matchEnv]) || this.base;
  }

  public get envs(): string[] {
    return Object.keys(this._config.options);
  }

  public get base(): O {
    return this._config.base;
  }

  public set env(env: string) {
    this._config.env = env;
    this._config.option = null;
    if (
      typeof window !== 'undefined' &&
      typeof sessionStorage !== 'undefined'
    ) {
      sessionStorage.setItem('envality-env', env);
    }
  }

  public get env(): string {
    return this._config.env;
  }

  public get option(): O {
    if (this._config.option) {
      return this._config.option;
    }
    return (this._config.option = this.get());
  }
}

export default Envality;
