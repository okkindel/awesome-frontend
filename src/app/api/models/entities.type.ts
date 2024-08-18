import { type Models } from 'appwrite';

import { Library } from './entities/library.type';

export const ElementsDictionary = {
  library: '66c0f0fc0038bc8ed981',
} as const;

export type Elements = {
  library: Library;
};

export type Collection = keyof typeof ElementsDictionary;
export type Dto<T extends Elements[keyof Elements]> = Models.Document & T;
export type Response<T extends Collection> = Dto<Elements[T]>;
