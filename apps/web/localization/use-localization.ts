import { useI18n } from 'vue-i18n'

import type { Locale } from '@/localization/locales/locales'
import type {
  LocalizationMessageKey,
  LocalizationMessages,
} from '@/localization/locales/messages/resources'

export const useLocalization = () => {
  const { t: translateMessage } = useI18n<{ message: LocalizationMessages }, Locale>({
    useScope: 'global',
  })

  const translate = (key: LocalizationMessageKey): string => translateMessage(key)

  return { translate }
}
