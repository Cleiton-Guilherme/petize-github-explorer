import {
  Box,
  Flex,
  Text,
  Badge,
  HStack,
  Link,
  Icon,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

// Simple inline SVG icons to avoid adding extra deps
const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.873 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
  </svg>
)

const ForkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
  </svg>
)

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Dart: '#00B4AB',
}

export default function RepoCard({ repo }) {
  const { t } = useTranslation()
  const langColor = LANGUAGE_COLORS[repo.language] || '#8b949e'

  const updatedAt = new Date(repo.updated_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Box
      p={5}
      bg="#161b22"
      border="1px solid"
      borderColor="#30363d"
      borderRadius="xl"
      _hover={{
        borderColor: '#58a6ff',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
      }}
      transition="all 0.2s ease"
      cursor="default"
    >
      <Flex direction="column" gap={2} h="100%">
        {/* Repo name */}
        <Link
          href={repo.html_url}
          isExternal
          fontWeight="600"
          color="#58a6ff"
          fontSize="sm"
          fontFamily="mono"
          _hover={{ color: '#79c0ff', textDecoration: 'none' }}
          isTruncated
        >
          {repo.name}
        </Link>

        {/* Description */}
        {repo.description && (
          <Text fontSize="xs" color="#8b949e" noOfLines={2} flex={1}>
            {repo.description}
          </Text>
        )}

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <Flex gap={1} flexWrap="wrap">
            {repo.topics.slice(0, 4).map((topic) => (
              <Badge key={topic} colorScheme="blue" variant="subtle" fontSize="0.65rem">
                {topic}
              </Badge>
            ))}
          </Flex>
        )}

        {/* Footer stats */}
        <Flex mt="auto" pt={2} gap={4} align="center" flexWrap="wrap">
          {repo.language && (
            <HStack spacing={1}>
              <Box
                w="10px"
                h="10px"
                borderRadius="full"
                bg={langColor}
                flexShrink={0}
              />
              <Text fontSize="xs" color="#8b949e" fontFamily="mono">
                {repo.language}
              </Text>
            </HStack>
          )}

          {repo.stargazers_count > 0 && (
            <HStack spacing={1} color="#8b949e">
              <StarIcon />
              <Text fontSize="xs" fontFamily="mono">
                {repo.stargazers_count.toLocaleString()}
              </Text>
            </HStack>
          )}

          {repo.forks_count > 0 && (
            <HStack spacing={1} color="#8b949e">
              <ForkIcon />
              <Text fontSize="xs" fontFamily="mono">
                {repo.forks_count.toLocaleString()}
              </Text>
            </HStack>
          )}

          <Text fontSize="xs" color="#484f58" ml="auto">
            {updatedAt}
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}
