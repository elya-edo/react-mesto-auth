import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../context/CurrentUserContext';

export function Main(props) {
  const currentUser = React.useContext(CurrentUserContext); // подписка на контекст текущего пользователя

  return (
    <main className="content">
      <section className="profile">
        <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
        <div className="profile__edit-avatar" onClick={props.onEditAvatar}></div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            onClick={props.onEditProfile}
            type="button"
            aria-label="Редактировать профиль"
          />
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          onClick={props.onAddPlace}
          type="button"
          aria-label="Добавить"
        />
      </section>

      <section className="elements">
        {props.cards.map(function (item) {
          // Берём каждый элемент массива
          return (
            <Card
              card={item}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              key={item._id}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
