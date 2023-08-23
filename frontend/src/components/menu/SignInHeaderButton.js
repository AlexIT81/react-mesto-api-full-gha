import React from "react";
import { Link } from "react-router-dom";

const SignInHeaderButton = () => {
  return (
    <li>
      <Link to='/sign-up' className='header__link main-link'>
        Регистрация
      </Link>
    </li>
  );
};

export default SignInHeaderButton;
