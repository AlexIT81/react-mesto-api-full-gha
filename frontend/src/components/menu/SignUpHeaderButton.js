import React from "react";
import { Link } from "react-router-dom";

const SignUpHeaderButton = () => {
  return (
    <li>
      <Link to='/sign-in' className='header__link main-link'>
        Войти
      </Link>
    </li>
  );
};

export default SignUpHeaderButton;
