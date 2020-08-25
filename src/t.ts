import Envality, { toEnvString } from '.';

const envality = new Envality(
  {
    [toEnvString(/(localhost)|(127.0.0.1)/g)]: {
      a: 'ads',
    },
    production: {
      a: '线上环境内容',
    },
  },
  'production',
);

envality.env = 'localhost';

console.log(envality.envs);
console.log(envality.env);
console.log(envality.option.a);

export default envality;
