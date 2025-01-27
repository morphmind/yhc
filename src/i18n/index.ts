import { en } from './locales/en';
import { tr } from './locales/tr';
import { clinic } from './locales/clinic';
import { hairTransplant } from './locales/hair-transplant';
import { afroHairTransplant } from './locales/afro-hair-transplant';
import { hairTransplant } from './locales/hair-transplant';
import { Language } from '@/types';

export const translations = {
  en: { ...en, clinic: clinic.en, hairTransplant: hairTransplant.en, afroHairTransplant: afroHairTransplant.en },
  tr: { ...tr, clinic: clinic.tr, hairTransplant: hairTransplant.tr, afroHairTransplant: afroHairTransplant.tr },
} as const;

export type TranslationKey = keyof typeof translations;

export function getTranslation(lang: Language) {
  return translations[lang as TranslationKey] || translations.en;
}

export type Translation = typeof translations.en;