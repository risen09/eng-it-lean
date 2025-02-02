import { createApi, fetchBaseQuery, QueryReturnValue } from '@reduxjs/toolkit/query/react';
import { dictionaryService } from '../service/dictionary';
import { GetDictionaryResponse, GetDictionariesResponse } from '../service/dictionary/types';
import { wordsService } from '../service/words';
import { GetWordResponse, GetWordsResponse, Word } from '../service/words/types';

import { unitService } from '../service/unit';
import { GetUnitListResponse, GetUnitResponse, PutUnitRequest, Unit } from '../service/unit/types';
import { userService } from '../service/users';
import { GetUserListResponse, User } from '../service/users/types';

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
    getDictionaries: builder.query<GetDictionariesResponse, undefined>({
      queryFn: createQueryFromPromise(() => dictionaryService.getDictionaries())
    }),
    getDictionary: builder.query<GetDictionaryResponse, number>({
      queryFn: createQueryFromPromise((id: number) => dictionaryService.getDictionary(id))
    }),
    postDictionary: builder.mutation<Word, { id: number; word: Word }>({
      queryFn: createQueryFromPromise(({ id, word }: { id: number; word: Word }) =>
        dictionaryService.postDictionary(id, word)
      )
    }),

    getWords: builder.query<GetWordsResponse, undefined>({
      queryFn: createQueryFromPromise(() => wordsService.getWords())
    }),
    getWord: builder.query<GetWordResponse, number>({
      queryFn: createQueryFromPromise((id: number) => wordsService.getWord(id))
    }),
    putWord: builder.mutation<Word, Word>({
      queryFn: createQueryFromPromise((word: Word) => wordsService.putWord(word))
    }),
    deleteWord: builder.mutation<undefined, number>({
      queryFn: createQueryFromPromise((id: number) => wordsService.deleteWord(id))
    }),

    getUnits: builder.query<GetUnitListResponse, undefined>({
      queryFn: createQueryFromPromise(() => unitService.getUnitList())
    }),
    getUnit: builder.query<GetUnitResponse, number>({
      queryFn: createQueryFromPromise((id: number) => unitService.getUnit(id))
    }),
    putUnit: builder.mutation<GetUnitResponse, PutUnitRequest>({
      queryFn: createQueryFromPromise((unit: PutUnitRequest) => unitService.putUnit(unit))
    }),
    deleteUnit: builder.mutation<any, number>({
      queryFn: createQueryFromPromise((id: number) => unitService.deleteUnit(id))
    }),

    getUsers: builder.query<GetUserListResponse, number>({
      queryFn: createQueryFromPromise(() => userService.getUsers())
    }),
    postUsers: builder.mutation<GetUserListResponse, User>({
      queryFn: createQueryFromPromise((user: User) => userService.postUsers(user))
    })
  })
});

export const {
  useGetDictionariesQuery,
  useGetDictionaryQuery,
  usePostDictionaryMutation,
  useGetWordsQuery,
  useGetWordQuery,
  usePutWordMutation,
  useDeleteWordMutation,
  useGetUnitsQuery,
  useGetUnitQuery,
  usePutUnitMutation,
  usePostUsersMutation
} = api;
