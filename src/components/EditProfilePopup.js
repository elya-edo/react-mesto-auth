import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../context/CurrentUserContext';

export function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext); // подписка на контекст текущего пользователя  
  const [name, setName] = React.useState('Имя');
  const [description, setDescription] = React.useState('Описание');

  // После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  // изменяет поле ввода на введенное значение
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  
  // oтправка формы
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({  // Передаём значения управляемых компонентов во внешний обработчик
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}>
      <input className="popup__input popup__input_first" id="input-nameProfile" type="text" value={name} onChange={handleChangeName} placeholder="Имя" name="name-profile" minLength="2" maxLength="40" required/>
      <span className="popup__errorMessage input-nameProfile-error"></span>
      <input className="popup__input" id="input-descriptionProfile" type="text" value={description} onChange={handleChangeDescription} placeholder="О себе" name="description-profile" minLength="2" maxLength="200" required/>
      <span className="popup__errorMessage input-descriptionProfile-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;