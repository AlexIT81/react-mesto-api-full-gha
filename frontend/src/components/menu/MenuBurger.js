import React from "react";

const MenuBurger = ({ isBurgerClicked, onBurgerMenuClick }) => {
  return (
    <li>
      <button
        type='button'
        className={`header__burger-btn main-link ${
          isBurgerClicked ? "header__burger-btn_active" : ""
        }`}
        onClick={onBurgerMenuClick}
      ></button>
    </li>
  );
};

export default MenuBurger;
