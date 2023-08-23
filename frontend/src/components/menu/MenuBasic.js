import React from "react";

const MenuBasic = ({ userEmail, onExitClick }) => {
  return (
    <>
      <li>{userEmail}</li>
      <li>
        <button
          type='button'
          className='header__btn main-link'
          onClick={onExitClick}
        >
          Выйти
        </button>
      </li>
    </>
  );
};

export default MenuBasic;
