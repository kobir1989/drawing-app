import styled from '@emotion/styled'
import { Box, Button, Stack, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
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
  onSelectedColor,
  onSelectedTool,
  selectedTool,
  onSelectedRange,
  selectedRange,
  checkedFillColor,
  onFillColor,
  onResetCanvas,
  onSaveImage
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
            onSelectedTool('brush')
          }}
        >
          <Icon name='brush' size='1.5rem' />
          <Typography variant='h5'>Brush</Typography>
        </CustomIconButton>
        <CustomIconButton
          onClick={() => onSelectedTool('erage')}
          selected={selectedTool === 'erage' ? 'on' : 'off'}
        >
          <Icon name='erage' size='1.5rem' />
          <Typography variant='h5'>Eraser</Typography>
        </CustomIconButton>
        {/* check fill color */}
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                sx={theme => ({
                  color: theme.palette.primary.main,
                  ml: '4px'
                })}
                checked={checkedFillColor}
                onChange={onFillColor}
              />
            }
            label={
              <Typography variant='h5' color='primary'>
                Fill Color
              </Typography>
            }
          />
        </Box>
        {/* slider */}
        <Box sx={{ width: '100%' }}>
          <Slider
            min={1}
            max={100}
            value={selectedRange}
            aria-label='Default'
            valueLabelDisplay='auto'
            onChange={onSelectedRange}
          />
        </Box>
      </Stack>

      {/* Color picker */}
      <Box>
        <Typography variant='h4' color='primary' mb={1}>
          Select Color
        </Typography>
        <SketchPicker color={color} onChange={e => onSelectedColor(e)} />
      </Box>
      {/* buttons */}
      <Stack mt={6} gap={3}>
        <Button variant='outlined' onClick={onResetCanvas}>
          Reset Canvas
        </Button>
        <Button variant='contained' onClick={onSaveImage}>
          Save as Image
        </Button>
      </Stack>
    </Stack>
  )
}

// Props Types
SideBar.propTypes = {
  color: PropTypes.string.isRequired,
  onSelectedColor: PropTypes.func.isRequired,
  onSelectedTool: PropTypes.func.isRequired,
  selectedTool: PropTypes.string.isRequired,
  onSelectedRange: PropTypes.func.isRequired,
  selectedRange: PropTypes.number.isRequired,
  checkedFillColor: PropTypes.bool.isRequired,
  onFillColor: PropTypes.func.isRequired,
  onResetCanvas: PropTypes.func.isRequired,
  onSaveImage: PropTypes.func.isRequired
}

export default SideBar
