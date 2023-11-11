import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export function EditAvatarPopup(props) {
  // На этот раз вместо управляемых компонентов используйте реф, чтобы получить прямой доступ к DOM-элементу инпута и его значению.
  const avatarRef = React.useRef();  // записываем объект, возвращаемый хуком, в переменную

  React.useEffect(() => { // очищаю формы при открытии
    avatarRef.current.value = '';
   }, [props.isOpen]);
  
  // oтправка формы
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      linkAvatar: avatarRef.current.value    // вызываем нужный метод (value) на поле current объекта
    });
  }

  return (
    <PopupWithForm name="update-avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}>
      <input className="popup__input popup__input_first" id="input-updateAvatar" ref={avatarRef} type="url" placeholder="Ссылка на изображение" name="update-avatar" required/>
      <span className="popup__errorMessage input-updateAvatar-error">Введите адрес сайта</span>
     </PopupWithForm>
  );
}

export default EditAvatarPopup;