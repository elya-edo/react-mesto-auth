import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export function Register(props) {

  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
    calGoal: ''
  })
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {password, email } = formValue;
    props.register(password, email);
  }

  const toLogin =() => {
    navigate('/sign-in', {replace: true})
  }

  return(
    <div className="popup__container popup__container_login"> 
        <h3 className="popup__title popup__title_login">Регистрация</h3>
        <form className="popup__form" name='register' onSubmit={handleSubmit}>
        <input className="popup__input popup__input_login popup__input_first" id="input-email" type="email" placeholder="Email" name="email" value={formValue.email} onChange={handleChange} required/>
        <input className="popup__input popup__input_login" id="input-password" type="password" placeholder="Пароль" name="password" value={formValue.password} onChange={handleChange} required/>
          <button className="popup__save-button popup__save-button_login" type="submit">Зарегистрироваться</button>
          <button className="popup__navigate-button popup__navigate-button_login" onClick={toLogin}>Уже зарегистрированы? Войти</button>
        </form>
    </div> 
  );
}

export default Register; 