import 'vue-i18n'

import type { Messages } from './resources'

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends Messages {}
}
