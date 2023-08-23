function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__image-wrapper">
        <figure className="popup__figure">
          <img className="popup__big-image" src={card.link} alt={card.name} />
          <figcaption className="popup__figcaption">{card.name}</figcaption>
        </figure>
        <button className="popup__close main-link" onClick={onClose} type="button"></button>
      </div>
    </div>
  )
}

export default ImagePopup;