import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [place, setPlace] = useState({ title: "", link: "" });
  const [placeError, setPlaceError] = useState({ title: "", link: "" });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setPlace({ title: "", link: "" });
    setPlaceError({ title: "", link: "" });
    setIsFormValid(false);
  }, [isOpen]);

  function handlePlaceChange(e) {
    setPlace({ ...place, [e.target.name]: e.target.value });
    setPlaceError({
      ...placeError,
      [e.target.name]: e.target.validationMessage,
    });
    setIsFormValid(e.target.closest('form').checkValidity())
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: place.title,
      link: place.link,
    });
  }

  return (
    <PopupWithForm
      name={"add"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Добавление..." : "Добавить"}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        className={`popup__input popup__input_title ${
          placeError.title && "popup__input_type_error"
        }`}
        type='text'
        name='title'
        minLength='2'
        maxLength='30'
        value={place.title}
        onChange={handlePlaceChange}
        required
        placeholder='Название'
      />
      <span
        className={`popup__error title-input-error ${
          placeError.title && "popup__error_visible"
        }`}
      >
        {placeError.title}
      </span>
      <input
        className={`popup__input popup__input_link ${
          placeError.link && "popup__input_type_error"
        }`}
        type='url'
        name='link'
        value={place.link}
        onChange={handlePlaceChange}
        required
        placeholder='Ссылка на картинку'
      />
      <span
        className={`popup__error link-input-error ${
          placeError.link && "popup__error_visible"
        }`}
      >
        {placeError.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
