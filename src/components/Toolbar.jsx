import { IconButton, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import Icon from './Icon'

const toolbarOptions = [
  { id: 'drag', icon: 'drag', label: 'Position' },
  { id: 'circle', icon: 'circle', label: 'Circle' },
  { id: 'rectangle', icon: 'rectangle', label: 'Rectangle' },
  { id: 'triangle', icon: 'triangle', label: 'Triangle' },
  { id: 'line', icon: 'line', label: 'Straight Line' },

  { id: 'undo', icon: 'undo', label: 'Undo' },
  { id: 'redo', icon: 'redo', label: 'Redo' }
]

const ToolBar = ({ onSelectedTool, selectedTool }) => {
  return (
    <Stack
      direction='row'
      justifyContent='center'
      alignItems='center'
      gap={2}
      sx={theme => ({
        background: theme.palette.info.light,
        padding: '0.7rem 1rem',
        borderRadius: '0.9rem',
        width: '100%',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'
      })}
    >
      {toolbarOptions.map(opt => (
        <IconButton
          onClick={() => onSelectedTool(opt?.id)}
          key={opt?.id}
          disableRipple
          sx={theme => ({
            gap: '0.4rem',
            padding: '5px 8px',
            borderRadius: '4px',
            color: theme.palette.primary.main,
            transition: 'all 0.3s ease-in-out',
            background:
              selectedTool === opt.id ? theme.palette.primary.light : 'none',
            '&:hover': {
              color: theme.palette.primary.main,
              transition: 'all 0.3s ease-in-out'
            }
          })}
        >
          <Icon name={opt?.icon} size='1.5rem' />
          <Typography variant='h5'>{opt?.label}</Typography>
        </IconButton>
      ))}
    </Stack>
  )
}

ToolBar.propTypes = {
  onSelectedTool: PropTypes.func.isRequired,
  selectedTool: PropTypes.string.isRequired
}

export default ToolBar
