import type { Models } from 'appwrite';

export const LibrariesType = {
  'UX/UI': 'UX/UI',
  'CSS': 'CSS',
  'FETCHING': 'FETCHING',
  'STORE': 'STORE',
  'ICONS': 'ICONS',
  'UTILS': 'UTILS',
  'FULL STACK': 'FULL STACK',
  'DEV OPS': 'DEV OPS',
  'TRANSLATIONS': 'TRANSLATIONS',
  'LOW-LEVEL': 'LOW-LEVEL',
  'LIBRARIES': 'LIBRARIES',
  'OTHER': 'OTHER',
  'GITHUB': 'GITHUB',
} as const;

export type LibrariesType = (typeof LibrariesType)[keyof typeof LibrariesType];

export const LibrariesTechnology = {
  'JS/TS': 'JS/TS',
  'Angular': 'Angular',
  'React': 'React',
  'Tailwind': 'Tailwind',
  'Other': 'Other',
} as const;

export type LibrariesTechnology = (typeof LibrariesTechnology)[keyof typeof LibrariesTechnology];

export interface Libraries extends Partial<Models.Document> {
  description: string;
  name: string;
  type: LibrariesType;
  icon?: string;
  technology: LibrariesTechnology;
  url: string;
  important?: boolean;
}

