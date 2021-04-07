import { ReactComponent as DeleteSVG } from '../../../../Dist/Content/delete.svg'

const CityList = () => {
  return(
    <div className="profile__city-list">
      <div className="profile__city-list__item">
        <div className="profile__city-list__item-id">
          <span>id: </span>123567</div>
        <div className="profile__city-list__item-city">Kyiv</div>
        <button className="profile__city-list__item-button">
          <DeleteSVG/>
        </button>
      </div>

      <div className="profile__city-list__item">
        <div className="profile__city-list__item-id">
          <span>id: </span>123567</div>
        <div className="profile__city-list__item-city">Not Kyiv</div>
        <button className="profile__city-list__item-button">
          <DeleteSVG/>
        </button>
      </div>
    </div>
  )
}

export default CityList
