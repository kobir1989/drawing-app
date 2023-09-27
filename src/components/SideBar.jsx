import styled from '@emotion/styled'
import { Box, Button, Stack, Typography } from '@mui/material'
import Slider from '@mui/material/Slider'
import { SketchPicker } from 'react-color'
import Icon from './Icon'

const CustomIconButton = styled('button')(({ theme }) => ({
  padding: '0.5rem',
  width: '100%',
  borderRadius: '8px',
  background: 'none',
  border: 'none',
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'flex-start',
  cursor: 'pointer',
  color: theme.palette.primary.main,
  '&:hover': {
    background: theme.palette.primary.light
  }
}))

const SideBar = () => {
  return (
    <Stack
      gap={2}
      justifyContent='space-between'
      sx={theme => ({
        background: theme.palette.info.light,
        padding: '2rem 1rem',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        borderRadius: '1rem'
      })}
    >
      {/* Options  */}
      <Box>
        <Typography variant='h4' color='primary' mb={1}>
          Options
        </Typography>
        <CustomIconButton variant='outlined'>
          <Icon name='brush' size='1.5rem' />
          <Typography variant='h5'>Brush</Typography>
        </CustomIconButton>
        <CustomIconButton>
          <Icon name='erage' size='1.5rem' />
          <Typography variant='h5'>Eraser</Typography>
        </CustomIconButton>
        {/* slider */}
        <Box sx={{ width: '100%' }}>
          <Slider
            defaultValue={50}
            aria-label='Default'
            valueLabelDisplay='auto'
          />
        </Box>
      </Box>

      {/* Color picker */}
      <Box>
        <Typography variant='h4' color='primary' mb={1}>
          Select Color
        </Typography>
        <SketchPicker />
      </Box>
      {/* buttons */}
      <Stack mt={6} gap={3}>
        <Button variant='outlined'>Reset Canvas</Button>
        <Button variant='contained'>Save as Image</Button>
      </Stack>
    </Stack>
  )
}

export default SideBar
