import { lightBlue, purple } from '@material-ui/core/colors'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

let theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: purple,
  },
})

theme = responsiveFontSizes(theme)

export default theme