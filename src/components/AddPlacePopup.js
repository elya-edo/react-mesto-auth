import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export function AddPlacePopup(props) {
  const namePlaceRef = React.useRef();  // записываем объект, возвращаемый хуком, в переменную 
  const linkPlaceRef = React.useRef();  // записываем объект, возвращаемый хуком, в переменную 
  
  React.useEffect(() => { // очищаю формы при открытии
      namePlaceRef.current.value = '';
      linkPlaceRef.current.value = '';
  }, [props.isOpen]);
  
  // oтправка формы
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({  // Передаём значения управляемых компонентов во внешний обработчик
        nameImage: namePlaceRef.current.value,
        linkImage: linkPlaceRef.current.value,
    }); 
  }  

  return (
    <PopupWithForm name="add" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText={props.isLoading ? 'Сохранение...' : 'Создать'} >
      <input className="popup__input popup__input_first" id="input-nameImage" ref={namePlaceRef} type="text" placeholder="Название" name="name-place" minLength="2" maxLength="30" required/>
      <span className="popup__errorMessage input-nameImage-error">Вы пропустили это поле</span>
      <input className="popup__input" id="input-linkImage" ref={linkPlaceRef} type="url" placeholder="Ссылка на картинку" name="link-picture" required/>
      <span className="popup__errorMessage input-linkImage-error">Введите адрес сайта</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup; 