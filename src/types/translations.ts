export interface Language {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Translation {
  id: string;
  language_code: string;
  namespace: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface TranslationSettings {
  id: string;
  openai_api_key: string | null;
  openai_model: string;
  created_at: string;
  updated_at: string;
}

export interface TranslationStore {
  languages: Language[];
  translations: Translation[];
  settings: TranslationSettings | null;
  loading: boolean;
  progress: number;
  error: string | null;
  setLanguages: (languages: Language[]) => void;
  setTranslations: (translations: Translation[]) => void;
  setSettings: (settings: TranslationSettings | null) => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setError: (error: string | null) => void;
  fetchLanguages: () => Promise<void>;
  fetchTranslations: () => Promise<void>;
  fetchSettings: () => Promise<void>;
  addLanguage: (language: Omit<Language, 'created_at' | 'updated_at'>) => Promise<void>;
  updateLanguage: (code: string, language: Partial<Language>) => Promise<void>;
  deleteLanguage: (code: string) => Promise<void>;
  addTranslation: (translation: Omit<Translation, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTranslation: (id: string, translation: Partial<Translation>) => Promise<void>;
  deleteTranslation: (id: string) => Promise<void>;
  updateSettings: (settings: Partial<TranslationSettings>) => Promise<void>;
  cloneLanguage: (sourceCode: string, targetCode: string) => Promise<void>;
  translateLanguage: (sourceCode: string, targetCode: string) => Promise<void>;
}