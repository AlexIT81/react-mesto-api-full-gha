function InfoTooltip({ isOpen, onClose, message, icon }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className='popup__container popup__container_place_alert'>
        <img
          src={icon}
          alt={message}
          className='popup__img'
        />
        <h3 className='popup__title_place_alert'>{message}</h3>
        <button
          className='popup__close main-link'
          onClick={onClose}
          type='button'
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
