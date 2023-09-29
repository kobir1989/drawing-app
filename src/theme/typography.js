import { palette } from './palette'

export const typography = {
  fontFamily: `Cairo, sans-serif`,
  color: palette.primary.dark,
  // h1: {
  //   fontSize: '2.5rem', // 40px
  //   letterSpacing: '0.1px',
  //   fontWeight: '700',

  //   '@media (max-width: 600px)': {
  //     fontSize: '2rem',
  //     lineHeight: '2.4rem'
  //   }
  // },
  // h2: {
  //   fontSize: '1.87rem', // 30px
  //   lineHeight: '2.4rem',
  //   letterSpacing: '0.1px',
  //   fontWeight: '700',
  //   '@media (max-width: 600px)': {
  //     fontSize: '1.4rem',
  //     lineHeight: '2rem'
  //   }
  // },
  // h3: {
  //   fontSize: '1.75rem', // 28px
  //   lineHeight: '2.58rem',
  //   letterSpacing: '0.1px',
  //   fontWeight: '600',
  //   '@media (max-width: 600px)': {
  //     fontSize: '1.5rem',
  //     lineHeight: '2rem'
  //   }
  // },
  h4: {
    fontSize: '1.2rem', // 24px
    lineHeight: '1.8rem',
    fontWeight: '600'
  },
  h5: {
    fontSize: '1rem', // 18px
    lineHeight: '1.4rem',
    fontWeight: '600'
  },
  body1: {
    fontSize: '0.87rem',
    lineHeight: '1.4375rem',
    letterSpacing: '0.2px',
    fontFamily: 'Open Sans, sans-serif',
    fontWeight: '400',
    '@media (max-width: 600px)': {
      fontSize: '0.87rem',
      lineHeight: '1.2rem',
      letterSpacing: '0.2px'
    }
  },
  // extra small fonts
  body2: {
    fontSize: '0.81rem',
    lineHeight: '1.1rem',
    letterSpacing: '0.1px',
    fontWeight: '300',
    '@media (max-width: 600px)': {
      fontSize: '0.78rem',
      lineHeight: '1rem',
      letterSpacing: '0.2px'
    }
  }
}
