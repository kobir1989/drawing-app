import { IconButton, Stack, Typography } from '@mui/material'
import Icon from './Icon'

const toolbarOptions = [
  { id: 't1', icon: 'circle', label: 'Circle' },
  { id: 't2', icon: 'square', label: 'Square' },
  { id: 't3', icon: 'triangle', label: 'Triangle' },
  { id: 't7', icon: 'line', label: 'Straight Line' },
  { id: 't9', icon: 'fillColor', label: 'Fill Color' },
  { id: 't10', icon: 'poligon', label: 'Poligon' },
  { id: 't4', icon: 'undo', label: 'Undo' },
  { id: 't5', icon: 'redo', label: 'Redo' }
]

const ToolBar = () => {
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
          key={opt?.id}
          disableRipple
          sx={theme => ({
            gap: '0.4rem',
            padding: '5px',
            borderRadius: '4px',
            '&:hover': {
              color: theme.palette.primary.main
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

export default ToolBar
