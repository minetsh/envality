export default interface Envality<O extends object = object> {
  readonly envs: string[];
  readonly base: O;
  readonly option: O;
  env: string;
  set(env: string, option: O): void;
  put(env: string, option: O): void;
  get(env?: string): O;
}
