import withUnactive from '../../../HOC/input/withUnactive.jsx'
import withError from '../../../HOC/input/withError.jsx'
import DefaultInput from '../../../DefaultComponents/Input/Input.jsx'
import { compose } from 'redux'


export default compose(withUnactive, withError)(DefaultInput)
