import { type Models } from 'appwrite';

import { Libraries } from './entities';

export const databaseDictionary = {
  library: '66c0f0fc0038bc8ed981',
} as const;

export type Database = {
  library: Libraries;
};

export type Collection = keyof typeof databaseDictionary;
export type Dto<T extends Database[keyof Database]> = Models.Document & T;
export type Response<T extends Collection> = Dto<Database[T]>;
