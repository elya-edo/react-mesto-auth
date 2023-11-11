import React, { useState } from "react";

export function Login(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    calGoal: "",
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
    props.authorize(formValue.email, formValue.password);
  };

  return (
    <div className="popup__container popup__container_login">
      <h3 className="popup__title popup__title_login">Вход</h3>
      <form className="popup__form" name="login" onSubmit={handleSubmit}>
        <input
          className="popup__input popup__input_login popup__input_first"
          id="input-email"
          type="email"
          placeholder="Email"
          name="email"
          value={formValue.email}
          onChange={handleChange}
          required
        />
        <input
          className="popup__input popup__input_login"
          id="input-password"
          type="password"
          placeholder="Пароль"
          name="password"
          value={formValue.password}
          onChange={handleChange}
          required
        />
        <button
          className="popup__save-button popup__save-button_login"
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
