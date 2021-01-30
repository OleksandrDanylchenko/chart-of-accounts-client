import { getOsEnv } from '../utils/envParsing.helper';

export const env = {
  isProduction:
    getOsEnv({
      key: 'NODE_ENV',
      isRequired: true
    }) === 'production',
  isDevelopment:
    getOsEnv({
      key: 'NODE_ENV',
      isRequired: true
    }) === 'development',
  app: {
    port: getOsEnv({
      key: 'PORT',
      devDefault: '5000',
      isRequired: true
    })
  },
  server: {
    schema: getOsEnv({
      key: 'REACT_APP_SERVER_SCHEMA',
      devDefault: 'http',
      isRequired: true
    }),
    host: getOsEnv({
      key: 'REACT_APP_SERVER_HOST',
      devDefault: 'localhost',
      isRequired: true
    }),
    port: getOsEnv({
      key: 'REACT_APP_SERVER_PORT',
      devDefault: '3000',
      isRequired: true
    })
  }
};
