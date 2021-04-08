import PopupInput from './PopupInput.js'
import DefaultButton from '../../../DefaultComponents/Button/DefaultButton.jsx'
import { buttonTypes } from '../../../DefaultComponents/Button/buttonTypes.js'

const UpdatePopup = ({ confirmAction, cancelAction, onInputChange, errors = {}, confirmPassword }) => {
  const preventPropagation = e => {
    e.stopPropagation()
  }

  return(
    <div
      className="profile__popup"
      onClick={cancelAction}
    >
      <div
        className="profile__popup-template"
        onClick={preventPropagation}
      >
        <PopupInput
          errors={errors}
          placeholder="Password"
          type="password"
          name="confirmPassword"
          autoFocus={true}
          onChange={onInputChange}
          value={confirmPassword}
        />
        <div className="profile__popup-template-controll">
          <DefaultButton
            type={buttonTypes.PRIMARY}
            text="Confirm"
            onClick={confirmAction}
          />
          <DefaultButton
            type={buttonTypes.SECONDARY}
            text="Cancel"
            onClick={cancelAction}
          />
        </div>
      </div>
    </div>
  )
}

export default UpdatePopup
