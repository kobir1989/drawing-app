import { Container, Stack } from '@mui/material'
import { useState } from 'react'
import Canvas from './components/Canvas'
import SideBar from './components/SideBar'
import ToolBar from './components/Toolbar'

function App() {
  const [selectedColor, setSelectedColor] = useState('#000')
  const [selectedTool, setSelectdTool] = useState('brush')
  const [selectedRange, setSelectedRange] = useState(5)

  // Handle Selected Color (*color picker)
  const handleSelectedColor = e => {
    setSelectedColor(e.hex)
  }

  // Handel Selected Tools (*Brush as default value)
  const handleSelectedTool = tool => {
    setSelectdTool(tool)
  }

  // Handle selected Range (*slider)
  const handleSelectedRange = (_e, newValue) => {
    setSelectedRange(newValue)
  }

  return (
    <Container
      maxWidth='xl'
      sx={theme => ({
        [theme.breakpoints.up('md')]: {
          display: 'flex',
          gap: '2rem',
          marginTop: '2rem'
        }
      })}
    >
      <SideBar
        color={selectedColor}
        handleSelectedColor={handleSelectedColor}
        handleSelectedTool={handleSelectedTool}
        selectedTool={selectedTool}
        handleSelectedRange={handleSelectedRange}
        selectedRange={selectedRange}
      />
      <Stack gap={3}>
        <ToolBar
          handleSelectedTool={handleSelectedTool}
          selectedTool={selectedTool}
        />
        <Canvas selectedRange={selectedRange} selectedColor={selectedColor} />
      </Stack>
    </Container>
  )
}

export default App
