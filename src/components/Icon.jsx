import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import Brightness1OutlinedIcon from '@mui/icons-material/Brightness1Outlined'
import BrushIcon from '@mui/icons-material/Brush'
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined'
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp'
import CreateIcon from '@mui/icons-material/Create'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp'
import RedoIcon from '@mui/icons-material/Redo'
import SaveIcon from '@mui/icons-material/Save'
import StarBorderSharpIcon from '@mui/icons-material/StarBorderSharp'
import UndoIcon from '@mui/icons-material/Undo'
import PropTypes from 'prop-types'

const icons = {
  undo: UndoIcon,
  redo: RedoIcon,
  delete: DeleteForeverIcon,
  drow: CreateIcon,
  erage: AutoFixHighIcon,
  save: SaveIcon,
  rectangle: CheckBoxOutlineBlankSharpIcon,
  circle: Brightness1OutlinedIcon,
  triangle: ChangeHistoryOutlinedIcon,
  line: HorizontalRuleIcon,
  brush: BrushIcon,
  poligon: StarBorderSharpIcon,
  fillColor: RadioButtonCheckedSharpIcon,
  drag: HighlightAltIcon
}

const Icon = props => {
  const { name, size, color } = props
  const Icon = icons[name]

  return <Icon sx={{ fontSize: size, color }} />
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  color: PropTypes.string
}

export default Icon
