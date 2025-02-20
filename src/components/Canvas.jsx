/* eslint-disable react/display-name */
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// Global Variables
let PREV_MOUSE_X
let PREV_MOUSE_Y
let SNAP_SHOT
let CURRENT_SNAP_SHOT
const Canvas = React.memo(
  ({
    selectedRange,
    selectedColor,
    selectedTool,
    checkedFillColor,
    canvasRef,
    context,
    setUndoArray
  }) => {
    const [isDrawing, setIsDrawing] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 })
    const [selectionBounds, setSelectionBounds] = useState(null)
    const [selectedContent, setSelectedContent] = useState(null)

    // Check if fill color is selected or not
    const checkFillColor = checkedFillColor => {
      if (!checkedFillColor) {
        context.strokeStyle = selectedColor
        context.stroke()
      } else {
        context.fillStyle = selectedColor
        context.fill()
      }
    }

    // Draw Triangel
    const drawTriangle = ({ offsetX, offsetY }) => {
      // create new Path for drawTriangle
      context.beginPath()
      context.moveTo(PREV_MOUSE_X, PREV_MOUSE_Y)
      context.lineTo(offsetX, offsetY)
      context.lineTo(PREV_MOUSE_X * 2 - offsetX, offsetY)
      context.closePath()
      // Check if fill color selected or not
      checkFillColor(checkedFillColor)
    }

    // Draw Straight Line
    const drawStraightLine = ({ offsetX, offsetY }) => {
      // create new Path for drawPoligon
      context.beginPath()
      context.moveTo(PREV_MOUSE_X, PREV_MOUSE_Y)
      context.lineTo(offsetX, offsetY)
      context.strokeStyle = selectedColor
      context.stroke()
    }

    //Draw Circle
    const drowCircle = ({ offsetX, offsetY }) => {
      // create new Path for drowCircle
      context.beginPath()
      // Formula to calculate the distance between two points in a two-dimensional space (X and Y distance)
      let radius = Math.sqrt(
        Math.pow(PREV_MOUSE_X - offsetX, 2) +
          Math.pow(PREV_MOUSE_Y - offsetY, 2)
      )
      // create Circle
      context.arc(PREV_MOUSE_X, PREV_MOUSE_Y, radius, 0, 2 * Math.PI)
      // Check if fill color selected or not
      checkFillColor(checkedFillColor)
    }

    // Draw Rectangle
    const drawRactangle = ({ offsetX, offsetY }) => {
      // Check if fill color selected or not
      if (!checkedFillColor) {
        context.strokeStyle = selectedColor
        context.strokeRect(
          offsetX,
          offsetY,
          PREV_MOUSE_X - offsetX,
          PREV_MOUSE_Y - offsetY
        )
      } else {
        context.fillStyle = selectedColor
        context.fillRect(
          offsetX,
          offsetY,
          PREV_MOUSE_X - offsetX,
          PREV_MOUSE_Y - offsetY
        )
      }
    }

    // Erager
    const erager = ({ offsetX, offsetY }) => {
      canvasRef.current.style.cursor = 'default'
      context.lineTo(offsetX, offsetY)
      context.strokeStyle = '#FFF'
      context.stroke()
    }

    const isPointInPath = (x, y) => {
      const imageData = context.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )
      const pixels = imageData.data

      // Check a small area around the clicked point
      const radius = 5
      for (let offsetY = -radius; offsetY <= radius; offsetY++) {
        for (let offsetX = -radius; offsetX <= radius; offsetX++) {
          const checkX = x + offsetX
          const checkY = y + offsetY

          if (
            checkX < 0 ||
            checkY < 0 ||
            checkX >= imageData.width ||
            checkY >= imageData.height
          ) {
            continue
          }

          const index = (checkY * imageData.width + checkX) * 4
          if (pixels[index + 3] > 20) {
            // More lenient alpha threshold
            return true
          }
        }
      }
      return false
    }

    const getSelectionBounds = (startX, startY) => {
      const imageData = context.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )
      const pixels = imageData.data

      let minX = startX
      let minY = startY
      let maxX = startX
      let maxY = startY
      const searchRadius = 100 // Increased search radius

      // Flood fill algorithm to find connected pixels
      const stack = [[startX, startY]]
      const visited = new Set()

      while (stack.length > 0) {
        const [x, y] = stack.pop()
        const key = `${x},${y}`

        if (visited.has(key)) continue
        visited.add(key)

        if (x < 0 || x >= imageData.width || y < 0 || y >= imageData.height)
          continue

        const index = (y * imageData.width + x) * 4
        if (pixels[index + 3] > 0) {
          // If pixel is not transparent
          minX = Math.min(minX, x)
          minY = Math.min(minY, y)
          maxX = Math.max(maxX, x)
          maxY = Math.max(maxY, y)

          // Check neighboring pixels
          const neighbors = [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1]
          ]

          for (const [nx, ny] of neighbors) {
            if (!visited.has(`${nx},${ny}`)) {
              const dist = Math.abs(nx - startX) + Math.abs(ny - startY)
              if (dist <= searchRadius) {
                stack.push([nx, ny])
              }
            }
          }
        }
      }

      // Add padding around the selection
      const padding = 10
      return {
        x: Math.max(0, minX - padding),
        y: Math.max(0, minY - padding),
        width: Math.min(
          maxX - minX + padding * 2,
          canvasRef.current.width - minX
        ),
        height: Math.min(
          maxY - minY + padding * 2,
          canvasRef.current.height - minY
        )
      }
    }

    const startDrawing = e => {
      const x = e.nativeEvent.offsetX
      const y = e.nativeEvent.offsetY

      if (selectedTool === 'highlight') {
        setIsDrawing(true)
        PREV_MOUSE_X = x
        PREV_MOUSE_Y = y
        SNAP_SHOT = context.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        )
        return
      }

      if (selectedTool === 'hand' && isPointInPath(x, y)) {
        setIsDragging(true)
        setDragStartPos({ x, y })
        canvasRef.current.style.cursor = 'move'

        // Save the bounds of selected area
        const bounds = getSelectionBounds(x, y)
        setSelectionBounds(bounds)

        // Save the entire canvas state before any modifications
        SNAP_SHOT = context.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        )

        // Create a temporary canvas to store the selected content
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = bounds.width
        tempCanvas.height = bounds.height
        const tempContext = tempCanvas.getContext('2d')

        // Copy the selected region to the temporary canvas
        tempContext.drawImage(
          canvasRef.current,
          bounds.x,
          bounds.y,
          bounds.width,
          bounds.height,
          0,
          0,
          bounds.width,
          bounds.height
        )
        // Store the selected content
        setSelectedContent(tempCanvas)
        return
      }

      setIsDrawing(true)
      PREV_MOUSE_X = x
      PREV_MOUSE_Y = y
      // crate new drawing path on onMouseDown event
      context.beginPath()
      // set brush width - default 5 (getting value from slide range)
      context.lineWidth = selectedRange
      // set line color based on selectedColor (getting color from color picker)
      context.strokeStyle = selectedColor

      //  get pixel data from a rectangular area
      SNAP_SHOT = context.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )
    }

    const drawing = e => {
      if (!context) return

      const x = e.nativeEvent.offsetX
      const y = e.nativeEvent.offsetY

      if (isDragging && selectionBounds && selectedContent) {
        const dx = x - dragStartPos.x
        const dy = y - dragStartPos.y

        // Restore the original canvas state
        context.putImageData(SNAP_SHOT, 0, 0)

        // Clear a slightly larger area than the bounds to ensure clean movement
        context.clearRect(
          selectionBounds.x - 1,
          selectionBounds.y - 1,
          selectionBounds.width + 2,
          selectionBounds.height + 2
        )

        // Draw the selected content at the new position
        context.drawImage(
          selectedContent,
          selectionBounds.x + dx,
          selectionBounds.y + dy
        )
        return
      }

      if (!isDrawing) return

      context.putImageData(SNAP_SHOT, 0, 0)

      // crate create object based on current mouse pointer
      const currentMousePosition = {
        offsetX: x,
        offsetY: y
      }
      switch (selectedTool) {
        case 'brush':
          // create line from current mouse ponter
          context.lineTo(x, y)
          context.stroke()
          break
        case 'rectangle':
          drawRactangle(currentMousePosition)
          break
        case 'circle':
          drowCircle(currentMousePosition)
          break
        case 'triangle':
          drawTriangle(currentMousePosition)
          break
        case 'line':
          drawStraightLine(currentMousePosition)
          break
        case 'erage':
          erager(currentMousePosition)
          break
        default:
          break
      }
    }

    const stopDrawing = () => {
      if (isDragging) {
        setIsDragging(false)
        setSelectionBounds(null)
        setSelectedContent(null)
        canvasRef.current.style.cursor = 'crosshair'

        // Save the final state for undo
        CURRENT_SNAP_SHOT = context.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        )
        CURRENT_SNAP_SHOT.id = uuidv4()
        setUndoArray(prev => [...prev, CURRENT_SNAP_SHOT])
      }

      if (isDrawing) {
        CURRENT_SNAP_SHOT = context.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        )
        CURRENT_SNAP_SHOT.id = uuidv4()
        setUndoArray(prev => [...prev, CURRENT_SNAP_SHOT])
      }

      setIsDrawing(false)
    }

    return (
      <Box
        sx={theme => ({
          background: theme.palette.info.light,
          padding: '1rem',
          boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          borderRadius: '1rem',
          height: '75vh',
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
)
// Prop Types
Canvas.propTypes = {
  selectedRange: PropTypes.number.isRequired,
  selectedColor: PropTypes.string.isRequired,
  selectedTool: PropTypes.string.isRequired,
  checkedFillColor: PropTypes.bool.isRequired,
  canvasRef: PropTypes.object.isRequired,
  context: PropTypes.object,
  setUndoArray: PropTypes.func
}

export default Canvas
