import I18n from 'i18n-js';

// import locales

// ENGLISH
import en from './en';

// set the default locale
I18n.locale = 'en'

// specify that the app should fallback to English if the user locale doesn't exist
I18n.fallbacks = true

// define the supported translations
I18n.translations = { en }

export default /** @type {import('i18n-js')} */ (I18n)