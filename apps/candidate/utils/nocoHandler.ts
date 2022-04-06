import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const getNocoApi = async (
  url: string
): Promise<[AxiosResponse<any, any>, string]> => {
  const headers = {
    'xc-auth': process.env.NOCO_AUTH_TOKEN || '',
  };
  const reqOptions: AxiosRequestConfig = {
    method: 'GET',
    url: `${process.env.NOCO_API_URL || ''}/${url}`,
    headers,
  };
  try {
    const response = await axios(reqOptions);
    return [response, ''];
  } catch (err: any) {
    console.error(err);
    return [{} as AxiosResponse<any, any>, 'something wrong'];
  }
};
