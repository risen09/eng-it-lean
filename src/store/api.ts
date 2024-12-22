import { createApi, fetchBaseQuery, QueryReturnValue } from '@reduxjs/toolkit/query/react';
import { dictionaryService } from '../service/dictionary';
import { GetDictionaryWordsResponse, GetDictionaryListResponse } from '../service/dictionary/types';

const createQueryFromPromise =
  <ARGS, RES>(fn: (...args: Array<ARGS>) => Promise<RES>) =>
  async (...args): Promise<QueryReturnValue<RES, any, any>> => {
    try {
      const data = await fn(...args);
      return { data };
    } catch (e: unknown) {
      return { error: e };
    }
  };

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    getDictionaryList: builder.query<GetDictionaryListResponse, undefined>({
      queryFn: createQueryFromPromise(() => dictionaryService.getDictionaryList())
    }),
    getDictionaryWords: builder.query<GetDictionaryWordsResponse, number>({
      queryFn: createQueryFromPromise((id: number) => dictionaryService.getDictionary(id))
    })
  })
});

export const { useGetDictionaryListQuery, useGetDictionaryWordsQuery } = api;
