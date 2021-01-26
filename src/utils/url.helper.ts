import { env } from '../config/env';

const getUrl = (
  schema: string,
  host: string,
  port: string | number | boolean
): string => `${schema}://${host}${port ? `:${port}` : ''}`;

export const getBackendUrl = (): string => {
  const { schema, host, port } = env.server;
  return getUrl(schema, host, port);
};
