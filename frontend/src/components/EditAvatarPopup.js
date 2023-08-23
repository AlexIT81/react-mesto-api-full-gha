import React, { useState, useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();
  const [avatarError, setAvatarError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    avatarRef.current.value = "";
    setAvatarError("");
    setIsFormValid(false);
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleAvatarChange(e) {
    setAvatarError(e.target.validationMessage);
    setIsFormValid(e.target.closest("form").checkValidity());
  }

  return (
    <PopupWithForm
      name={"update-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Обновление..." : "Обновить"}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <input
        ref={avatarRef}
        onChange={handleAvatarChange}
        className={`popup__input popup__input_name ${
          avatarError && "popup__input_type_error"
        }`}
        type='url'
        name='link'
        required
        placeholder='Ссылка на аватар'
      />
      <span
        className={`popup__error link-input-error ${
          avatarError && "popup__error_visible"
        }`}
      >
        {avatarError}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
