import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'

const Canvas = ({ selectedRange, selectedColor }) => {
  const canvasRef = useRef(null)
  const [context, setContext] = useState(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // start drawing (triggers on every onMouseDown event)
  const startDrawing = () => {
    setIsDrawing(true)
    // crate new drawing path on onMouseDown event
    context.beginPath()
    // set brush width - default 5 (getting value from slide range)
    context.lineWidth = selectedRange
    // set line color based on selectedColor (getting color from color picker)
    context.strokeStyle = selectedColor
  }

  // Drawing (triggers on every onMouseMove event)
  const drawing = e => {
    if (!context) return
    if (!isDrawing) return
    // create line from current mouse ponter
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    context.stroke()
  }

  // Stop Drawing (triggers every on onMouseUp event)
  const stopDrawing = () => {
    setIsDrawing(false)
  }

  useEffect(() => {
    // create canvas ref
    const canvas = canvasRef.current
    // initialized the context
    const ctx = canvas.getContext('2d')
    // set canvas width and height
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Set properties for smoother lines
    ctx.lineJoin = 'round' // Rounded line corners
    ctx.lineCap = 'round' // Rounded line endings

    setContext(ctx)
  }, [])
  return (
    <Box
      sx={theme => ({
        background: theme.palette.info.light,
        padding: '1rem',
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        borderRadius: '1rem',
        height: '80vh',
        width: '100%',
        flex: 1,
        overflow: 'hidden'
      })}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={drawing}
        onMouseUp={stopDrawing}
      ></canvas>
    </Box>
  )
}

Canvas.propTypes = {
  selectedRange: PropTypes.string.isRequired,
  selectedColor: PropTypes.string.isRequired
}

export default Canvas
