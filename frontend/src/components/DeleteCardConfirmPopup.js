import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardConfirmPopup({ isOpen, onClose, isLoading, onDeleteCard }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name={"delete-card-confirm"}
      title={"Вы уверены?"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Удаление..." : "Да!"}
      onSubmit={handleSubmit}
      isFormValid={true}
    />
  );
}

export default DeleteCardConfirmPopup;
