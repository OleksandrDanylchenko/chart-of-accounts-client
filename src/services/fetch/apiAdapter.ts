import * as queryString from 'query-string';
import {
  IFetchArgs,
  IFetchArgsData,
  IFetchFormArgsData
} from '../../models/fetch';
import { getBackendUrl } from '../../utils/url.helper';

const getFetchUrl = ({
  endpoint,
  queryParams
}: IFetchArgsData | IFetchFormArgsData) => {
  const apiUrl = getBackendUrl();
  return `${apiUrl}${endpoint}${
    queryParams ? `?${queryString.stringify(queryParams)}` : ''
  }`;
};

const getInitHeaders = (
  contentType = 'application/json',
  hasContent = true
) => {
  const headers: HeadersInit = new Headers();
  if (hasContent) {
    headers.set('Content-Type', contentType);
  }
  return headers;
};

const getFetchArgs = (args: IFetchArgsData): IFetchArgs => {
  const headers = getInitHeaders();

  if (args.requestData && args.type === 'GET') {
    throw new Error('GET request does not support request body.');
  }

  return {
    method: args.type,
    headers,
    ...(args.type === 'GET' ? {} : { body: JSON.stringify(args.requestData) })
  };
};

const throwIfResponseFailed = async (res: Response) => {
  if (!res.ok) {
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
      console.error(parsedException);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`An error occurred: ${err}`);
    }
    throw parsedException;
  }
};

export const callWebApi = async (args: IFetchArgsData): Promise<Response> => {
  const res = await fetch(getFetchUrl(args), getFetchArgs(args));
  await throwIfResponseFailed(res);
  return res;
};
