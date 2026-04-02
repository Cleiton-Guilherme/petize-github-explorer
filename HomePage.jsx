import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  AlertDescription,
  VStack,
  Container,
  keyframes,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { fetchUser } from '../services/github'
import LanguageSwitcher from '../components/LanguageSwitcher'

const float = keyframes`
  0%, 100% { transform: translateY(0px) }
  50% { transform: translateY(-10px) }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1) }
  50% { opacity: 0.7; transform: scale(1.05) }
`

export default function HomePage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSearch = async () => {
    if (!username.trim()) return
    setLoading(true)
    setError(null)
    try {
      await fetchUser(username.trim())
      navigate(`/profile/${username.trim()}`)
    } catch (err) {
      if (err.message === 'USER_NOT_FOUND') {
        setError(t('errors.userNotFound'))
      } else {
        setError(t('errors.fetchError'))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <Box minH="100vh" bg="#0d1117" position="relative" overflow="hidden">
      {/* Background decorative circles */}
      <Box
        position="absolute"
        w="600px"
        h="600px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(26,140,255,0.08) 0%, transparent 70%)"
        top="-200px"
        left="-200px"
        animation={`${pulse} 6s ease-in-out infinite`}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        w="400px"
        h="400px"
        borderRadius="full"
        bg="radial-gradient(circle, rgba(88,166,255,0.06) 0%, transparent 70%)"
        bottom="-100px"
        right="-100px"
        animation={`${pulse} 8s ease-in-out infinite 2s`}
        pointerEvents="none"
      />
      {/* Subtle grid pattern */}
      <Box
        position="absolute"
        inset={0}
        backgroundImage="linear-gradient(rgba(48,54,61,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(48,54,61,0.3) 1px, transparent 1px)"
        backgroundSize="40px 40px"
        pointerEvents="none"
        opacity={0.4}
      />

      {/* Top bar */}
      <Flex
        position="fixed"
        top={0}
        left={0}
        right={0}
        px={{ base: 4, md: 8 }}
        py={4}
        zIndex={10}
        justify="flex-end"
        align="center"
        backdropFilter="blur(10px)"
        bg="rgba(13,17,23,0.8)"
        borderBottom="1px solid rgba(48,54,61,0.5)"
      >
        <LanguageSwitcher />
      </Flex>

      {/* Main content */}
      <Container maxW="container.sm" h="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={8} w="100%" textAlign="center" position="relative">
          {/* Logo/icon */}
          <Box animation={`${float} 4s ease-in-out infinite`}>
            <svg width="64" height="64" viewBox="0 0 16 16" fill="#58a6ff">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
            </svg>
          </Box>

          {/* Title */}
          <VStack spacing={2}>
            <Text
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="700"
              color="#e6edf3"
              letterSpacing="-0.02em"
              lineHeight="1.1"
            >
              {t('home.title')}
            </Text>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color="#8b949e"
              maxW="340px"
              fontWeight="400"
            >
              {t('home.subtitle')}
            </Text>
          </VStack>

          {/* Search box */}
          <Box w="100%">
            <InputGroup size="lg">
              <Input
                placeholder={t('home.searchPlaceholder')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                borderRadius="xl"
                fontSize="md"
                h="52px"
                pr="120px"
                autoFocus
                disabled={loading}
              />
              <InputRightElement w="110px" h="52px" pr={1}>
                <Button
                  onClick={handleSearch}
                  isLoading={loading}
                  loadingText={t('home.searching')}
                  size="md"
                  borderRadius="lg"
                  h="42px"
                  px={5}
                  fontSize="sm"
                  isDisabled={!username.trim()}
                >
                  {t('home.searchButton')}
                </Button>
              </InputRightElement>
            </InputGroup>

            {/* Error message */}
            {error && (
              <Alert
                status="warning"
                mt={3}
                borderRadius="lg"
                bg="#1c2128"
                border="1px solid #3d2e0e"
                color="#d29922"
              >
                <AlertIcon color="#d29922" />
                <AlertDescription fontSize="sm">{error}</AlertDescription>
              </Alert>
            )}
          </Box>

          {/* Hint */}
          <Text fontSize="xs" color="#484f58" fontFamily="mono">
            e.g. torvalds, gaearon, sindresorhus
          </Text>
        </VStack>
      </Container>
    </Box>
  )
}
