const { default: Envality, toEnvString } = require('..');

test('envality', () => {
  const envality = new Envality({
    [toEnvString(/localhost/)]: {
      name: 'I am localhost',
    },
    Felix: {
      name: 'I am Felix',
    },
  });

  envality.env = 'Felix';
  expect(envality.env).toBe('Felix');
  expect(envality.option.name).toBe('I am Felix');
  expect(envality.get().name).toBe('I am Felix');
  expect(envality.get('Felix').name).toBe('I am Felix');
  expect(envality.get('localhost').name).toBe('I am localhost');
  expect(envality.envs).toEqual(['localhost', 'Felix']);
  expect(envality.base).toEqual({});

  envality.env = 'localhost';
  expect(envality.env).toBe('localhost');
  expect(envality.option.name).toBe('I am localhost');
  expect(envality.get().name).toBe('I am localhost');
  expect(envality.get('Felix').name).toBe('I am Felix');
  expect(envality.get('localhost').name).toBe('I am localhost');
  expect(envality.envs).toEqual(['localhost', 'Felix']);
  expect(envality.base).toEqual({});

  envality.set('localhost', {
    name: 'name from localhost',
    extra: 'extra message',
  });

  expect(envality.option.name).toBe('name from localhost');
  expect(envality.option.extra).toBe('extra message');

  envality.env = 'Felix';
  expect(envality.option.name).toBe('I am Felix');
  expect(envality.option.extra).toBeUndefined();

  envality.put('localhost', {
    name: 'name from localhost by put',
  });
  envality.put('Felix', {
    extra: 'extra message from Felix env',
  });

  expect(envality.option.extra).toBe('extra message from Felix env');

  envality.env = 'localhost';
  expect(envality.option.name).toBe('name from localhost by put');

  envality.put('Annie', {
    name: 'I am Annie',
  });
  envality.env = 'Annie';

  expect(envality.option.name).toBe('I am Annie');
});
