import React, { useState } from "react";

const Login = ({ onLogin }) => {
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
    onLogin(formValue);
  };

  return (
    <section className='entry root__entry'>
      <h2 className='entry__title'>Вход</h2>
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
          minLength='6'
          value={formValue.password}
          onChange={handleChange}
          required
        />
        <span className='entry__error'></span>
        <button type='submit' className='entry__btn'>
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;
