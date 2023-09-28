import styled from '@emotion/styled'
import { Box, Button, Stack, Typography } from '@mui/material'
import Slider from '@mui/material/Slider'
import PropTypes from 'prop-types'
import { SketchPicker } from 'react-color'
import Icon from './Icon'

const CustomIconButton = styled('button')(({ theme, selected }) => ({
  padding: '0.5rem',
  width: '100%',
  borderRadius: '8px',
  background: selected === 'on' ? theme.palette.primary.light : 'none',
  border: 'none',
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'flex-start',
  cursor: 'pointer',
  color: theme.palette.primary.main,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: theme.palette.primary.light,
    transition: 'all 0.3s ease-in-out'
  }
}))

const SideBar = ({
  color,
  handleSelectedColor,
  handleSelectedTool,
  selectedTool,
  handleSelectedRange,
  selectedRange
}) => {
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
      <Stack gap={2}>
        <Typography variant='h4' color='primary'>
          Options
        </Typography>
        <CustomIconButton
          selected={selectedTool === 'brush' ? 'on' : 'off'}
          onClick={() => {
            handleSelectedTool('brush')
          }}
        >
          <Icon name='brush' size='1.5rem' />
          <Typography variant='h5'>Brush</Typography>
        </CustomIconButton>
        <CustomIconButton
          onClick={() => handleSelectedTool('erage')}
          selected={selectedTool === 'erage' ? 'on' : 'off'}
        >
          <Icon name='erage' size='1.5rem' />
          <Typography variant='h5'>Eraser</Typography>
        </CustomIconButton>
        {/* slider */}
        <Box sx={{ width: '100%' }}>
          <Slider
            min={1}
            max={100}
            value={selectedRange}
            aria-label='Default'
            valueLabelDisplay='auto'
            onChange={handleSelectedRange}
          />
        </Box>
      </Stack>

      {/* Color picker */}
      <Box>
        <Typography variant='h4' color='primary' mb={1}>
          Select Color
        </Typography>
        <SketchPicker color={color} onChange={e => handleSelectedColor(e)} />
      </Box>
      {/* buttons */}
      <Stack mt={6} gap={3}>
        <Button variant='outlined'>Reset Canvas</Button>
        <Button variant='contained'>Save as Image</Button>
      </Stack>
    </Stack>
  )
}

SideBar.propTypes = {
  color: PropTypes.string.isRequired,
  handleSelectedColor: PropTypes.func.isRequired,
  handleSelectedTool: PropTypes.func.isRequired,
  selectedTool: PropTypes.string.isRequired,
  handleSelectedRange: PropTypes.func.isRequired,
  selectedRange: PropTypes.number.isRequired
}

export default SideBar
