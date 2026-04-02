import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Flex,
  Text,
  Avatar,
  Button,
  VStack,
  HStack,
  Grid,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Divider,
  Badge,
  Link,
  Skeleton,
  SkeletonCircle,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { fetchUser } from '../services/github'
import { useInfiniteRepos } from '../hooks/useInfiniteRepos'
import RepoCard from '../components/RepoCard'
import RepoSortControls from '../components/RepoSortControls'
import LanguageSwitcher from '../components/LanguageSwitcher'

// SVG Icons
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="m12.596 11.596-3.535 3.535a1.5 1.5 0 0 1-2.122 0l-3.535-3.535a6.5 6.5 0 1 1 9.192 0Zm-1.06-1.06a5 5 0 1 0-7.072 0L8 14.07l3.536-3.534Z" />
    <path d="M8 9a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 9Z" />
  </svg>
)

const CompanyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25ZM3.75 6h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Zm0 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Zm3.75-3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Zm0 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM11.25 4.5h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Zm.75 3.75a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1 0-1.5h.5a.75.75 0 0 1 .75.75Z" />
  </svg>
)

const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 2 2 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a2 2 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 2 2 0 0 0-2.83 0l-2.5 2.5a2.002 2.002 0 0 0 0 2.83Z" />
  </svg>
)

const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M9.294 7.8 14.24 2h-1.18L8.778 7.027 5.15 2H1.5l5.196 7.557L1.5 15h1.18l4.543-5.28L10.85 15H14.5ZM7.241 8.897l-.527-.753-4.193-5.994H4.58l3.382 4.834.527.754 4.401 6.288H11.82Z" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M7.78 12.53a.75.75 0 0 1-1.06 0L2.47 8.28a.75.75 0 0 1 0-1.06l4.25-4.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L4.81 7h7.44a.75.75 0 0 1 0 1.5H4.81l2.97 2.97a.75.75 0 0 1 0 1.06Z" />
  </svg>
)

function UserProfileSkeleton() {
  return (
    <VStack spacing={4} align="stretch">
      <SkeletonCircle size="20" />
      <Skeleton h="24px" w="60%" />
      <Skeleton h="16px" w="40%" />
      <Skeleton h="60px" />
      <HStack>
        <Skeleton h="16px" w="80px" />
        <Skeleton h="16px" w="80px" />
        <Skeleton h="16px" w="80px" />
      </HStack>
    </VStack>
  )
}

export default function ProfilePage() {
  const { username } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  const [user, setUser] = useState(null)
  const [userLoading, setUserLoading] = useState(true)
  const [userError, setUserError] = useState(null)

  const [sortParams, setSortParams] = useState({
    sort: 'updated',
    direction: 'desc',
    type: 'all',
  })

  const { repos, loading: reposLoading, error: reposError, hasMore, sentinelRef } = useInfiniteRepos(
    username,
    sortParams
  )

  useEffect(() => {
    if (!username) return
    setUserLoading(true)
    setUserError(null)
    fetchUser(username)
      .then(setUser)
      .catch((err) => {
        if (err.message === 'USER_NOT_FOUND') {
          setUserError(t('errors.userNotFound'))
        } else {
          setUserError(t('errors.fetchError'))
        }
      })
      .finally(() => setUserLoading(false))
  }, [username, t])

  const websiteUrl = user?.blog?.startsWith('http') ? user.blog : user?.blog ? `https://${user.blog}` : null

  const StatItem = ({ count, label }) => (
    <VStack spacing={0} align="center">
      <Text fontSize="lg" fontWeight="700" color="#e6edf3" fontFamily="mono">
        {count?.toLocaleString()}
      </Text>
      <Text fontSize="xs" color="#8b949e" textTransform="uppercase" letterSpacing="wide">
        {label}
      </Text>
    </VStack>
  )

  return (
    <Box minH="100vh" bg="#0d1117">
      {/* Header */}
      <Flex
        position="sticky"
        top={0}
        zIndex={10}
        px={{ base: 4, md: 8 }}
        py={3}
        bg="rgba(13,17,23,0.9)"
        backdropFilter="blur(12px)"
        borderBottom="1px solid #21262d"
        align="center"
        justify="space-between"
      >
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeftIcon />}
          onClick={() => navigate('/')}
          color="#8b949e"
          _hover={{ color: '#e6edf3', bg: 'whiteAlpha.100' }}
          fontFamily="mono"
          fontSize="xs"
        >
          {t('profile.backToSearch')}
        </Button>
        <LanguageSwitcher />
      </Flex>

      <Container maxW="container.xl" px={{ base: 4, md: 8 }} py={8}>
        {userError && (
          <Alert status="error" borderRadius="xl" bg="#1c1414" border="1px solid #6e3535" color="#f85149">
            <AlertIcon color="#f85149" />
            <AlertDescription>{userError}</AlertDescription>
          </Alert>
        )}

        {!userError && (
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={8}
            align={{ base: 'center', lg: 'flex-start' }}
          >
            {/* LEFT: User profile sidebar */}
            <Box
              w={{ base: '100%', lg: '280px' }}
              flexShrink={0}
              position={{ base: 'relative', lg: 'sticky' }}
              top={{ lg: '80px' }}
              textAlign={{ base: 'center', lg: 'left' }}
            >
              {userLoading ? (
                <UserProfileSkeleton />
              ) : user ? (
                <VStack spacing={4} align={{ base: 'center', lg: 'stretch' }}>
                  {/* Avatar */}
                  <Avatar
                    src={user.avatar_url}
                    name={user.name || user.login}
                    size="2xl"
                    border="3px solid #30363d"
                    boxShadow="0 0 30px rgba(0,0,0,0.5)"
                    mx={{ base: 'auto', lg: 0 }}
                  />

                  {/* Name & login */}
                  <Box>
                    {user.name && (
                      <Text fontSize="xl" fontWeight="700" color="#e6edf3" lineHeight="1.2">
                        {user.name}
                      </Text>
                    )}
                    <Text fontSize="md" color="#8b949e" fontFamily="mono">
                      {user.login}
                    </Text>
                  </Box>

                  {/* Bio */}
                  {user.bio && (
                    <Text fontSize="sm" color="#c9d1d9" lineHeight="1.6">
                      {user.bio}
                    </Text>
                  )}

                  {/* Stats */}
                  <Flex
                    p={3}
                    bg="#161b22"
                    borderRadius="xl"
                    border="1px solid #30363d"
                    gap={0}
                    justify="space-around"
                    w="100%"
                  >
                    <StatItem count={user.followers} label={t('profile.followers')} />
                    <Divider orientation="vertical" h="40px" borderColor="#30363d" />
                    <StatItem count={user.following} label={t('profile.following')} />
                    <Divider orientation="vertical" h="40px" borderColor="#30363d" />
                    <StatItem count={user.public_repos} label={t('profile.repositories')} />
                  </Flex>

                  {/* Meta info */}
                  <VStack spacing={2} align={{ base: 'center', lg: 'flex-start' }} w="100%">
                    {user.company && (
                      <HStack spacing={2} color="#8b949e">
                        <CompanyIcon />
                        <Text fontSize="sm">{user.company}</Text>
                      </HStack>
                    )}
                    {user.location && (
                      <HStack spacing={2} color="#8b949e">
                        <LocationIcon />
                        <Text fontSize="sm">{user.location}</Text>
                      </HStack>
                    )}
                    {websiteUrl && (
                      <HStack spacing={2} color="#8b949e" w="100%">
                        <LinkIcon />
                        <Button
                          as="a"
                          href={websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="outline"
                          size="sm"
                          leftIcon={<LinkIcon />}
                          borderColor="#30363d"
                          color="#58a6ff"
                          _hover={{ borderColor: '#58a6ff', bg: 'rgba(88,166,255,0.08)' }}
                          borderRadius="lg"
                          fontSize="xs"
                          w={{ base: 'auto', lg: '100%' }}
                          h="32px"
                        >
                          {t('profile.visitWebsite')}
                        </Button>
                      </HStack>
                    )}
                    {user.twitter_username && (
                      <Button
                        as="a"
                        href={`https://twitter.com/${user.twitter_username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        size="sm"
                        leftIcon={<TwitterIcon />}
                        borderColor="#30363d"
                        color="#1d9bf0"
                        _hover={{ borderColor: '#1d9bf0', bg: 'rgba(29,155,240,0.08)' }}
                        borderRadius="lg"
                        fontSize="xs"
                        w={{ base: 'auto', lg: '100%' }}
                        h="32px"
                      >
                        {t('profile.visitTwitter')}: @{user.twitter_username}
                      </Button>
                    )}
                  </VStack>
                </VStack>
              ) : null}
            </Box>

            {/* RIGHT: Repositories */}
            <Box flex={1} minW={0}>
              {/* Sort controls */}
              <RepoSortControls
                sort={sortParams.sort}
                direction={sortParams.direction}
                type={sortParams.type}
                onChange={setSortParams}
              />

              {/* Error */}
              {reposError && (
                <Alert status="error" borderRadius="xl" bg="#1c1414" border="1px solid #6e3535" color="#f85149" mb={4}>
                  <AlertIcon color="#f85149" />
                  <AlertDescription>{t('errors.reposError')}</AlertDescription>
                </Alert>
              )}

              {/* Repos grid */}
              {repos.length > 0 && (
                <Grid
                  templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                  gap={4}
                >
                  {repos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                  ))}
                </Grid>
              )}

              {/* No repos */}
              {!reposLoading && repos.length === 0 && !reposError && (
                <Box textAlign="center" py={12} color="#8b949e">
                  <Text fontSize="sm">{t('profile.noRepos')}</Text>
                </Box>
              )}

              {/* Infinite scroll sentinel + loader */}
              <Box ref={sentinelRef} py={6} textAlign="center">
                {reposLoading && (
                  <HStack justify="center" spacing={3} color="#8b949e">
                    <Spinner size="sm" color="brand.500" />
                    <Text fontSize="sm">{t('profile.loadingMore')}</Text>
                  </HStack>
                )}
                {!reposLoading && !hasMore && repos.length > 0 && (
                  <Text fontSize="xs" color="#484f58" fontFamily="mono">
                    ✓ {t('profile.allLoaded')}
                  </Text>
                )}
              </Box>
            </Box>
          </Flex>
        )}
      </Container>
    </Box>
  )
}
