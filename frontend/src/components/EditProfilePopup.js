import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameError("");
    setDescriptionError("");
    setIsFormValid(false);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
    setIsFormValid(e.target.closest("form").checkValidity());
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    setDescriptionError(e.target.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={"edit"}
      title={"Редактировать профиль"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        className={`popup__input popup__input_name ${
          nameError && "popup__input_type_error"
        }`}
        type='text'
        name='name'
        minLength='2'
        maxLength='40'
        value={name || ""}
        onChange={handleNameChange}
        required
        placeholder='Имя'
      />
      <span
        className={`popup__error name-input-error ${
          nameError && "popup__error_visible"
        }`}
      >
        {nameError}
      </span>
      <input
        className={`popup__input popup__input_job ${
          descriptionError && "popup__input_type_error"
        }`}
        type='text'
        name='job'
        minLength='2'
        maxLength='200'
        value={description || ""}
        onChange={handleDescriptionChange}
        required
        placeholder='Профессия'
      />
      <span
        className={`popup__error job-input-error ${
          descriptionError && "popup__error_visible"
        }`}
      >
        {descriptionError}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
