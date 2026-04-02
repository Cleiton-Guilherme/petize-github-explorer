import {
  Box,
  Flex,
  Select,
  Text,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const SORT_OPTIONS = ['full_name', 'created', 'updated', 'pushed']
const DIRECTION_OPTIONS = ['asc', 'desc']
const TYPE_OPTIONS = ['all', 'public', 'forks', 'sources', 'member']

export default function RepoSortControls({ sort, direction, type, onChange }) {
  const { t } = useTranslation()
  const isMobile = useBreakpointValue({ base: true, md: false })

  const handleChange = (key, value) => {
    onChange({ sort, direction, type, [key]: value })
  }

  const selectStyle = {
    bg: '#161b22',
    borderColor: '#30363d',
    color: '#c9d1d9',
    fontSize: 'sm',
    h: '36px',
    _hover: { borderColor: '#58a6ff' },
    _focus: { borderColor: '#58a6ff', boxShadow: '0 0 0 3px rgba(88,166,255,0.15)' },
  }

  const LabeledSelect = ({ label, value, options, optionsKey, onChange: onChg }) => (
    <Box>
      <Text fontSize="xs" color="#8b949e" mb={1} fontWeight="500" letterSpacing="wide" textTransform="uppercase">
        {label}
      </Text>
      <Select
        value={value}
        onChange={(e) => onChg(e.target.value)}
        size="sm"
        minW={isMobile ? '100%' : '140px'}
        sx={selectStyle}
        borderRadius="lg"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: '#161b22' }}>
            {t(`profile.${optionsKey}.${opt}`)}
          </option>
        ))}
      </Select>
    </Box>
  )

  return (
    <Box
      p={4}
      bg="#161b22"
      borderRadius="xl"
      border="1px solid"
      borderColor="#30363d"
      mb={4}
    >
      <Flex
        gap={4}
        flexWrap="wrap"
        align={isMobile ? 'stretch' : 'flex-end'}
        direction={isMobile ? 'column' : 'row'}
      >
        <LabeledSelect
          label={t('profile.sortBy')}
          value={sort}
          options={SORT_OPTIONS}
          optionsKey="sortOptions"
          onChange={(v) => handleChange('sort', v)}
        />
        <LabeledSelect
          label={t('profile.direction')}
          value={direction}
          options={DIRECTION_OPTIONS}
          optionsKey="directionOptions"
          onChange={(v) => handleChange('direction', v)}
        />
        <LabeledSelect
          label={t('profile.type')}
          value={type}
          options={TYPE_OPTIONS}
          optionsKey="typeOptions"
          onChange={(v) => handleChange('type', v)}
        />
      </Flex>
    </Box>
  )
}
