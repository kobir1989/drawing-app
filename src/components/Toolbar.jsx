import styled from '@emotion/styled'
import { IconButton, Stack, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import Icon from './Icon'

const StyledIconButton = styled(IconButton)(({ theme, bg }) => ({
  gap: '0.4rem',
  padding: '5px 8px',
  borderRadius: '4px',
  color: theme.palette.primary.main,
  transition: 'all 0.3s ease-in-out',
  background: bg === 'true' ? theme.palette.primary.light : 'none',
  '&:hover': {
    color: theme.palette.primary.main,
    transition: 'all 0.3s ease-in-out'
  }
}))

const toolbarOptions = [
  { id: 'circle', icon: 'circle', label: 'Circle' },
  { id: 'rectangle', icon: 'rectangle', label: 'Rectangle' },
  { id: 'triangle', icon: 'triangle', label: 'Triangle' },
  { id: 'line', icon: 'line', label: 'Straight Line' }
]

const ToolBar = ({
  onSelectedTool,
  selectedTool,
  onUndoDrawing,
  onRedoDrawing,
  undoLength,
  redoLength
}) => {
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
        <StyledIconButton
          onClick={() => onSelectedTool(opt?.id)}
          key={opt?.id}
          disableRipple
          bg={selectedTool === opt?.id ? 'true' : ''}
        >
          <Icon name={opt?.icon} size='1.5rem' />
          <Typography variant='h5'>{opt?.label}</Typography>
        </StyledIconButton>
      ))}
      {/* Undo Button */}
      <StyledIconButton
        onClick={onUndoDrawing}
        disableRipple
        disabled={undoLength < 0}
        sx={{ '&:hover': { background: '#F0EEFF' } }}
      >
        <Icon name='undo' size='1.5rem' />
        <Typography variant='h5'>Undo</Typography>
      </StyledIconButton>
      {/* Redo Button */}
      <StyledIconButton
        sx={{ '&:hover': { background: '#F0EEFF' } }}
        onClick={onRedoDrawing}
        disableRipple
        disabled={redoLength < 0}
      >
        <Icon name='redo' size='1.5rem' />
        <Typography variant='h5'>Redo</Typography>
      </StyledIconButton>
    </Stack>
  )
}

ToolBar.propTypes = {
  onSelectedTool: PropTypes.func.isRequired,
  selectedTool: PropTypes.string.isRequired,
  onUndoDrawing: PropTypes.func.isRequired,
  onRedoDrawing: PropTypes.func,
  undoLength: PropTypes.number,
  redoLength: PropTypes.number
}

export default ToolBar
