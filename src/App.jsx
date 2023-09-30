import { Container, Stack, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Canvas from './components/Canvas'
import SideBar from './components/SideBar'
import ToolBar from './components/Toolbar'
import { useCanvasContest } from './hooks/useCanvasContext'

function App() {
  const [selectedColor, setSelectedColor] = useState('#000')
  const [selectedTool, setSelectdTool] = useState('brush')
  const [selectedRange, setSelectedRange] = useState(5)
  const [checkedFillColor, setCheckedFillColor] = useState(false)
  const { canvasRef, context } = useCanvasContest()
  const [undoArray, setUndoArray] = useState([])
  const [redoArray, setRedoArray] = useState([])

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

  // Handle Checked fill color
  const handleCheckedFillColor = e => {
    setCheckedFillColor(e.target.checked)
  }

  //Save Dwrawing as PNG Image
  const hadleSaveImage = () => {
    const link = document.createElement('a')
    // convert canvas content to data URL (PNG format by default)
    const dataURL = canvasRef.current.toDataURL()
    // Set the href and download attributes for the anchor element
    link.href = dataURL
    link.download = `${uuidv4()}.png`
    // click to trigger download
    link.click()
  }

  // Reset Canvas handler
  const handleResetCanvas = useCallback(() => {
    if (context) {
      context.fillStyle = '#FFF'
      context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }, [canvasRef, context])

  // handle Undo Drowing
  const handleUndoDrawing = () => {
    if (undoArray.length > 0) {
      const updatedUndoArray = [...undoArray]
      const lastIndex = updatedUndoArray.pop()
      setRedoArray(prev => [...prev, lastIndex])
      setUndoArray(updatedUndoArray)

      // Check if there are still valid items in the updatedUndoArray
      if (updatedUndoArray.length > 0) {
        // render the last poped imageData from updatedUndoArray on the canvas
        const lastImageData = updatedUndoArray[updatedUndoArray.length - 1]
        context.putImageData(lastImageData, 0, 0)
      } else {
        // If the updatedUndoArray is empty, clear the canvas or handle it as needed
        handleResetCanvas()
      }
    }
  }
  // handle Redo Drawing
  const handleRedoDrawing = () => {
    if (redoArray.length > 0) {
      const updatedRedoArray = [...redoArray]
      const lastIndex = updatedRedoArray.pop()
      setRedoArray([...updatedRedoArray])
      setUndoArray(prev => [...prev, lastIndex])
      // render the last poped imageData from updatedRedoArray on the canvas
      context.putImageData(lastIndex, 0, 0)
    }
  }

  useEffect(() => {
    handleResetCanvas()
  }, [handleResetCanvas])

  return (
    <main>
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
          onSelectedColor={handleSelectedColor}
          onSelectedTool={handleSelectedTool}
          selectedTool={selectedTool}
          onSelectedRange={handleSelectedRange}
          selectedRange={selectedRange}
          onFillColor={handleCheckedFillColor}
          checkedFillColor={checkedFillColor}
          onResetCanvas={handleResetCanvas}
          onSaveImage={hadleSaveImage}
        />
        <Stack gap={3} width='100%'>
          <ToolBar
            onSelectedTool={handleSelectedTool}
            selectedTool={selectedTool}
            onUndoDrawing={handleUndoDrawing}
            onRedoDrawing={handleRedoDrawing}
            undoLength={undoArray?.length - 1}
            redoLength={redoArray?.length - 1}
          />
          <Canvas
            selectedRange={selectedRange}
            selectedColor={selectedColor}
            selectedTool={selectedTool}
            checkedFillColor={checkedFillColor}
            canvasRef={canvasRef}
            context={context}
            undoArray={undoArray}
            setUndoArray={setUndoArray}
          />
        </Stack>
      </Container>
      <footer>
        <Typography variant='body2' mt={1}>
          &#9400; {new Date().getFullYear()} | Kabir Hossain -
          Kobir.h.ritu@gmail.com
        </Typography>
      </footer>
    </main>
  )
}

export default App
