import NodeFetch, { RequestInfo, RequestInit, Response } from 'node-fetch';

export const fetch = (url: RequestInfo, init?: RequestInit): Promise<Response> => {
  const apiKey = process.env.ERS_API_KEY;
  if (!apiKey) {
    throw new Error('ERS_API_KEY is missing from env');
  }
  return NodeFetch(url, { headers: { 'api-key' : apiKey }}).then(res => {
    if (!res.ok) {
      console.error(res.status, ": ", res.text());
    }
    return res;
  });
};