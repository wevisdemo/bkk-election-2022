import NodeFetch, { RequestInfo, RequestInit, Response } from 'node-fetch';
import { env } from 'process';

export const fetch = (url: RequestInfo, init?: RequestInit): Promise<Response> => {
  const apiKey = env.ERS_API_KEY;
  return NodeFetch(url, { headers: { 'api-key' : apiKey }}).then(res => {
    if (!res.ok) {
      console.error(res.status, ": ", res.text());
    }
    return res;
  });
};