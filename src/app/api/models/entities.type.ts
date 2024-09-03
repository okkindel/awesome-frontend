import { type Models } from 'appwrite';

import { Library } from './database.model';

export const databaseDictionary = {
  library: '66c0f0fc0038bc8ed981',
} as const;

export type Database = {
  library: Library;
};

export type Collection = keyof typeof databaseDictionary;
export type Dto<T extends Database[keyof Database]> = Models.Document & T;
export type Response<T extends Collection> = Dto<Database[T]>;
