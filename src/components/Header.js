import React from 'react';
import headerLogo from '../images/header-logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Header(props) {

  const navigate = useNavigate();
  
  function signOut() {
    localStorage.removeItem('jwt');
    navigate('/sign-in');
  }
  const location = useLocation();

  return (
    <header className="header">  
      <img className="header__logo" src={headerLogo} alt='"Логотип."'/>
      <div className="header__menu">
        {location.pathname === '/sign-up' && <Link to="/sign-in" className="header__button" >Войти</Link> }
        {location.pathname === '/sign-in' && <Link to="/sign-up" className="header__button" >Регистрация</Link> }
        {location.pathname === '/' && (<>
            <p className="header__email">{props.email}</p> &&
            <button className="header__button" onClick={signOut}>Выйти</button>
        </>)}
      </div>
    </header> 
  );
}

export default Header; 