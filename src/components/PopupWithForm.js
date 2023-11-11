import React from 'react';

export function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}> 
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        <form className="popup__form" name={`${props.name}-form`} onSubmit={props.onSubmit} noValidate>   
          {props.children}
          <button className="popup__save-button" type="submit">{props.buttonText}</button>
        </form>
        <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть"/>
      </div>
    </div>
  );
}

export default PopupWithForm;