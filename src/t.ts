import Envality from '.';

const envality = new Envality({
  [/localhost|127.0.0.1/.toString()]: {
    a: 'ads',
  },
});

// envality.env = 'localhost';

export default envality;
