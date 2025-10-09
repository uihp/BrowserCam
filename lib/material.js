import '@material/web/all'
import '@material/web/labs/navigationbar/navigation-bar'
import '@material/web/labs/navigationtab/navigation-tab'
import '@material/web/labs/navigationdrawer/navigation-drawer'
import '@material/web/labs/card/filled-card'

import colorSysStyles from './material.css' with { type: 'css' }
import {styles as typescale} from '@material/web/typography/md-typescale-styles.js'

document.adoptedStyleSheets.push(colorSysStyles)
document.adoptedStyleSheets.push(typescale.styleSheet)

export const typescaleStyles = typescale.styleSheet
