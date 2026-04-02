import { Button, HStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('pt') ? 'pt' : 'en'

  const toggle = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <HStack spacing={1}>
      {['pt', 'en'].map((lang) => (
        <Button
          key={lang}
          size="xs"
          variant={current === lang ? 'solid' : 'ghost'}
          onClick={() => toggle(lang)}
          fontFamily="mono"
          textTransform="uppercase"
          letterSpacing="wider"
          fontSize="0.65rem"
          px={2}
          py={1}
          h="auto"
        >
          {lang}
        </Button>
      ))}
    </HStack>
  )
}
