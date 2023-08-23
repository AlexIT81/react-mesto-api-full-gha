function PopupWithForm({ children, isOpen, name, onClose, title, buttonText, onSubmit, isFormValid }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" action="./" name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button className={`popup__button ${!isFormValid ? 'popup__button_disabled' : ''}`} type="submit" disabled={!isFormValid}>{buttonText}</button>
        </form>
        <button className="popup__close main-link" onClick={onClose} type="button"></button>
      </div>
    </div>
  )
}

export default PopupWithForm;