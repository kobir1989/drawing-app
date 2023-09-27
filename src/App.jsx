import { Container, Stack } from '@mui/material'
import Canvas from './components/Canvas'
import SideBar from './components/SideBar'
import ToolBar from './components/Toolbar'

function App() {
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
      <SideBar />
      <Stack gap={3}>
        <ToolBar />
        <Canvas />
      </Stack>
    </Container>
  )
}

export default App
