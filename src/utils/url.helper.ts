import { env } from '../config/env';

export const getBackendUrl = (): string => {
  const { schema, host, port } = env.server;
  return getUrl(schema, host, port);
};

const getUrl = (
  schema: string,
  host: string,
  port: string | number | boolean
): string => `${schema}://${host}${port ? `:${port}` : ''}`;
