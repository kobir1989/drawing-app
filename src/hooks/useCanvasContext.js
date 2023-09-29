/**
 * @function useCanvasContest
 * @param {none}
 * @returns {Object} - canvasRef and context
 */

import { useEffect, useRef, useState } from 'react'

export const useCanvasContest = () => {
  const [context, setContext] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    // set canvas width and height
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Set properties for smoother lines
    ctx.lineJoin = 'round' // Rounded line corners
    ctx.lineCap = 'round' // Rounded line endings
    setContext(ctx)
  }, [])
  return { canvasRef, context }
}
