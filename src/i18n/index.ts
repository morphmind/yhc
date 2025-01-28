import { en } from './locales/en';
import { tr } from './locales/tr';
import { clinic } from './locales/clinic';
import { hairTransplant } from './locales/hair-transplant';
import { afroHairTransplant } from './locales/afro-hair-transplant';
import { microsapphire } from './locales/microsapphire';
import { beardTransplant } from './locales/beard-transplant';
import { eyebrowTransplant } from './locales/eyebrow-transplant';
import { womenHairTransplant } from './locales/women-hair-transplant';
import { contact } from './locales/contact';
import { Language } from '@/types';

export const translations = {
  en: { 
    ...en, 
    clinic: clinic.en, 
    hairTransplant: hairTransplant.en, 
    afroHairTransplant: afroHairTransplant.en, 
    microsapphire: microsapphire.en,
    beardTransplant: beardTransplant.en, 
    eyebrowTransplant: eyebrowTransplant.en, 
    womenHairTransplant: womenHairTransplant.en, 
    contact: contact.en 
  },
  tr: { 
    ...tr, 
    clinic: clinic.tr, 
    hairTransplant: hairTransplant.tr, 
    afroHairTransplant: afroHairTransplant.tr,
    microsapphire: microsapphire.tr,
    beardTransplant: beardTransplant.tr, 
    eyebrowTransplant: eyebrowTransplant.tr, 
    womenHairTransplant: womenHairTransplant.tr, 
    contact: contact.tr 
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function getTranslation(lang: Language) {
  return translations[lang as TranslationKey] || translations.en;
}

export type Translation = typeof translations.en;