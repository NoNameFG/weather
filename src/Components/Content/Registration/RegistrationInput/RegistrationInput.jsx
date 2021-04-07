import DefaultInput from '../../../DefaultComponents/Input/Input.jsx'
import withError from '../../../HOC/input/withError.jsx'
import withTooltip from '../../../HOC/input/withTooltip.jsx'
import { compose } from 'redux'

export default compose(withError, withTooltip)(DefaultInput)
