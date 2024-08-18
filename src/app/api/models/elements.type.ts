import { type Models } from 'appwrite';

import { Library } from './entities/library.type';

export type Elements = {
  library: Library;
};

export const ElementsDictionary = {
  library: '66c0f0fc0038bc8ed981',
} as const;

export type Collection = keyof typeof ElementsDictionary;

export type ElementsResponse<T extends Collection> = Models.Document &
  Elements[T];

export type DTO<T> = Models.Document & T;
