import React from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

export function Card(props) {
  const currentUser = React.useContext(CurrentUserContext); // подписка на контекст текущего пользователя
  const isOwn = props.card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = props.card.likes.some(i => i._id === currentUser._id); // Опр, поставили ли мы «лайк» этой карточке
  const cardLikeButtonClassName = `elements__like-button ${isLiked && 'elements__like-button_active'}`; // Создаём переменную, которую после зададим в `className` для кнопки лайка
  
  // клик по картинке
  function handleClick() {
    props.onCardClick(props.card);
  }
  // клик по лайку
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  // клик по кнопке удаления
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="elements__element">
      {isOwn && (
        <button className="elements__delite-button" onClick={handleDeleteClick} type="button" aria-label="Удалить карточку" />
      )}
      <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="elements__description">
        <h2 className="elements__title">{props.card.name}</h2>
        <div>
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
          />
          <p className="elements__like-quantity">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
