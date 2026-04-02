import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Sora', sans-serif`,
    body: `'Sora', sans-serif`,
    mono: `'JetBrains Mono', monospace`,
  },
  colors: {
    brand: {
      50: '#e8f4ff',
      100: '#c5e0ff',
      200: '#9ecaff',
      300: '#72b3ff',
      400: '#4d9fff',
      500: '#1a8cff',
      600: '#0070e0',
      700: '#0058b3',
      800: '#003d80',
      900: '#00234d',
    },
    dark: {
      bg: '#0d1117',
      surface: '#161b22',
      border: '#30363d',
      text: '#c9d1d9',
      muted: '#8b949e',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#0d1117',
        color: '#c9d1d9',
        fontFamily: `'Sora', sans-serif`,
      },
      '*, *::before, *::after': {
        borderColor: '#30363d',
      },
    },
  },
  components: {
    Button: {
      defaultProps: { colorScheme: 'brand' },
      variants: {
        solid: {
          bg: 'brand.600',
          color: 'white',
          _hover: { bg: 'brand.500', transform: 'translateY(-1px)', boxShadow: '0 4px 20px rgba(26,140,255,0.3)' },
          _active: { bg: 'brand.700', transform: 'translateY(0)' },
          transition: 'all 0.2s ease',
        },
        ghost: {
          color: 'dark.text',
          _hover: { bg: 'whiteAlpha.100' },
        },
        outline: {
          borderColor: 'dark.border',
          color: 'dark.text',
          _hover: { bg: 'whiteAlpha.50', borderColor: 'brand.500' },
        },
      },
    },
    Input: {
      variants: {
        filled: {
          field: {
            bg: '#161b22',
            border: '1px solid',
            borderColor: '#30363d',
            color: '#c9d1d9',
            _hover: { bg: '#161b22', borderColor: '#58a6ff' },
            _focus: { bg: '#161b22', borderColor: '#58a6ff', boxShadow: '0 0 0 3px rgba(88,166,255,0.15)' },
            _placeholder: { color: '#8b949e' },
          },
        },
      },
      defaultProps: { variant: 'filled' },
    },
    Select: {
      variants: {
        filled: {
          field: {
            bg: '#161b22',
            border: '1px solid',
            borderColor: '#30363d',
            color: '#c9d1d9',
            _hover: { bg: '#161b22', borderColor: '#58a6ff' },
            _focus: { bg: '#161b22', borderColor: '#58a6ff', boxShadow: '0 0 0 3px rgba(88,166,255,0.15)' },
          },
        },
      },
      defaultProps: { variant: 'filled' },
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        px: 2,
        py: 0.5,
        fontSize: '0.7rem',
        fontWeight: '500',
        fontFamily: `'JetBrains Mono', monospace`,
      },
    },
  },
})

export default theme
