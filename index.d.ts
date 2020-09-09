export function toEnvString(env: string | RegExp): string;

export default class Envality<O extends object = object> {
  constructor(options: { [env: string]: O }, baseEnv?: string);
  readonly envs: string[];
  readonly base: O;
  readonly option: O;
  env: string;
  set(env: string, option: O): void;
  put(env: string, option: O): void;
  get(env?: string): O;
}
