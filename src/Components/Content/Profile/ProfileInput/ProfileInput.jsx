import withUnactive from '../../../HOC/input/withUnactive.jsx'
import withError from '../../../HOC/input/withError.jsx'
import withTooltip from '../../../HOC/input/withTooltip.jsx'
import DefaultInput from '../../../DefaultComponents/Input/Input.jsx'
import { compose } from 'redux'


export default compose(withTooltip, withUnactive)(DefaultInput)
