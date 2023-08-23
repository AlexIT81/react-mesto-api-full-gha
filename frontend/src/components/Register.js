import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ onRegister }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue);
  };

  return (
    <section className='entry root__entry'>
      <h2 className='entry__title'>Регистрация</h2>
      <form className='entry__form' name='register' onSubmit={handleSubmit}>
        <input
          className='entry__input'
          placeholder='Email'
          type='email'
          name='email'
          value={formValue.email}
          onChange={handleChange}
          required
        />
        <span className='entry__error'></span>
        <input
          className='entry__input'
          placeholder='Пароль'
          type='password'
          name='password'
          value={formValue.password}
          onChange={handleChange}
          minLength='6'
          required
        />
        <span className='entry__error'></span>
        <button type='submit' className='entry__btn'>
          Зарегистрироваться
        </button>
      </form>
      <p className='entry__paragraph'>
        Уже зарегистрировались?{" "}
        <Link className='entry__link main-link' to='/sign-in'>
          Войти
        </Link>
      </p>
    </section>
  );
};

export default Register;
