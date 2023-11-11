import React from 'react';

export function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card && props.card.link ? "popup_opened" : ""}`}>
        <div className="popup__container popup__container_image">
          <img className="popup__picture" src={props.card.link} alt={props.card.name} />
          <h2 className="popup__picture-title">{props.card.name}</h2>
          <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть"/>
        </div>
      </div>
  );
}

export default ImagePopup; 