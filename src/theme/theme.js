import { createTheme } from '@mui/material'
import { palette } from './palette'
import { typography } from './typography'

// Create a theme instance.
export const theme = createTheme({
  // typography
  typography,
  // color palette
  palette,
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    // buttons styles override
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '0.35rem 1.3rem',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'none',
          borderRadious: '8px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
          }
        }
      },
      // add a new variant name 'secondary'
      variants: [
        {
          props: { variant: 'secondary' },
          style: {
            background: palette.secondary.main,
            color: palette.primary.main,
            fontSize: '0.9rem',
            padding: '0.6rem 1.3rem',
            '&:hover': {
              background: palette.secondary.light
            },
            '@media (max-width: 600px)': {
              fontSize: '0.85rem',
              letterSpacing: '0.2px',
              padding: '0.5rem 1.3rem'
            }
          }
        }
      ]
    }
  },
  // breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200
    }
  }
})
