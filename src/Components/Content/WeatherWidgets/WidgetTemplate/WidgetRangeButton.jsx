import { rangeTypesUI } from '../../../../Constants/RangeTypesUI.js'

const WidgetRangeButton = ({active, range, onClick}) => {
  const getActiveClassName = () => {
    let clNm = 'weather__template-range__item'
    if(active){
      clNm += ' weather__template-range__item--active'
    }
    return clNm
  }

  return (
    <div
      onClick={ () => onClick(range) }
      className={ getActiveClassName() }
    >
      {rangeTypesUI[range]}
    </div>
  )
}

export default WidgetRangeButton
