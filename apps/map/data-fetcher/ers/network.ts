import NodeFetch, { RequestInfo, RequestInit, Response } from 'node-fetch';
import AbortController from "abort-controller"

export const fetch = async (url: RequestInfo, init?: RequestInit): Promise<Response> => {
  const path = process.env.ERS_API_URL;
  const apiKey = process.env.ERS_API_KEY;
  if (!apiKey) {
    throw new Error('ERS_API_KEY is missing from env');
  }
  if (!path) {
    throw new Error('ERS_API_URL is missing from env');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    return await NodeFetch(`${path}${url}`, { headers: { 'api-key' : apiKey }, signal: controller.signal}).then(res => {
      if (!res.ok) {
        console.error(`[ERROR] ERS fetch returns ${res.status}: ${res.text()}`);
      }
      return res;
    });
  } catch (error) {
    if (error && (error as any).name === 'AbortError') {
      throw new Error(`Request was aborted ${url} due to exceed timeout`);
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
};