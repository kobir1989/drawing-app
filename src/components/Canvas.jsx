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

    // start drawing (triggers on every onMouseDown event)
    const startDrawing = e => {
      setIsDrawing(true)
      // set starting mouse pointer x cordinate and y cordinate.
      PREV_MOUSE_X = e.nativeEvent.offsetX
      PREV_MOUSE_Y = e.nativeEvent.offsetY
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

    // Drawing (triggers on every onMouseMove event)
    const drawing = e => {
      // chage the cursor style
      canvasRef.current.style.cursor = 'crosshair'
      if (!context) return
      if (!isDrawing) return

      context.putImageData(SNAP_SHOT, 0, 0)

      // crate create object based on current mouse pointer
      const currentMousePosition = {
        offsetX: e.nativeEvent.offsetX,
        offsetY: e.nativeEvent.offsetY
      }
      switch (selectedTool) {
        case 'brush':
          // create line from current mouse ponter
          context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
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

    // Stop Drawing (triggers every on onMouseUp event)
    const stopDrawing = () => {
      CURRENT_SNAP_SHOT = context.getImageData(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      )
      CURRENT_SNAP_SHOT.id = uuidv4()
      setUndoArray(prev => [...prev, CURRENT_SNAP_SHOT])
      setIsDrawing(false)
    }

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
